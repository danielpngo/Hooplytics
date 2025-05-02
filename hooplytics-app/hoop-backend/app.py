from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/api/comparison', methods=['POST'])
@cross_origin()
def comparison():
    # 1. Load user ratings from request body
    data = request.get_json()
    ratings = data.get('ratings', {})

    # 2. Build a DataFrame of all players (id, full_name, position)
    players_list = players.get_players()
    players_df = pd.DataFrame(players_list)

    # 3. Fetch 2023-24 season stats for each player via playercareerstats
    season_dfs = []
    for pid in players_df['id']:
        career = playercareerstats.PlayerCareerStats(player_id=str(pid))
        df = career.get_data_frames()[0]
        # Filter for 2023-24 season (SEASON_ID format '2023-24')
        season_df = df[df['SEASON_ID'] == '2023-24']
        if not season_df.empty:
            season_df = season_df.copy()
            season_df['player_id'] = pid
            season_dfs.append(season_df)

    # Concatenate all player season DataFrames
    all_stats_df = pd.concat(season_dfs, ignore_index=True)

    # 4. Join with player info
    merged = all_stats_df.merge(
        players_df[['id', 'full_name', 'position']],
        left_on='player_id', right_on='id', how='left'
    )

    # 5. Filter by position if provided
    pos = ratings.get('Position')
    if pos:
        merged = merged[merged['position'].str.contains(pos, na=False)]

    # 6. Mapping rating keys to DataFrame percent columns
    mapping = {
        'Three Point Shooting': 'FG3_PCT',
        'Mid-Range Shooting': 'FG_PCT',
        'Free Throw Shooting': 'FT_PCT',
        # add additional mappings here
    }

    # 7. Compute percentile ranks (0-100 scale)
    pct_df = merged[list(mapping.values())].rank(pct=True) * 100

    # 8. Compute absolute distances
    distances = pd.DataFrame()
    for key, col in mapping.items():
        if key in ratings:
            distances[col] = (pct_df[col] - ratings[key]).abs()

    merged['distance'] = distances.mean(axis=1)

    # 9. Select top 5 matches
    top_matches = merged.nsmallest(5, 'distance')
    result = top_matches[['player_id', 'full_name', 'position', 'distance']].to_dict(orient='records')

    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000)

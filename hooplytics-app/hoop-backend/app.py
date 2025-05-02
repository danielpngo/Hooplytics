from flask import Flask, request, jsonify
from flask_cors import CORS
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats

app = Flask(__name__)
CORS(app)

@app.route('/api/player-stats')
def get_stats():
    career = playercareerstats.PlayerCareerStats(player_id='203999')
    return career.get_json()

if __name__ == '__main__':
    app.run(port=5000)
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { playersData } from "./PlayerData"; // import the players' data
import './Compare.css'

export default function Compare() {
    const navigate = useNavigate();
    const location = useLocation();
    const ratings = location.state?.ratings;

    const [comparisonResult, setComparisonResult] = useState(null);

    // Mapping of player names to NBA.com player IDs
    const playerHeadshots = {
        "Stephen Curry": "201939",
        "Luka Doncic": "1629029",
        "Shai Gilgeous-Alexander": "1628983",
        "Anthony Edwards": "1630162",
        "Jayson Tatum": "1628369",
        "Kevin Durant": "201142",
        "Lebron James": "2544",
        "Nikola Jokic": "203999",
        "Rudy Gobert": "203497",
        "Victor Wembanyama": "1641705"
    };

    function getPlayerHeadshotUrl(name) {
        const id = playerHeadshots[name];
        return id ? `https://cdn.nba.com/headshots/nba/latest/1040x760/${id}.png` : null; // API Call
    }

    useEffect(() => {
        if (ratings) {
            // Filter players based on position
            const position = ratings["Position"];
            const topPlayers = playersData[position];

            // Calculate the distance for each player
            const calculateDistance = (playerRatings) => {
                let distance = 0;
                Object.keys(playerRatings).forEach((key) => {
                    const diff = playerRatings[key] - ratings[key];
                    distance += diff * diff;
                });
                return Math.sqrt(distance);
            };

            // Find the player with the smallest distance
            const bestMatch = topPlayers.reduce((best, player) => {
                const distance = calculateDistance(player.ratings);
                if (best === null || distance < best.distance) {
                    return { name: player.name, distance };
                }
                return best;
            }, null);

            setComparisonResult(bestMatch?.name);
        }
    }, [ratings]);

    return (
        <div className="page-container">
            <div className="title"> Hooplytics </div>
            <br></br>
            <h1> Your NBA Superstar Comparison is... </h1>

            <h2>{comparisonResult ? comparisonResult : "Calculating..."}</h2>

            {comparisonResult && (
                <img
                    src={getPlayerHeadshotUrl(comparisonResult)}
                    alt={`${comparisonResult} Headshot`}
                    style={{ width: '200px', borderRadius: '8px', marginTop: '20px' }}
                />
            )}
    
            <button
                className="button"
                onClick={() => navigate('/stats')}
            >
                Get another comparison
            </button>
        </div>
    )
}

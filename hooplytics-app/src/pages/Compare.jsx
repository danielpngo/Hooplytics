import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { BalldontlieAPI } from "@balldontlie/sdk"
import './Compare.css'

export default function Compare() {
    const navigate = useNavigate();
    const location = useLocation();
    const ratings = location.state?.ratings;
    const [averages, setAverages] = useState(null);

    const api = new BalldontlieAPI({ apiKey: "66bf732b-2242-4cd8-ab1f-7a2548672c4c" });

    useEffect(() => {
        fetch("http://localhost:5000/api/player-stats?name=LeBron James")
        .then(res => res.json())
        .then(data => {
            console.log("Player data:", data);
            // You can now show data.player.full_name and data.career_stats
        })
        .catch(err => console.error("Error fetching player stats:", err));
    }, [ratings]);

    return (
        <div className="page-container">
            <div className="title"> Hooplytics </div>
            <br></br>
            <h1> Your NBA Comparison is... </h1>

            {averages ? (
                <div>
                    <p><strong>PTS:</strong> {averages.pts}</p>
                    <p><strong>REB:</strong> {averages.reb}</p>
                    <p><strong>AST:</strong> {averages.ast}</p>
                    {/* Add more stats here if needed */}
                </div>
            ) : (
                <p>Loading player stats...</p>
            )}

            <br />
    
            <button
                className="button"
                onClick={() => navigate('/stats')}
            >
                Get another comparison
            </button>
        </div>
    )
}

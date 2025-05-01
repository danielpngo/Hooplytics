import { useState } from "react";
import { useNavigate } from "react-router-dom"
import './Stats.css'

export default function Stats() {
    const navigate = useNavigate()

    const attributes = {
        Shooting: ['Three Point Tendancy', 'Three Point Shooting', 'Mid-Range Tendancy', 'Mid-Range Shooting', 'Driving Tendancy', 'Finishing', 'Foul Drawing', 'Free Throw Shooting', 'Overall Shooting Volume'],
        Tangibles: ['Passing Tendancy', 'Passing Accuracy', 'Rebounding', 'Rim Protection', 'Deflections'],
        Physicality: ['Height', 'Offense', 'Defense', 'Position']
    }

    const tooltipDescriptions = {
        'Three Point Tendancy': 'How often do you shoot threes when you shoot',
        'Three Point Shooting': 'How often do you make your three point shots',
        'Mid-Range Tendancy': 'How often do you shoot mid-range when you shoot',
        'Mid-Range Shooting': 'How often do you make mid-range shots',
        'Driving Tendancy': 'How often do you drive to the basket when you have the ball',
        'Finishing': 'How often do you make layups and shots around the rim',
        'Foul Drawing': 'How often do you get fouled when shooting',
        'Free Throw Shooting': 'How often do you make your free throws',
        'Overall Shooting Volume': 'How often do you shoot the ball when you have possession',

        'Passing Tendancy': 'How often do you pass',
        'Passing Accuracy': 'When you pass, how often is the pass on target',
        'Rebounding': 'How often do you get rebounds',
        'Rim Protection': 'How often do you get blocks',
        'Deflections': 'How often do you get steals',

        'Height': 'How tall are you relative to other players',
        'Offense': 'How much would you consider yourself an offensive player',
        'Defense': 'How much would you conider yourself a defensive player',
        'Position': 'What position do you align best with'
    }

    const [attribute, setAttribute] = useState("");
    const [ratings, setRatings] = useState({})

    const sliderChange = (subskill, value) => {
        setRatings((prev) => ({
            ...prev,
            [subskill]: value,
        }));
    };

    return (
        <div className="page-container">
            <div className="title"> Hooplytics </div>
            <br></br>
            <h1> Rate yourself based on how you play compared to players around your level or who you play with </h1>

            <h2> 
                A '0' means you're the worst among those around you 
                <br></br>
                A '50' means you're average among those around you
                <br></br>
                A '100' means you're the best among those around you
            </h2>

            <label htmlFor="attribute-select"> 
                Choose a skill category:    
                <br></br>
            </label>

            <select
                id='attribute-select'
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
            >
                <option value="">--Select--</option>
                {Object.keys(attributes).map((attr) => (
                    <option key={attr} value={attr}>
                        {attr}
                    </option>
                ))}
            </select>

            {attribute && (
                <div className="slider-container">
                    <h2>{attribute}</h2>
                    {attributes[attribute].map((subskill) => (
                        <div key={subskill} className="slider-block">
                            <div className="tooltip">
                                <label htmlFor={`${subskill}-slider`} className="slider-label">
                                    {subskill}
                                </label>
                                <span className="tooltip-text">
                                    {tooltipDescriptions[subskill] ?? 'No description available'}
                                </span>
                            </div>
                            {subskill === "Position" ? (
                                <select
                                    id={`${subskill}-select`}
                                    value={ratings[subskill] ?? ""}
                                    onChange={(e) =>
                                        sliderChange(subskill, e.target.value)
                                    }
                                    className="position-dropdown"
                                >
                                    <option value="">--Select Position--</option>
                                    <option value="PG">Point Guard (PG)</option>
                                    <option value="SG">Shooting Guard (SG)</option>
                                    <option value="SF">Small Forward (SF)</option>
                                    <option value="PF">Power Forward (PF)</option>
                                    <option value="C">Center (C)</option>
                                </select>
                            ) : (
                                <>
                                    <input
                                        id={`${subskill}-slider`}
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={ratings[subskill] ?? 50}
                                        onChange={(e) =>
                                            sliderChange(subskill, parseInt(e.target.value))
                                        }
                                        className="slider"
                                    />
                                    <span className="rating-display">
                                        {ratings[subskill] ?? 50}
                                    </span>
                                </>
                            )}
                        </div>   
                    ))}
                </div>
            )}

            <br></br>

            <button
                className="button"
                onClick={() => navigate('/compare')}
            >
                Get my NBA comparison!
            </button>
        </div>
    )
}
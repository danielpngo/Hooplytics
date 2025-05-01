import { useNavigate } from "react-router-dom"
import './Compare.css'

export default function Compare() {
    const navigate = useNavigate()

    return (
        <div className="page-container">
            <div className="title"> Hooplytics </div>
            <br></br>
            <h1> Your NBA Comparison is... </h1>
    
            <button
                className="button"
                onClick={() => navigate('/stats')}
            >
                Get another comparison
            </button>
        </div>
    )
}

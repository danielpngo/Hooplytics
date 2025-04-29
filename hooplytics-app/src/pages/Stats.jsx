import { useNavigate } from "react-router-dom"
// import './Stats.css'

export default function Stats() {
    const navigate = useNavigate()
    return (
        <div className="page-container">
            <h1> Here, rate yourself based on how you play relative to those around you </h1>
            <button
                className="button"
                onClick={() => navigate('/')}
            >
                Home
            </button>
        </div>
    )
}
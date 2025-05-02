import { useNavigate } from "react-router-dom"
import './Home.css'

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="page-container">
            <div className="title"> Hooplytics </div>
            <br></br>
            <h1> Ready to see what NBA Superstar you are? </h1>
            <h2> Have you ever wanted to see what NBA superstar you play like? 
                Or do you want to see who your friend might play like? Whatever the reason, 
                find your perfect NBA comparison here!</h2>
            <img src="https://cdn.bleacherreport.net/images_root/slides/photos/000/378/160/kobemj2_original.jpg?1283666623"></img>
            <br></br>
            <button
                className="button"
                onClick={() => navigate('/stats')}
            >
                Find NBA Comp
            </button>
        </div>
    )
}
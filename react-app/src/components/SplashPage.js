import { Link } from 'react-router-dom';
import './SplashPage.css'



export default function SplashPage() {
    
    return (
        <div className="splash-main">
            <div className="splash-top-bar">
                <div className="splash-top-bar-container">
                    <div className="top-bar-left">
                        <div className="app-logo">Renmo</div>
                    </div>
                    <div className="top-bar-right">
                        <Link to='/login' >
                            <div className="log-in">Log In</div>
                        </Link>
                        <Link to='/sign-up' >
                        <div className="sign-up">Sign Up</div>
                        </Link>
                       
                    </div>
                </div>
            </div>
            <div className="splash-main-container">
                <div className="splash-main-content">

                <div className="splash-main-left">
                    <p className="slogan-large">Fast, safe, social payments</p>
                    <p className="slogan-small">Pay. Get paid. Share. Join your friends on Renmo.</p>
                    <div className="get-start-btn"><button>Get Started</button></div>
                </div>
                <div className="splash-main-right">
                    <img src="https://i.imgur.com/bLBq6nQ.png"></img>
                </div>
                </div>
               

            </div>
        </div>
    )
}
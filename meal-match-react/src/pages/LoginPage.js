import React from "react";
import SignIn from '../components/SignIn'
import StartNavBar from '../components/StartNavBar'
import { FaArrowRight } from "react-icons/fa6";
import {NavLink} from 'react-router-dom'

const LoginPage = () => {
    // const navigate = useNavigate();

    return (
        <div>
            {/* <header className="header">
                <div className="logo">
                    <h1 className="logo-text">MOTENTITY</h1>
                </div>
                <nav className="nav">
                    <a href="/">Home</a>
                    <a href="/logout" className="logout-btn">Log Out</a>
                </nav>
            </header> */}
            <StartNavBar />
            <SignIn />
            <div className="flex flex-col justify-center items-center mt-24 gap-y-2">
                <p className="text-xl">New to MealMatch?</p>
                {/* add link/route to next page */}
                
                <NavLink to="/register">
                    <div className="flex flex-row gap-x-2 items-center justify-center">
                        <p className="text-[#F1A030] font-bold">Register Now</p>
                        <FaArrowRight style={{ color: '#F1A030' }}/>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default LoginPage;

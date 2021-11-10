import React from 'react'
import "./page.css";
import { useNavigate } from "react-router-dom";


export const Dashboard = () => {
    const navigate = useNavigate();
    function handleClick(path){
        navigate(path)
    }    
    return (
        <div className="Container">
            <center><h1>File Portal</h1></center>
            <button  id="admin" onClick={() =>handleClick("/admin")} className="signin pulse">Admin Login</button><button className="signin close" onClick={() =>handleClick("/user")}>User Login</button><button className="signin slide">Exit</button>
        </div>
        
    )

}

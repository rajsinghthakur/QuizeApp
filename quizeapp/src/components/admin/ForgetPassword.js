import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function ForgetPassword() {
    const [isSignUp, setIsSignUp] = useState(false);

    function toggleForm() {
        setIsSignUp(!isSignUp);
    };

    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    let [input, setinput] = useState("");
    let [pass, setpass] = useState("");
    let [pass2, setpass2] = useState(" ");
    let [email2, setemail2] = useState(" ");

    const forgetpassword = () => {
        axios.post("http://localhost:3000/admin/forgetpassword", { username, email })
            .then(response => {
                if (response.status == 200) {
                    toast.success("Submmit Success....");
                    toggleForm();
                }
            }).catch(err => {
                console.log(err);
                toast.error("Invalid Username Password...");
            })
    }

    const setforgetpassword = () => {
        axios.put("http://localhost:3000/admin/setforgetpassword", { username, email, password })
            .then(response => {
                if (response.status == 200) {
                    toast.success("Set Password Success....");
                }
            }).catch(err => {
                console.log(err);
                toast.error("set Password Fail...");
            })
    }

    const handleSubmit = event => {
        console.log('handleSubmit ran');
        event.preventDefault(); // 👈️ prevent page refresh
    }

    return (
        <div className={`container ${isSignUp ? 'active' : ''}`}>
            <div className="form-container sign-up">
                <form onSubmit={handleSubmit}>
                    <h1>Create Password</h1>
                    <span className='forget-text'>enter new password</span>
                    <input className='signin-password' onChange={(event) => { (event.target.value == "") ? setpass2("password is required") : (!event.target.value.match(/^(?=.*\d)/)) ? setpass("Password must contain at least one digit.") : (!event.target.value.match(/^(?=.*[a-zA-Z])/)) ? setpass("Password must contain at least one letter.") : (!event.target.value.match(/^.{5,}$/)) ? setpass("Password must be at least 5 characters long.") : setpass(""); setPassword(event.target.value); }} type="password" placeholder="Enter New Password" />
                    <small className='signin-input-message'>{pass}</small>
                    <input className='signin-password' onChange={(event) => { (event.target.value == "") ? setpass2("password is required") : (!event.target.value.match(/^(?=.*\d)/)) ? setpass2("Password must contain at least one digit.") : (!event.target.value.match(/^(?=.*[a-zA-Z])/)) ? setpass2("Password must contain at least one letter.") : (!event.target.value.match(/^.{5,}$/)) ? setpass2("Password must be at least 5 characters long.") : setpass2(""); setPassword2(event.target.value); }} type="password" placeholder="Verify Password" />
                    <small className='signin-input-message'>{pass2}</small>
                    {(pass == pass2 && password === password2) ? <Link to="/" onClick={() => { (password === password2) ? setforgetpassword() : toast.error("Password must be same...") }}><button>Reset</button></Link> : <button onClick={() => { (password == "") ? setpass("enter new password") : setpass2("enter verify password") }} style={{ background: "#9d80df" }}>Reset</button>}
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={handleSubmit}>
                    <h1>Forget Password</h1>
                    <span className='forget-text'>enter your username email</span>
                    <input className='signin-input' onChange={(event) => { (event.target.value == "") ? setinput("username is required") : (!event.target.value.match("^[a-zA-Z]+$")) ? setinput("username contains only charecters") : (!event.target.value.match("^[a-zA-Z]{2,20}$")) ? setinput("invelid username") : setinput(""); setuserName(event.target.value); }} type="text" placeholder="User Name" />
                    <small className='signin-input-message'>{input}</small>
                    <input className='signin-password' onChange={(event) => { (event.target.value == "") ? setemail2("email is required") : (!event.target.value.match(/^[^\s@]+@gmail\.com$/)) ? setemail2("Invalid Email.") : setemail2(""); setEmail(event.target.value); }} type="email" placeholder="Email" />
                    <small className='signin-input-message'>{email2}</small>
                    <Link className="ml-3" to="/">→ Back ←</Link>
                    {(input == email2) ? <button onClick={forgetpassword}>Submmit</button> : <button onClick={() => { (username == "") ? setinput("username is required") : (email == "") ? setemail2("email is required") : setemail2(" ") }} style={{ background: "#9d80df" }}>Submmit</button>}
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>We received a request to reset your password after set new password</p>
                        <h1>→</h1>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Please use the email or username to log in and reset your password</p>
                        <h1>←</h1>
                    </div>
                </div>
            </div>
            <ToastContainer className="toast" />
        </div>
    );
}
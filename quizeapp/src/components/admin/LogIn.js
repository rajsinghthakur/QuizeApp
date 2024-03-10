import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function LogIn() {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let [input, setinput] = useState("");
    let [pass, setpass] = useState(" ");
    let [input2, setinput2] = useState("");
    let [pass2, setpass2] = useState(" ");
    let [email2, setemail2] = useState("");

    const signIn = () => {
        axios.post("http://localhost:3000/admin/signin", { username, password })
            .then(response => {
                if (response.status == 200) {
                    toast.success("Sign In Success....");
                }
            }).catch(err => {
                console.log(err);
                toast.error("Invelid username password....");
            });
    }

    const signUp = () => {
        axios.post("http://localhost:3000/admin/signup", { username, email, password })
            .then(response => {
                if (response.status == 200) {
                    toast.success("Sign Up Success....");
                }
            }).catch(err => {
                console.log(err);
                toast.error("Email is Already exist...");
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
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="icon"><i className="fab fa-github"></i></a>
                        <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input className='signin-input' onChange={(event) => { (event.target.value == "") ? setinput2("username is required") : (!event.target.value.match("^[a-zA-Z]+$")) ? setinput2("username contains only charecters") : (!event.target.value.match("^[a-zA-Z]{2,20}$")) ? setinput2("username must be at least 2 characters long.") : setinput2(""); setuserName(event.target.value); }} type="text" placeholder="User Name" />
                    <small className='signin-input-message'>{input2}</small>
                    <input className='signin-password' onChange={(event) => { (event.target.value == "") ? setemail2("email is required") : (!event.target.value.match(/^[^\s@]+@/)) ? setemail2("Email must start with valid characters.") : (!event.target.value.match(/@gmail\.com$/)) ? setemail2("Email must end with '@gmail.com'.") : setemail2(""); setEmail(event.target.value); }} type="email" placeholder="Email" />
                    <small className='signin-input-message'>{email2}</small>
                    <input className='signin-password' onChange={(event) => { (event.target.value == "") ? setpass2("password is required") : (!event.target.value.match(/^(?=.*\d)/)) ? setpass2("Password must contain at least one digit.") : (!event.target.value.match(/^(?=.*[a-zA-Z])/)) ? setpass2("Password must contain at least one letter.") : (!event.target.value.match(/^.{5,}$/)) ? setpass2("Password must be at least 5 characters long.") : setpass2(""); setPassword(event.target.value); }} type="password" placeholder="Password" />
                    <small className='signin-input-message'>{pass2}</small>
                    {(input2 == pass2 && pass2 == email2) ? <button onClick={signUp}>Sign Up</button> : <button onClick={() => { (username == "") ? setinput2("username is required") : (email == "") ? setemail2("email is required") : (password == "") ? setpass2("password is required") : setpass2(" ") }} style={{ background: "#9d80df" }}>Sign Up</button>}
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={handleSubmit}>
                    <h1>Admin Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="icon"><i className="fab fa-github"></i></a>
                        <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your username password</span>
                    <input className='signin-input' onChange={(event) => { (event.target.value == "") ? setinput("username is required") : (!event.target.value.match("^[a-zA-Z]+$")) ? setinput("username contains only charecters") : (!event.target.value.match("^[a-zA-Z]{2,20}$")) ? setinput("invelid username") : setinput(""); setuserName(event.target.value); }} type="text" placeholder="User Name" />
                    <small className='signin-input-message'>{input}</small>
                    <input className='signin-password' onChange={(event) => { (event.target.value == "") ? setpass("password is required") : setpass(""); setPassword(event.target.value); }} type="password" placeholder="Password" />
                    <small className='signin-input-message'>{pass}</small>
                    <Link className="ml-3" to="/forgetpassword">→ Forget Your Password? ←</Link>
                    {(input == pass) ? <button onClick={signIn}>Sign In</button> : <button onClick={() => { (username == "") ? setinput("username is required") : (password == "") ? setpass("password is required") : setpass(" ") }} style={{ background: "#9d80df" }}>Sign In</button>}
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className={`hidden ${isSignUp ? '' : 'visible'}`} onClick={toggleForm}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className={`hidden ${isSignUp ? 'visible' : ''}`} onClick={toggleForm}>Sign Up</button>
                    </div>
                </div>
            </div>
            <ToastContainer className="toast" />
        </div >
    );
}
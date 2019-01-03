import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
class LoginPage extends Component {
    render() {
        return(
            <div className="login-card" >
                <h3 className="header">Welcome to my app</h3>
                <div className="card form" >
                    <input type='text' placeholder="UID"/>
                    <input type='text' placeholder="password"/>
                    <Link to="/main"><button className="btn">Sign-In</button></Link>
                </div>
            </div>
        );
    }
}

export default LoginPage;
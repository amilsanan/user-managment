import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
    const navigate = useNavigate();

    const { user, setUser, isLoggedin, setIsLoggedin } = useContext(AuthContext)
    const intialState = {
        username: "",
        password: "",
    };
    const [loginCredential, setLoginCredential] = useState(intialState)

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("isLogged in", isLoggedin);
        try {
            await axios.post('/admin/adminlogin', loginCredential).then((response) => {
                let userData = response.data;
                console.log(userData);
                if (userData.token) {
                    localStorage.setItem('token', userData.token)
                    setIsLoggedin(true)
                    alert("Login Successfully")
                    navigate('/admin/dashboard')
                } else {
                    alert("Please Check your username and password")
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            localStorage.removeItem('token');
            navigate('/admin')
        } else {
            navigate('/admin/dashboard')
        }
    }, [isLoggedin])


    return (
        <div>
            <div class="login">
                <div class="login-data">
                    <div class="text">
                        LOGIN
                    </div>
                    <div className='form'>
                        <div class="data">
                            <label>User Name</label>
                            <input type="text" placeholder='User Name'
                                value={loginCredential.username}
                                onChange={(e) => setLoginCredential({ ...loginCredential, username: e.target.value })}
                            /><br /><br />
                        </div>
                        <div class="data">
                            <label>Password</label>
                            <input type="password" placeholder='Password'
                                value={loginCredential.password}
                                onChange={(e) => setLoginCredential({ ...loginCredential, password: e.target.value })} />
                        </div>
                        <div class="btn">
                            <div class="inner"></div>
                            <button onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
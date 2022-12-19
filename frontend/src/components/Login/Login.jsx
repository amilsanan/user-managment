import axios from 'axios';
import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../store/AuthContext';

function Login() {
    const navigate = useNavigate();
    const { user, setUser, isLoggedin, setIsLoggedin } = useContext(AuthContext)

    const intialState = {
        email: "",
        password: ""
    };

    const [loginData, setLoginData] = useState(intialState);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(loginData);
        try {
            await axios.post('/user/userlogin', loginData).then((res) => {
                let userData = res.data;
                console.log("==user=>", userData);
                if (userData.token) {
                    console.log("kjhgh");
                    localStorage.setItem('token', userData.token)
                    setIsLoggedin(true)
                    navigate('/home')
                } else {
                    alert("Please Check your username and password")
                }
            }).catch((error) => {
                console.log("error", error.message);
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            localStorage.removeItem('token');
            navigate('/')
        } else {
            navigate('/home')
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
                            <label>Email</label>
                            <input type="email" placeholder='Enter Your Email'
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} /><br /><br />
                        </div>
                        <div class="data">
                            <label>Password</label>
                            <input type="password" placeholder='Enter Your Password'
                                value={loginData.pasword}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                        </div>
                        <div class="btn">
                            <div class="inner"></div>
                            <button onClick={handleLogin}>Login</button>
                        </div>
                        <div class="signup-link">
                            Don't have an account?
                            <Link to='/signup' className='link'>SignUp</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
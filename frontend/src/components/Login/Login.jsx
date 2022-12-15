import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();

    const intialState ={
        email:"",
        password:""
    };

    const [loginData, setLoginData] = useState(intialState);

    const handleLogin = async (e)=>{
        e.preventDefault();
        console.log(loginData);
        try {
            await axios.post('/usersignup/userlogin', loginData).then((res)=>{
                console.log("=====>",res);
                navigate('/home')
            })
        } catch (error) {
            console.log(error.message);            
        }
    }
    return (
        <div>
            <h1>LOGIN PAGE</h1>
            <div>
                <div>
                    <span>Email</span>
                    <input type="text" placeholder='Enter Your Email'
                    value={loginData.email}
                    onChange={(e)=> setLoginData({...loginData, email: e.target.value})}/>
                </div>
                <div>
                    <span>Password</span>
                    <input type="password" placeholder='Enter Your Password'
                    value={loginData.pasword}
                    onChange={(e)=> setLoginData({...loginData, password: e.target.value})}/>
                </div>
                <div>
                    <button onClick={handleLogin}>LOGIN</button>
                    <p><span>Create an Account?</span></p>
                    <Link to='/signup'>SignUp</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();
    const intialState = {
        username: "",
        password: "",
    };
    const [loginCredential, setLoginCredential] = useState(intialState)

    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
            await axios.post('/admin/adminlogin',loginCredential).then((response)=>{
                navigate('/admin/dashboard')
            })
        } catch (error) {
            console.log(error.message);            
        }
    }


  return (
    <div>
        <h3>ADMIN LOGIN</h3>
        <div>
            <span>User Name</span>
            <input type="text" placeholder='User Name'
            value={loginCredential.username}
            onChange={(e)=> setLoginCredential({...loginCredential, username: e.target.value })} />
        </div>
        <div>
            <span>Password</span>
            <input type="password" placeholder='Password'
            value={loginCredential.password}
            onChange={(e)=> setLoginCredential({...loginCredential, password: e.target.value })} />
        </div>
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    </div>
  )
}

export default AdminLogin
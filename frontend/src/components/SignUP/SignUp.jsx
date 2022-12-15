import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUp() {
    const navigate = useNavigate();

    const intialState = {
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
    }

    const [signUpData, setSignupData] = useState(intialState)

    const handleSignUp =async (e)=>{
        e.preventDefault();
        console.log(signUpData);
        try {
            await axios.post('/usersignup', signUpData).then((res)=>{
                navigate('/home')
            })
        } catch (error) {           
            console.log(error.message);            
        }
    }


  return (
    <div>
        <h3>Sign Up</h3>
            <div>
                <span>First Name</span>
                <input type="text" placeholder='First Name' value={signUpData.fname} onChange={(e)=> setSignupData({...signUpData,fname:e.target.value})}/>
            </div>
            <div>
                <span>Last Name</span>
                <input type="text" placeholder='Last Name' value={signUpData.lname} onChange={(e)=> setSignupData({...signUpData,lname:e.target.value})}/>
            </div>
            <div>
                <span>User Name</span>
                <input type="text" placeholder='User Name' value={signUpData.username} onChange={(e)=> setSignupData({...signUpData,username:e.target.value})}/>
            </div>
            <div>
                <span>Email</span>
                <input type="text" placeholder='Email' value={signUpData.email} onChange={(e)=> setSignupData({...signUpData,email:e.target.value})}/>
            </div>
            <div>
                <span>Password</span>
                <input type="text" placeholder='Password' value={signUpData.password} onChange={(e)=> setSignupData({...signUpData,password:e.target.value})}/>
            </div>
            <div>
                <button  onClick={handleSignUp}>SignUP</button>
                <Link to="/">Login</Link>
            </div>
    </div>
  )
}

export default SignUp
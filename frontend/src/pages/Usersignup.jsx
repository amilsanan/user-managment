import React,{useEffect} from 'react'
import SignUp from '../components/SignUP/SignUp'
import { useNavigate } from 'react-router-dom';

const Usersignup = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('token');
      navigate('/signup')
    } else {
      navigate('/home')
    }
  }, [])
  return (
    <>
    <SignUp/>
    </>
  )
}

export default Usersignup
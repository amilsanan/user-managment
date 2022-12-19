import React,{useEffect} from 'react'
import Userhome from '../components/Userhome/Userhome'
import { useNavigate } from 'react-router-dom';

const UserHomePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('token');
      navigate('/')
    } else {
      navigate('/home')
    }
  }, [])
  return (
    <>
    <Userhome/>
    </>
  )
}

export default UserHomePage
import React from 'react'
import { useEffect } from 'react'
import UserList from '../components/UserList/UserList'
import { useNavigate } from 'react-router-dom'
// import jwt from 'jsonwebtoken'

const AdminDashBoard = () => {
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('token');
      navigate('/admin')
    } else {
      navigate('/admin/dashboard')
    }
  }, [])
  return (
    <>
      <UserList />
    </>
  )
}

export default AdminDashBoard
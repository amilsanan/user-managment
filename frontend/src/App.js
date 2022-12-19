import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashBoard from './pages/AdminDashBoard';
import AdminLoginPage from './pages/AdminLoginPage';
import UserHomePage from './pages/UserHomePage';
import Userlogin from './pages/Userlogin';
import Usersignup from './pages/Usersignup';
import { AuthContext } from './store/AuthContext';
import './App.css'

function App() {
  const [user, setUser] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false)
  return (
      <AuthContext.Provider value={{ user, setUser, isLoggedin, setIsLoggedin }}>
    <BrowserRouter>
      <Routes>
        {/* <Route exact path='/' element={<UserLogin/>} /> */}
        <Route exact path='/' element={<Userlogin />} />
        <Route exact path='/signup' element={<Usersignup />} />
        <Route exact path='/home' element={<UserHomePage />} />
        <Route exact path="/admin" element={<AdminLoginPage />} />
        <Route exact path="/admin/dashboard" element={<AdminDashBoard />} />
      </Routes>
    </BrowserRouter >
    </AuthContext.Provider >
  );
}

export default App;

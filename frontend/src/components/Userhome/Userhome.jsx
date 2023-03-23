import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useState } from 'react';
import './Userhome.css'

const Userhome = () => {

  const [userDetails, setUserDetails] = useState([])
  const [image, setImage] = useState([])

  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      let noToken = localStorage.getItem('token');
      console.log('mm===.',noToken);
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("user", token);
    var decoded = jwt_decode(token);
    console.log("decoded", decoded);
    axios.get('/user/getUserDetails?id=' + decoded.id).then((res) => {
      console.log("=====>", res.data);
      setUserDetails(res.data)
    })
  }, [])

  const updateImage = async (id) => {
    try {
      var myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'dq9kanqi3',
        uploadPreset: 'opkf0ic5'
      },async (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);
          setImage(((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]));
          const imageurl = result.info.url
          console.log(result.info.url);
          await axios.get('/user/editProfilePic?userid=' + id +"&&imageurl="+imageurl).then((res)=>{
            console.log(res);
            window.location.reload(false);
            navigate('/home')
          })
        }
      }
      )
      myWidget.open();
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <div className="container profile-card">
        <div className="row">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img src={userDetails.image ? userDetails.image : "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="Admin" class="rounded-circle" width="150" />
                <div class="mt-3">
                  <h4>{userDetails.username}</h4>
                  <p class="text-secondary mb-1">{userDetails.email}</p>
                  <button class="btn btn-primary me-3" onClick={handleLogout}>LOGOUT</button>
                  <button className='btn btn-secondary me-2' onClick={() => updateImage(userDetails._id)} >Update Profile Pic</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Userhome
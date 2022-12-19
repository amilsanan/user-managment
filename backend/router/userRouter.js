const express = require('express');
const { usersignUp, userlogin, auth } = require('../controller/loginController');
const { getUserDetails, getEditProfile } = require('../controller/userControllder');
const router = express.Router();

router.post('/',usersignUp);
router.post('/userlogin',userlogin);
router.get('/login',auth)
router.get('/getUserDetails',getUserDetails)
router.get('/editProfilePic',getEditProfile)

module.exports = router;
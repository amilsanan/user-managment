const express = require('express');
const { usersignUp, userlogin } = require('../controller/loginController');
const router = express.Router();

router.post('/',usersignUp);
router.post('/userlogin',userlogin);

module.exports = router;
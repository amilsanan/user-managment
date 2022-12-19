const UserCredential = require("../model/userCredentialModel");
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const usersignUp = async (req, res) => {
    console.log(req.body);
    let { fname, lname, username, email, password } = req.body;
    password = await bcrypt.hash(password, 10);

    const newUser = new UserCredential({
        fname,
        lname,
        username,
        email,
        password
    })
    try {
        await newUser.save();
        console.log("vjhdvchj");
        const token = jwt.sign({
            email: email
        },
        'secret123'
        )
        console.log("vjhdvchj");
        res.status(201).json({newUser,token});
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

const userlogin = async (req, res) => {
    console.log(req.body);
    let { email, password } = req.body;
    // password = await bcrypt.hash(password,10)
    try {
        const user = await UserCredential.findOne({ email: email });
        console.log("server", user);
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                console.log("Correct Password",user);
                const token = jwt.sign({
                    id: user._id,
                    email: user.email
                },
                'secret123'
                )
                res.status(201).json({user,token});
            } else {
                console.log("Password Wrong");
            }
        } else {
            console.log("Invalid Details");
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
const auth =async (req,res)=>{
    console.log("hi");
}

module.exports = {
    usersignUp,
    userlogin,
    auth
}
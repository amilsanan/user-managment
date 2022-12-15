const UserCredential = require("../model/userCredentialModel")

const getAllUsers = async (req, res) => {
    try {
        const users = await UserCredential.find();
        res.json(users)
    } catch (error) {
        console.log(error.message);

    }
}

const deleteUser = async (req,res)=>{
    console.log("Hi",req.query.id);
    const userID = req.query.id;
    try {
        await UserCredential.deleteOne({_id:userID}).then((response)=>{
            res.json(response)
        })
    } catch (error) {
        console.log(error.message);        
    }
}

module.exports = {
    getAllUsers,
    deleteUser
}
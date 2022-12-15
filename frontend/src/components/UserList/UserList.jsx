import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const UserList = () => {
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        axios.get('/admin/userDetails').then((res) => {
            setUserDetails(res.data);
        }).catch((error)=>{
            console.log(error.message);
        })
    },[]);
    console.log(userDetails);

    const userDelete =async (id)=>{
        try {
            await axios.post('/admin/userDelete?id='+id).then((response)=>{
                console.log(response);
                if(response){
                    console.log("deleted");
                    window.location.reload(false);
                }
            })
        } catch (error) {
            console.log(error.message);            
        }
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>User Name</td>
                        <td>Email</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {userDetails.map((value)=>
                    <tr>
                        <td>{value.fname}</td>
                        <td>{value.lname}</td>
                        <td>{value.username}</td>
                        <td>{value.email}</td>
                        <td>
                            <button onClick={()=>userDelete(value._id)}>Delete</button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UserList
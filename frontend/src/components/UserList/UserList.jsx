import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserList = () => {
    const [userDetails, setUserDetails] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/admin/userDetails').then((res) => {
            setUserDetails(res.data);
        }).catch((error) => {
            console.log(error.message);
        })
    }, []);
    console.log(userDetails);

    const userDelete = async (id) => {
        try {
            await axios.post('/admin/userDelete?id=' + id).then((response) => {
                console.log(response);
                if (response) {
                    console.log("deleted");
                    window.location.reload(false);
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            navigate('/admin')
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <div className='m-5'>
            <div className='m-2' style={{textAlign: "end"}}>
                <button className='btn btn-success' onClick={handleLogout}>LOGOUT</button>
            </div>
            <div className="table-responsive">
                <table className='table'>
                    <thead className='table-dark'>
                        <tr>
                            <td>Photo</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>User Name</td>
                            <td>Email</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {userDetails.map((value) =>
                            <tr>
                                <td><img src={value.image ? value.image : "https://bootdey.com/img/Content/avatar/avatar7.png"} width="50px" height="50px" alt="" style={{objectFit: "cover"}}/></td>
                                <td>{value.fname}</td>
                                <td>{value.lname}</td>
                                <td>{value.username}</td>
                                <td>{value.email}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => userDelete(value._id)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </div>
        </>
    )
}

export default UserList
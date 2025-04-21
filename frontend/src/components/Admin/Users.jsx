import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../main';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {FaArrowRight } from "react-icons/fa";
import string from '../../string';

const Users = () => {
    const [Users, setUsers] = useState([]);
    const { isAuthenticated, user } = useContext(Context);
    const navigateTo = useNavigate();
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${string}/admin/users`, {
                withCredentials: true,
            });
            setUsers(response.data.users); // Update to set Users state to response data's users array
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        try {
            if (!isAuthenticated) {
                navigateTo("/login");
            }
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
      }, []);    
      
    return <>
    {user && user.role === "admin" ? <>
    <div className='user'>
            <h2>User List</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th className="th-name">Name</th>
                        <th className="th-email">Email</th>
                        <th className="th-details">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {Users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><Link to={`${user._id}`}><FaArrowRight /></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div></> : null}
    </>
}

export default Users;
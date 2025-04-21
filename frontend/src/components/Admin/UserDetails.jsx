import React from 'react'
import { useEffect,useContext,useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Context } from '../../main';
import { MdCreate, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { GrCheckmark } from "react-icons/gr";
import { RxCheck, RxCross1 } from 'react-icons/rx';
import {IoMdArrowRoundBack} from 'react-icons/io';
import string from '../../string';

const UserDetails = () => {
    const { id } = useParams();
    const [User, setUser] = useState({});
    const [editingMode, setEditingMode] = useState(null);
    const navigateTo = useNavigate();
    const { isAuthenticated, user } = useContext(Context);

    useEffect(() => {
        try {
            if (!isAuthenticated) {
                navigateTo("/login");
            }
            axios.get(`${string}/admin/user/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data.user);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);  

    const handleDeleteUser = async (id) => {
        try{
            const { data } =  await axios.delete(`${string}/admin/deleteuser/${id}`,{withCredentials:true})
            toast.success(data.message);
            navigateTo("/admin/users");
        }
        catch(error){
            toast.error(error.response.data.message);
        };
    };

    const handleEnableEdit = (id) => {
        setEditingMode(id);
    };
    
    const handleDisableEdit = () => {
        setEditingMode(null);
    };

    const handleInputChange = (field, value) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value
        }));
    };

    const handleUpdateUser = async (id) => {
        try {
            const response = await axios.put(
                `${string}/admin/updateuser/${id}`,
                User, // Pass the updated user object as the request body
                { withCredentials: true }
            );
            toast.success(response.data.message);
            setEditingMode(null);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };  

    const handleBack = () => {
        window.history.back();
    }

    return <>
    {user && user.role === "admin" ? <>
        <section className="jobDetail page">
            {editingMode ? <h3>Edit User Details</h3> : <h3>User Details</h3>}
            <div className="container">
                <div className="banner">
                    <div className="wrapper">   
                        <label>Role: </label>{ editingMode ? <input type="text" value={User.role} onChange={(e) => handleInputChange("role", e.target.value)} placeholder="User role"/> : <span>{User.role}</span>}
                    </div>
                    <div className="wrapper">   
                        <label>name: </label>{ editingMode ? <input type="text" value={User.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="User name"/> : <span>{User.name}</span>}
                    </div>
                    <div className="wrapper">   
                        <label>email: </label>{ editingMode ? <input type="text" value={User.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="User email"/> : <span>{User.email}</span>}
                    </div>
                    <div className='btn'>
                        <div className="button-container">
                            {editingMode ?  <>
                                <button onClick={() => handleUpdateUser(User._id)} className="check_btn">
                                    <GrCheckmark /> 
                                </button>
                                <button onClick={() => handleDisableEdit()} className="cross_btn">
                                    <RxCross1 />
                                </button>
                            </> : <>
                                <button onClick={()=>handleBack()}>
                                    <IoMdArrowRoundBack/>
                                </button>
                                <button onClick={()=>handleEnableEdit(User._id)} className='edit_btn'>
                                    <MdCreate/>
                                </button>
                                <button onClick={() =>handleDeleteUser(User._id)} className='delete_btn'>
                                    <MdDelete/>
                                </button>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section></> : null}
    </>
}

export default UserDetails
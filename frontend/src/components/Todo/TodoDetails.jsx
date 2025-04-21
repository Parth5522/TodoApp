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

const TodoDetails = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState({});
    const [editingMode, setEditingMode] = useState(null);
    const navigateTo = useNavigate();
    const { isAuthenticated, user } = useContext(Context);

    useEffect(() => {
        try {
            if (!isAuthenticated) {
                navigateTo("/login");
            }
            axios.get(`${string}/todo/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setTodo(res.data.todo);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);  

    const handleDeleteTodo = async (id) => {
        try{
            const { data } =  await axios.delete(`${string}/todo/delete/${id}`,{withCredentials:true})
            toast.success(data.message);
            navigateTo("/todo/gettodo");
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
        setTodo((prevTodo) => ({
            ...prevTodo,
            [field]: value
        }));
    };

    const handleUpdateTodo = async (id) => {
        try {
            const response = await axios.put(
                `${string}/todo/update/${id}`,
                todo, // Pass the updated todo object as the request body
                { withCredentials: true }
            );
            toast.success(response.data.message);
            setEditingMode(null);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };    

    const getPriority = (no) => {
        if(no == "1"){
            return "High";
        }
        if(no == "2"){
            return "Medium";
        }
        if(no == "3"){
            return "Low";
        }
    }

    const isPastTodo = (todoDate) => {
        return new Date(todoDate) < Date.now();
    };

    const handleBack = () => {
        window.history.back();
    }

    return <>
    {user && user.role === "user" ? <>
        <section className="jobDetail page">
            {editingMode ? <h3>Edit Todo Details</h3> : <h3>Todo Details</h3>}
            <div className="container">
                <div className="banner">
                    <div className="wrapper">   
                        <label>Title: </label>{ editingMode ? <input type="text" value={todo.title} onChange={(e) => handleInputChange("title", e.target.value)} placeholder="Todo Title"/> : <span>{todo.title}</span>}
                    </div>
                    <div className="wrapper">   
                        <label>Description: </label>{ editingMode ? <textarea value={todo.description} onChange={(e) => handleInputChange("description", e.target.value)} placeholder="Todo Description"/> :<span>{todo.description}</span>}
                    </div>
                    <div className="wrapper">   
                        <div className='lbl1'><label >Completion Time: </label>{ editingMode ? <input type="datetime-local" value={todo.cdate.slice(0, 16)} onChange={(e) => handleInputChange("cdate", e.target.value)} placeholder="Set Complete Date"/> : <span>{new Date(todo.cdate).toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour12: false })}</span>}</div>
                        <div className='lbl2'><label >Priority: </label>{ editingMode ? <select value={todo.priority} onChange={(e) => handleInputChange("priority", e.target.value)}><option value="1">High</option><option value="2">Medium</option><option value="3">Low</option></select>:<span>{getPriority(todo.priority)}</span>}</div>
                    </div>
                    <div className="wrapper">   
                        <div className='lbl1'><label >Favourite: </label>{ editingMode ? <input type="checkbox" className="favourite" checked={todo.favourite} onChange={(e) => handleInputChange("favourite", e.target.checked)} />:<span>{todo.favourite ? "Yes" : "No"}</span>}</div>
                        <div className='lbl2'><label >Remind me: </label>{ editingMode ? <input type="checkbox" className="remind" checked={todo.remind} onChange={(e) => handleInputChange("remind", e.target.checked)} />:<span>{todo.remind ? "Yes" : "No"}</span>}</div>
                    </div>
                    <div className="wrapper">   
                        {editingMode ? (todo.remind ? <><div className='lbl1'><label>Remind Date: </label><input type="datetime-local" value={todo.rdate.slice(0, 16)} onChange={(e) => handleInputChange("rdate", e.target.value)} placeholder="Set Reminder Date" /></div></> : null) : (todo.remind ? <><div className='lbl1'><label>Remind Date: </label><span>{new Date(todo.rdate).toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour12: false })}</span></div></> : null)}
                        <div className='lbl2'><label >Completed: </label>{ editingMode ? <input type="checkbox" className="complete" checked={todo.complete} onChange={(e) => handleInputChange("complete", e.target.checked)} /> : <span>{todo.complete ? "Yes" : "No"}</span>}</div>
                    </div>
                    <div className='btn'>
                        <div className="button-container">
                            {editingMode ?  <>
                                <button onClick={() => handleUpdateTodo(todo._id)} className="check_btn">
                                    <GrCheckmark /> 
                                </button>
                                <button onClick={() => handleDisableEdit()} className="cross_btn">
                                    <RxCross1 />
                                </button>
                            </> : <>
                                <button onClick={()=>handleBack()}>
                                    <IoMdArrowRoundBack/>
                                </button>
                                {isPastTodo(todo.cdate) ? null : <button onClick={()=>handleEnableEdit(todo._id)} className='edit_btn'>
                                    <MdCreate/>
                                </button>}
                                <button onClick={() =>handleDeleteTodo(todo._id)} className='delete_btn'>
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

export default TodoDetails
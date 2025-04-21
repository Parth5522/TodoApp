import React, { useContext, useEffect } from 'react';
import "./App.css";
import { Context } from "./main";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import PostTodo from "./components/Todo/PostTodo";
import Todos from "./components/Todo/Todos";
import NotFound from "./components/NotFound/NotFound";
import AllTodos from "./components/Todo/AllTodos";
import Users from "./components/Admin/Users";
import UserDetails from "./components/Admin/UserDetails";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import TodoDetails from './components/Todo/TodoDetails';
import CalendarView from './components/Todo/CalenderView';
import string from './string';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(Context);
  useEffect(()=>{
    const fetchUser = async()=>{
      try{
        const response = await axios.get(`${string}/user/getuser`, {withCredentials: true});
        setUser(response.data.user);
        setIsAuthenticated(true);
      } catch(error){
        setIsAuthenticated(false);
      }
    };
    fetchUser();
  }, [isAuthenticated]);


  return <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/todo/gettodo" element={<Todos/>}/>
        <Route path="/todo/getalltodo" element={<AllTodos/>}/>
        <Route path="/todo/post" element={<PostTodo/>}/>
        <Route path="/todo/calender" element={<CalendarView/>}/>
        <Route path="/todo/:id" element={<TodoDetails/>}/>
        <Route path="/admin/users" element={<Users/>}/>
        <Route path="/admin/users/:id" element={<UserDetails/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
      <Toaster/>
    </Router>
  </>;
};

export default App;
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import string from "../../string";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${string}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
    }
  };

  return (
    <nav className={isAuthenticated ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          {user && user.role === "user" ? (
            <>
              <li>
                <Link to={"/"} onClick={() => setShow(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/todo/post"} onClick={() => setShow(false)}>
                  Post Todo
                </Link>
              </li>
              <li>
                <Link to={"/todo/gettodo"} onClick={() => setShow(false)}>
                  View Todos
                </Link>
              </li>
              <li>
                <Link to={"/todo/getalltodo"} onClick={() => setShow(false)}>
                  All Todos
                </Link>
              </li>
              <li>
                <Link to={"/todo/calender"} onClick={() => setShow(false)}>
                  Calender
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/"} onClick={() => setShow(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/admin/users"} onClick={() => setShow(false)}>
                  Users
                </Link>
              </li>
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
        </ul>
        <div className="logo">
          <Link to={"/"} onClick={() => setShow(false)}>
            <img src="/todo21white.png" alt="logo" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

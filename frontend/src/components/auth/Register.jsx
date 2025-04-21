import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
axios.defaults.withCredentials = true;
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import string from "../../string";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigateTo = useNavigate();
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${string}/user/register`,
        { name, email, password, otp },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setOtp("");
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getotp = async (e) => {
    console.log("data...", name, email, password);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${string}/otp/getotp`,
        { email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/todo21blue.png" alt="logo" />
            <h3>Create a New Account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
              <button onClick={getotp}>Get OTP</button>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <div className="inputTag">
              <label>OTP</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter Your Otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button onClick={handleRegister} type="submit">
              Register
            </button>
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/todo31blue.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Register;

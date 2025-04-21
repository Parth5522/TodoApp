import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import string from '../../string';

const PostTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cdate, setCdate] = useState("");
  const [priority, setPriority] = useState("3");
  const [favourite, setFavourite] = useState(false);
  const [remind, setRemind] = useState(false);
  const [rdate, setRdate] = useState("");

  const { isAuthenticated, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated, navigateTo]);

  const handleTodoPost = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const selectedDate = new Date(cdate);
    const reminderDate = new Date(rdate);
    if (selectedDate <= currentDate) {
      toast.error("Please select a date greater than today.");
      return;
    }
    if (reminderDate <= currentDate && reminderDate >= selectedDate){
      toast.error("Reminder date should be less than the todo's date and greater than today.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${string}/todo/post`,
        {title, description, cdate, priority, favourite, remind, rdate},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setCdate("");
      setPriority("3");
      setFavourite(false);
      setRemind(false);
      setRdate("");
      }
      catch (error) {
        toast.error(error.response.data.message);
      }
  };

  return (
    <>
    {user && user.role === "user" ? <>
      <div className="job_post page">
        <h3>POST NEW TODO</h3>
        <div className="container">
          <form onSubmit={handleTodoPost}>
            <div className="wrapper">              
              <label  htmlFor="tTitle" >Todo Title : </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Todo Title"
              />
            </div>
            <div className="wrapper">
              <label htmlFor="dDescription">Detailed Description : </label>
              <textarea
                // rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Todo Description"
              />
            </div>
            <div className="wrapper">
            <div className="lbl1">
              <label htmlFor="cDate">Completion Date : </label>
              <input
                type="datetime-local"
                value={cdate}
                onChange={(e) => setCdate(e.target.value)}                
                placeholder="Set Complete Date"
              />
              </div>
              <div className="lbl2">
              <label htmlFor="priority">Priority: &nbsp; </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >              
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3" defaultValue={true}>Low</option>
              </select>
              </div>
            </div>
            <div className="wrapper">
              <div className="lbl1">
                <label htmlFor="favourite">Favourite: </label>
                <input
                  type="checkbox"
                  className="favourite"
                  unchecked="favourite"
                  onChange={(e) => setFavourite(e.target.checked)}
                />
              </div>
              <div className="lbl2">
                <label htmlFor="remind">Remind me: </label>
                <input
                  type="checkbox"
                  className="remind"
                  unchecked="remind"
                  onChange={(e) => setRemind(e.target.checked)}
                />
              </div>
            </div>
            {remind && (
              <div className="wrapper">
                <label htmlFor="rdate">Date to remind: </label>
                <input
                  type="datetime-local"
                  value={rdate}
                  onChange={(e) => setRdate(e.target.value)}
                  placeholder="Set Reminder Date"
                />
              </div>
            )}
            <button type="submit">Create Todo</button>
          </form>
        </div>
      </div></> : null }
    </>
  );
};

export default PostTodo
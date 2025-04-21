// Parent component fetching todo tasks data
import { useContext,useEffect,useState } from 'react';
import axios from 'axios';
import Calendar from './Calender';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';
import string from '../../string';

const CalendarView = () => {
  const [todos, setTodos] = useState([]);
  const { isAuthenticated, user } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        if (!isAuthenticated) {
          navigateTo("/login");
        }
        await axios
          .get(`${string}/todo/gettotal`, {
            withCredentials: true,
          })
          .then((res) => {
            // console.log(res.data);
            setTodos(res.data.todo);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  return <>
    {user && user.role === "user" ? <>
    <section className='calendar'>
      <Calendar todos={todos} />
    </section>
    </> : null }
  </>
};

export default CalendarView;
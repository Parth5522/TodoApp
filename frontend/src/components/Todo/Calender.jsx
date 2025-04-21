import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom'; 

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const Calendar = ({ todos }) => {

  const getColor = (complete, cdate) => {
    const currentDate = new Date();
    const completionDate = new Date(cdate);
    if (complete) {
      return 'green'; // Completed todo
    } else if (completionDate < currentDate) {
      return 'red'; // Past due date
    } else {
      return 'blue'; // Incomplete todo
    }
  };

  const events = todos.map(todo => ({
    id: todo._id,
    title: toTitleCase(todo.title),
    start: todo.cdate, // Assuming todo.cdate is the completion date
    color: getColor(todo.complete, todo.cdate),
  }));
  
  const navigateTo = useNavigate();

  const onEventClick = (eventClickInfo) => {
    const id = eventClickInfo.event.id; // Accessing the id of the clicked event
    navigateTo(`/todo/${id}`);
  }

  return (
    
    <div className="calendar-container">
      <h3>View Calender</h3>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem:'uppercase',
          hour12: true, // Ensure that the time is displayed in 12-hour format
        }}
        eventClick={onEventClick}
      />
    </div>
  );
};

export default Calendar;
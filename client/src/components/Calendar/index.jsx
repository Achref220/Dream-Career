import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';

const Calendar = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentYear, setCurrentYear] = useState(2024);
  const [currentMonth, setCurrentMonth] = useState(0); // January is 0
  const [showMore, setShowMore] = useState(null);

  const [events, setEvents] = useState([]);
  const [eventForm, setEventForm] = useState({ name: '', time: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  useEffect(() => {
    const monthIndex = currentMonth;
    const days = daysInMonth(monthIndex, currentYear);
    const firstDay = getFirstDayOfMonth(monthIndex, currentYear);

    const prevMonthDays = monthIndex === 0 ? daysInMonth(11, currentYear - 1) : daysInMonth(monthIndex - 1, currentYear);

    const newDates = [];

    // Add previous month's dates
    for (let i = firstDay - 1; i > 0; i--) {
      newDates.push({
        date: prevMonthDays - i + 1,
        events: [],
        isCurrentMonth: false
      });
    }

    // Add current month's dates
    for (let i = 1; i <= days; i++) {
      newDates.push({
        date: i,
        events: [],
        isCurrentMonth: true
      });
    }

    // Add next month's dates (limit to 4)
    for (let i = 1; i <= 4; i++) {
      newDates.push({
        date: i,
        events: [],
        isCurrentMonth: false,
        isNextMonth: true
      });
    }

    setDates(newDates);
  }, [currentMonth, currentYear]);

  const addEventToCalendar = () => {
    if (selectedDate !== null) {
      const dateIndex = selectedDate;
      const eventDate = dates[dateIndex].date;
      const eventMonth = dates[dateIndex].isCurrentMonth ? currentMonth : (dates[dateIndex].isNextMonth ? currentMonth + 1 : currentMonth - 1);
      const eventYear = currentYear;

      addEvent(dateIndex, { name: eventForm.name, time: eventForm.time, date: eventDate, month: eventMonth, year: eventYear });

      setEventForm({ name: '', time: '' });
      setSelectedDate(null); // Clear selected date after adding event
      setIsFormVisible(false); // Hide the form after adding event
    } else {
      alert('Please select a date on the calendar to add an event.');
    }
  };

  const addEvent = (dateIndex, event) => {
    setDates(prevDates => {
      const newDates = [...prevDates];
      if (!newDates[dateIndex].events.some(e => e.name === event.name && e.time === event.time)) {
        newDates[dateIndex].events.push(event);
      }
      return newDates;
    });

    // Update the events state to reflect the new event
    setEvents(prevEvents => [...prevEvents, event]);
  };

  const handleCellClick = (index) => {
    if (dates[index].isCurrentMonth || dates[index].isNextMonth) {
      setSelectedDate(index);
      setShowMore(null); // Reset show more when a new date is selected
    }
  };

  const handlePrevClick = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prevYear => prevYear - 1);
    } else {
      setCurrentMonth(prevMonth => prevMonth - 1);
    }
  };

  const handleNextClick = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prevYear => prevYear + 1);
    } else {
      setCurrentMonth(prevMonth => prevMonth + 1);
    }
  };

  const handleShowMoreClick = (index) => {
    setShowMore(showMore === index ? null : index);
  };

  const handleAddEventClick = () => {
    setIsFormVisible(true); // Show the form when "Add Event" is clicked
  };

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row">
      {/* Calendar Section */}
      <div className="flex-1 mt-2">
        {/* Month Navigation */}
        <div className="flex items-center justify-center mb-2  gap-2">
          <button onClick={handlePrevClick} className="px-4 py-2 bg-white text-[#00cde1] border border-[#00cde1] rounded-[22px]">
            &lt; Prev
          </button>
          <h2 className="text-xl font-bold">{`${monthNames[currentMonth]} ${currentYear}`}</h2>
          <button onClick={handleNextClick} className="px-4 py-2 bg-white text-[#00cde1] border border-[#00cde1] rounded-[22px]">
            Next &gt;
          </button>
        </div>

        {/* Days of the Week */}
        <div className="grid grid-cols-7 gap-1 text-center text-white bg-[#00cde1] border-b-2 border-gray-300 mt-3">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="py-2 text-sm font-semibold">{day}</div>
          ))}
        </div>

        {/* Calendar Dates */}
        <div className="grid grid-cols-7 gap-0  text-center">
          {dates.map((date, index) => {
            const isSunday = (index + 1) % 7 === 0;
            const hasEvents = date.events.length > 0;
            return (
              <div
                key={index}
                onClick={() => handleCellClick(index)}
                className={`border-[0.1px] border-[#f1f2f3]  p-2 text-sm h-32 cursor-pointer relative ${selectedDate === index ? 'bg-[#eafdff]' : ''} ${date.isCurrentMonth ? '' : 'bg-gray-200'} ${isSunday ? (hasEvents ? 'bg-[#eafdff]' : 'bg-gray-300') : ''}`}
              >
                <div className="text-left">{date.date}</div>
                <div className="absolute bottom-0 left-0 right-0 p-1">
                  {date.events.slice(0, 2).map((event, i) => (
                    <div key={i} className="flex items-center text-xs mb-1">
                      <span className="w-2 h-2 bg-[#00cde1] rounded-full mr-1"></span>
                      <span>{event.name}</span>
                      <span className="ml-auto">{event.time}</span>
                    </div>
                  ))}
                  {date.events.length > 2 && (
                    <div className="text-xs text-blue-500 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleShowMoreClick(index); }}>
                      {showMore === index ? date.events.slice(2).map((event, i) => (
                        <div key={i} className="flex items-center text-xs mb-1">
                          <span className="w-2 h-2 bg-[#eafdff] rounded-full mr-1"></span>
                          <span>{event.name}</span>
                          <span className="ml-auto">{event.time}</span>
                        </div>
                      )) : `+${date.events.length - 2} More`}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Events List Section */}
      <div className="ml-4 max-md:ml-0 w-full md:w-64 p-4 rounded mt-4 md:mt-0">
        <div className='flex justify-between '>
          <h3 className="text-lg font-semibold mb-2">Events</h3>
          <button
            onClick={handleAddEventClick} // Show form when clicked
            className="mb-2 px-4 py-2 bg-[#00cde1] text-white rounded-[20px] "
          >
            Add Event
          </button>
        </div>
        {/* Add Event Form */}
        {isFormVisible && ( // Render the form if visible
          <div className="flex flex-col mb-4">
            <input
              type="text"
              placeholder="Event Name"
              value={eventForm.name}
              onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
              className="px-2 py-1 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Time (e.g., 08:00)"
              value={eventForm.time}
              onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
              className="px-2 py-1 border rounded"
            />
            <button
              onClick={addEventToCalendar}
              className="mt-2 px-4 py-2 bg-[#00cde1] text-white rounded-[20px] "
            >
              Save Event
            </button>
          </div>
        )}

        <ul>
          {events.map((event, index) => (
            <li key={index} className="mb-4 mt-4">
              <div className="flex items-center bg-white p-2 rounded shadow">
                <div className="flex flex-col items-start">
                  {/* Index */}
                  <div className="text-[16px] bg-[#14b3c1] font-[700] rounded-[7px] w-[28px] h-[32px] text-white flex items-center justify-center">{index + 1}</div>
                </div>
                <div className="flex-1 ml-2">
                  {/* Title */}
                  <h4 className="text-[16px] uppercase font-semibold">{event.name}</h4>
                  {/* Date */}
                  <div className="text-xs text-gray-500">
                    {event.date} {monthNames[event.month]}-{event.year}
                  </div>
                </div>
                {/* Time */}
                <div className="text-[16px] bg-[#14b3c1] font-[700] rounded-[7px] px-2 h-[32px] text-white flex items-center justify-center">
                  {event.time}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Calendar;




import React from 'react';
//import CalendarScreen from "../assets/calender.png";
import { InlineWidget } from "react-calendly";

const Calendar = () => {
  return (
    <div className='h-full'>
    <div className=""> {/* This div will take up the remaining space */}
    <div className="App">
      <InlineWidget url="https://calendly.com/admin-czdj" />
    </div>
      </div>
    </div>
    
  )
}

export default Calendar

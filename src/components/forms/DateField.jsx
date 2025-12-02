import React, { useRef } from "react";
import CalendarSmall from "../../icons/CalendarSmall";

const DateField = ({ dateValue, handleSelectDate, ...props }) => {
  const dateRef = useRef(null);

  const handleDateClick = () => {
    // alert("date clicked");
    dateRef.current.click();
  };
  return (
    // <button
    //   className="w-full h-[54px] max-h-[54px] px-6 py-2 border border-border-color rounded-full flex flex-row items-center mt-4 "
    //   onClick={handleDateClick}
    // >
    //   <CalendarSmall />
    //   <p className="flex-1">{dateValue?.toDateString()}</p>
    //   <input
    //     ref={dateRef}
    //     onChange={handleSelectDate}
    //     type="date"
    //     className="hidden flex-1 border-none focus:outline-none"
    //     {...props}
    //   />
    // </button>
    <input
      ref={dateRef}
      onChange={handleSelectDate}
      value={dateValue}
      type="date"
      className="w-full h-[54px] max-h-[54px] px-6 py-2 border border-border-color rounded-full focus:outline-none mt-4 "
      {...props}
    />
  );
};

export default DateField;

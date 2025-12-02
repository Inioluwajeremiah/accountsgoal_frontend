import React, { useState } from 'react';
import MapScreen from '../../assets/map.png';
import { CiCalendarDate } from 'react-icons/ci';
import { MdOutlineCancel } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io5';
import { LuPencilLine } from "react-icons/lu";
import axios from 'axios'; // Import Axios for making HTTP requests

const GoalMarked = () => {
  const [checked, setChecked] = useState(false);
 
 
  const handleChange = () => {
    setChecked(!checked);

    //console.log("Goals component is rendering");
  };
  const totalDays = 30; // Example total days
  const daysLeft = 30; // Example days left
  const progressPercentage = 20; // Example percentage, you can replace it with your logic


 






  return (
    <div className="flex h-screen">
      {/* Map Section */}
      <div className="w-1/2">
        <img src={MapScreen} alt="Map Screen" className="w-full h-full object-cover" />
      </div>
     

      {/* Goal Section */}
      <div className="w-1/2 p-8">
        <div className="p-4">
          <div className="flex justify-between w-full">
            <div className="flex gap-x-10 items-center w-full">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold font-inter">Goals</h1>
            </div>
            <div>
              <MdOutlineCancel className="w-8 h-8 cursor-pointer" />
            </div>
          </div>
          <br/>
          <br/>
          

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Increase Account Revenue</h3>
          <div className="flex items-center text-gray-500">
            <CiCalendarDate size={20} />
            <p className="ml-2">{daysLeft} days left</p>
          </div>
          <div className="flex items-center text-gray-500">
            <IoPersonOutline size={20} />
            <p className="ml-2">Baylor Scott & White Irving</p>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full bg-gray-200 rounded-full h-2.5">
            <div className="absolute left-0 top-0 bg-red-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          {/* Fraction and Percentage */}
          <div className="flex justify-between items-center">
            <p className="text-red-500 text-left">{`1/${totalDays}`}</p>
            <p className="text-red-500 text-right">{progressPercentage}%</p>
          </div>

          {/* Checkbox List */}
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={checked} onChange={handleChange} className="form-checkbox h-4 w-4 text-red-500" />
              <span className="text-gray-700">Increase the revenue for this account</span>
            </label>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={checked} onChange={handleChange} className="form-checkbox h-4 w-4 text-red-500" />
              <span className="text-gray-700">Increase the revenue for this account</span>
            </label>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={checked} onChange={handleChange} className="form-checkbox h-4 w-4 text-red-500" />
              <span className="text-gray-700">Increase the revenue for this account</span>
            </label>
          </div>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>
        

        {/* Create Goal Button */}
        <button
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded-full flex items-center justify-center gap-2 focus:outline-none focus:shadow-outline mt-20 mx-auto"
  type="button"
>
  <LuPencilLine />
  Edit Information
</button>
        
      </div>
    </div>
    </div>
  );
};

export default GoalMarked;




import React from 'react';
import MapScreen from '../../assets/map.png';
import { CiCalendarDate } from 'react-icons/ci';
import { MdOutlineCancel } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io5';

const GoalsPercent = () => {
  return (
    <div className='flex h-screen'>
      <div className='w-h-screen'>
        <img src={MapScreen} alt='map screen' className='w-full h-full object-cover' />
      </div>
      <div className='w-1/2 p-8 bg-white'>
        <div className='flex justify-between items-center mb-12'>
          <h1 className='text-3xl font-bold'>Goals</h1>
          <MdOutlineCancel className='w-8 h-8 text-gray-500 cursor-pointer' />
        </div>

        {/* Goal Items */}
        <div>
          {[60, 30].map((percentage, index) => (
            <div key={index} className='bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center'>
              {/* Left Section */}
              <div>
                <h3 className='text-lg font-bold'>Increase Account Revenue</h3>
                <div className='flex items-center mt-2 text-gray-500'>
                  <CiCalendarDate size={20} />
                  <p className='ml-2'>30 days left</p>
                </div>
                <div className='flex items-center mt-2 text-gray-500'>
                  <IoPersonOutline size={20} />
                  <p className='ml-2'>Baylor scott & White Irving</p>
                </div>
              </div>

              {/* Right Section */}
              <div 
                style={{ backgroundColor: percentage >= 50 ? '#FBBF24' : '#EF4444' }} 
                className='rounded-full w-12 h-12 flex items-center justify-center'
              >
                {/* Percentage Text */}
                <span 
                  style={{ color: 'white' }} 
                  className='font-bold'
                >
                  {percentage}%
                </span>  
              </div>  
            </div>  
          ))}
        </div>

        {/* Create New Goal Button */}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button
          type='button'
          onClick={() => {}}
          style={{ backgroundColor: '#2563EB', color: 'white'}}
          className='py-2 px-40 rounded-full text-lg font-bold mt-20 mx-auto block'
        >
          + Create New Goal
        </button>
      </div>
    </div>
  );
};

export default GoalsPercent;

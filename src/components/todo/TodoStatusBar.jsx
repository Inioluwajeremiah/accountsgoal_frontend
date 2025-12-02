import React from 'react';

const TodoStatusBar=() => {
    return (
        <div className="flex justify-center items-center space-x-4">
          <span className="text-blue-500 font-bold">Pending</span>
          <div className="w-full h-px bg-blue-500"></div>
          <span className="text-gray-400">Completed</span>
        </div>
      );
    };


   
export default TodoStatusBar;
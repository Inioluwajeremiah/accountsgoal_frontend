import React from 'react';
import logopic from '../image/logopic.png';

const SignUpSuccesful = () => {
  return (
    <div className=' justify-center items-center '>
      <div className='bg-white justify-start items-start'>
        <div className="pl-4 pt-4">
          <img src={logopic} alt="accounts goal image" className='w-64 h-64 text-blue-500' />
        </div>
        <div className=" justify-center items-center mt-12  text-center">
        
          <h1 className='text-3xl text-bold '>Accounts Successfully Created</h1><br/>
          <p className="text-center whitespace-normal">
            "Welcome onboard - you're set to explore and utilize our <br/>powerful tools!"
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpSuccesful;

import React from 'react';
import { Link } from 'react-router-dom';
//import logopic from '../image/logopic.png';
import orgimage from '../image/orgimage.png';

const EditOrganizationProfile = () => {
  return (
    <div className=' flex '>
      <div className='w-1/2 bg-white flex flex-col justify-start items-start '>
      <div className="pl-4 pt-4 flex flex-row justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
   
 </svg> 
 <h1 className='text-2xl font-bold text-center' >Edit Profile</h1>
 </div>
 <br/>
 <br/>
 <br/>
 <br/>
        <div className="text-right px-32">
          <h1 className='text-3xl text-bold text-left'>Create Organization</h1>
          <p className="text-justify w-full whitespace-normal">
            It's your first step towards streamlined management and enhanced productivity
          </p>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="fullname">
                Company Name
              </label>
              <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" type="text" placeholder="" />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="password">
                Organization Size
              </label>
              <div className="flex flex-row justify-between bg-white shadow-md rounded px-4 py-2">
                <div className="flex items-center justify-center bg-white rounded-full p-2">
                  <input
                    type="radio"
                    id="size1-20"
                    name="organizationSize"
                    className="form-radio h-5 w-5 text-blue-500 mr-2"
                  />
                  <label htmlFor="size1-20" className="text-gray-700">
                    1-20
                  </label>
                </div>
                <div className="flex items-center justify-center bg-white rounded-full p-2">
                  <input
                    type="radio"
                    id="size20-50"
                    name="organizationSize"
                    className="form-radio h-5 w-5 text-blue-500 mr-2"
                  />
                  <label htmlFor="size20-50" className="text-gray-700">
                    20-50
                  </label>
                </div>
                <div className="flex items-center justify-center bg-white rounded-full p-2">
                  <input
                    type="radio"
                    id="size50-100"
                    name="organizationSize"
                    className="form-radio h-5 w-5 text-blue-500 mr-2"
                  />
                  <label htmlFor="size50-100" className="text-gray-700">
                    50-100
                  </label>
                </div>
                <div className="flex items-center justify-center bg-white rounded-full p-2">
                  <input
                    type="radio"
                    id="size100+"
                    name="organizationSize"
                    className="form-radio h-5 w-5 text-blue-500 mr-2"
                  />
                  <label htmlFor="size100+" className="text-gray-700">
                    100 Above
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="fullname">
                Company Type
              </label>
              <select className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="companyType">
               <option value="">Select Company Type</option> 
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

        
     
      
 
    
    
    <br></br>
            <div className="flex items-center justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded-full focus:outline-none focus:shadow-outline" type="button">
                Next
              </button>
            </div>
          </form>
          
        </div>
      </div>
      <div className='w-1/2  bg-blue-500 h-screen flex flex-col justify-end items-center'>
      <div className='absolute top-[84px] left-[916px]'>
        <img src={orgimage} alt="accounts goal organization image" className='w-[440px] h-[447px] text-blue-500' />
      </div>
        <h1 className='text-2xl text-bold text-white text-center'>Build, Grow, Thrive: Launch your Organization and <br/>Unite Visionaries</h1>

        <p className='text-white mb-8'>Transforming your ideas into impact: Forge your Team and Amplify your <br/> Mission</p>
      </div>
    </div>
  );
}

export default EditOrganizationProfile;

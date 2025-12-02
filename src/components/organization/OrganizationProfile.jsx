import React from 'react';
import { Link } from 'react-router-dom';
//import logopic from '../image/logopic.png';
import orgimage from '../image/orgimage.png';

const OrganizationProfile = () => {
  return (
    <div className=' flex '>
      <div className='w-1/2 bg-white flex flex-col justify-start items-start '>
      <div className="pl-4 pt-4 flex flex-row justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
   
 </svg> 
 <h1 className=' text-center text-3xl font-bold font-inter' >Organization Profile</h1>
 </div>
 <br/>
 <br/>

 <div className='flex flex-row justify-end w-full pr-4'>
 <h3 className="mr-2">Edit Profile | </h3>
 <Link to="/generate-link" className="text-blue-500"> Generate Link</Link>
</div>
 <br/>
 <br/>
       <div className="text-right px-32">
          <h1 className='text-xl text-bold text-left font-bold font-inter'>Grandida</h1>

          <p className="text-justify w-full whitespace-normal">
           Organization Name
          </p>
          </div>
          <br></br>
          
       <div className="text-right px-32">
          <h1 className='text-xl text-bold text-left font-bold font-inter'>1-20</h1>

          <p className="text-justify w-full whitespace-normal">
           Company Size
          </p>
          </div>
          <br></br>
          
       <div className="text-right px-32">
          <h1 className='text-xl text-bold text-left font-bold font-inter'>Medical</h1>

          <p className="text-justify w-full whitespace-normal">
           Company type
          </p>
          </div>
          <br></br>
          <br></br>

          <div className="text-right px-32">
  <h1 className='text-xl text-bold text-left font-bold font-inter'>Organization Members</h1>
  <br/>
  <br/>

  <ol className="flex flex-col">
    <li className='flex-row justify-between'>
      <span>1. Davidson@gloriation.com</span>
      <button className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline" type="button" style={{ marginLeft: '0.5rem' }}>
        Admin
      </button><span className="text-black" style={{ marginLeft: '0.5rem' }}>Remind</span>
    </li>
    <br/>
    <li className='flex-row justify-between'>
      <span>2. Israelite@gloriation.com</span>
      <button className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline" type="button" style={{ marginLeft: '0.5rem' }}>
        Pending
      </button><span className="text-gray-500" style={{ marginLeft: '0.5rem' }}>Remind</span>
    </li>
    <br/>
    <li className='flex-row justify-between'>
      <span>3. David@gloriation.com</span>
      <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline" type="button" style={{ marginLeft: '0.5rem' }}>
        Accepted
      </button><span className="text-red-500" style={{ marginLeft: '0.5rem' }}>Remove</span>
    </li>
    <br/>
  </ol>
</div>

    <br/>
    <br/>
    <br/>      
         
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded-full focus:outline-none focus:shadow-outline mx-auto" type="button">
  Save Changes
</button>

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

export default OrganizationProfile;

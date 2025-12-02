import React from 'react';
import { Link, json, useNavigate } from 'react-router-dom';
import Logo from '../assets/logopic.png';
import CircleImg from '../assets/circleimg.png';
import Globe from '../assets/globe.png';
import axios from 'axios';
import { useState } from 'react';
import Loading from '../components/Loading';


const Signup = () => {

  const [loading, setLoading] =  useState(false);

  const [error, setError] =  useState(null);

  const [users, setUsers] =  useState({email: "", fullName: "", mobile: "", password: "", confirmPassword: "" });

  const  [sucess, setSucess] = useState(null);

  const handleChange = (e) =>{
    let value = e.target.value;
    let name = e.target.name;

    setUsers((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
  });
}

const Navigate = useNavigate()

const handleSubmit =  async (e) => {
  e.preventDefault()

  if(!users.email || !users.fullName || !users.mobile || !users.mobile || !users.password || !users.confirmPassword) {
    setError("Please fill all empty field")

    return 

  } 
  let credentials= {email: users.email, fullName: users.fullName, mobile: users.mobile, password:users.password, confirmPassword: users.confirmPassword};

  try {
    setLoading(true);
    
    const response = await axios.post("https://api.accountsgoal.com/api/register", credentials, {
      headers: {
        "Content-Type": "application/json; charset= UTF-8",
        "Access-Control-Allow-Origin": "*",
      }
    })

    if(response) {
      setSucess("OTP Sent to your Mail")
      localStorage.setItem("usersparameter", JSON.stringify(response?.data?.data))
      console.log(response.data.data);
     setTimeout(() => {
        Navigate("/otp-verification")
      }, 4000);

    }
    setLoading(false)
    
  } catch (error) {
    setError(error.response?.data?.msg)
    setLoading(false);
    console.log(error);
    
  }
  


}


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen '>
      <div className='h-full w-full overflow-y-auto -mt-12'>
        <div className='md:w-44 w-52 mx-auto md:mx-0'>
        <img src={Logo} alt='logo' className='w-full h-full'/>
        </div>
        <form onSubmit={handleSubmit}   className='px-8 md:px-10 lg:px-20 -mt-7 '>
        <div>
          <h2 className='font-inter font-bold text-center -mt-16 md:-mt-0 md:text-left text-xl'>Create Account</h2>
          <p className='font-inter text-[#5C5C5C] text-[12px] md:text-[14px] text-center md:text-left'> it's your first step towards streamlined management and enhanced productivity.</p>
        </div>

        {error && (<p className='bg-red-500 text-center  text-white py-3 w-full mt-5 '>{error}</p>)}
        {sucess && (<p className='bg-green-500 text-center text-white py-3 w-full mt-5 '>{sucess}</p>)}
        

        <div className='flex flex-col gap-y-1 mt-14 md:mt-4'>
          <label className='font-inter' htmlFor="email">Email <span className='text-[#ed0202]'>*</span></label>
          <input type="text" placeholder='example@company.com' onChange={handleChange} value={users.email} name="email" className='border-2 rounded-2xl placeholder:text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-full'/>
        </div>

        <div className='flex flex-col gap-y-1 mt-4'>
          <label className='font-inter' htmlFor="fullname">Full Name <span className='text-[#ed0202]'>*</span></label>
          <input type="text" placeholder='full name' onChange={handleChange} value={users.fullName} name="fullName" className='border-2 rounded-2xl placeholder:text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-full'/>
        </div>

        <div className='flex flex-col gap-y-1 mt-4'>
          <label className='font-inter' htmlFor="mobile">Phone Number </label>
          <input type="text" placeholder='+1 (123) 456-7890' onChange={handleChange} value={users.mobile} name="mobile"  className='border-2 rounded-2xl placeholder:text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-full'/>
        </div>

        <div className='flex flex-col gap-y-1 mt-4'>
          <label className='font-inter' htmlFor="password">Password <span className='text-[#ed0202]'>*</span></label>
          <input type="password" placeholder='********'  onChange={handleChange} value={users.password} name="password"  className='border-2 rounded-2xl placeholder:text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-full'/>
        </div>

        <div className='flex flex-col gap-y-1 mt-4'>
          <label className='font-inter' htmlFor="confirmpassword">Confirm Password <span className='text-[#ed0202]'>*</span></label>
          <input type="password" placeholder='********' onChange={handleChange} value={users.confirmPassword} name="confirmPassword"  className='border-2 rounded-2xl placeholder:text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-full'/>
        </div>

          <button type='submit' className={`${loading ? 'bg-blue-200 flex items-center justify-center w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6' : 'bg-[#4169e1] w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6'}`}>{loading ? <Loading /> : 'Signup'}</button>
          <p className='font-inter text-[14px] flex items-center gap-x-1 text-center justify-center mt-1'>Already have an account? <Link to={'/signin'} className='text-[#4169e1] font-semibold italic text-[14px] underline'>Login</Link></p>
        </form>

      </div>
      <div className='hidden md:flex bg-blue-500 h-full  flex-col items-center'>
        <div className='relative h-[400px] w-full pt-10 flex flex-col items-center'>
        <div className='circleImg w-[400px] h-[400px] rounded-full flex flex-col justify-center items-center'>
        </div>
        <img src={Globe} alt="" className='absolute top-28 w-[600px]'/>
        </div>
        <div>
          <h2 className='font-bold text-center text-2xl font-inter text-white mt-4'>Geo-Client Mapping Interface</h2>
          <p className='font-inter text-[#f3f3f3f3] text-center text-[16px] font-normal'>Navigate your sales territory with ease! Our Map View helps you locate <br /> clients,</p>
        </div>
      </div>
    </div>
  )
}

export default Signup








// import React from 'react';
// import { Link } from 'react-router-dom';
// import logopic from '../image/logopic.png';
// import circleimg from '../image/circleimg.png';

// const Signup = () => {
//   return (
//     <div className='w-full h-full flex'>
//       <div className='w-1/2 bg-white flex flex-col justify-start items-start'>
//       <div className="pl-4 pt-0 ">
//   <img src={logopic} alt="accounts goal image" className='w-64 h-64 text-blue-500' />
// </div>

//         <div className="text-right px-32 mt-0">
//           <h1 className='text-3xl text-bold text-left'>Create account</h1>
//           <p className="text-justify w-full whitespace-normal">
//             It's your first step towards the streamline management and enhanced<br />
//             productivity
//           </p>
//           <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
//             <div className="mb-4">
//               <label className="block text-black text-sm font-bold mb-2 text-left" htmlFor="email">
//                 Email
//               </label>
//               <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="odunsi@companyname.com" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="fullname">
//                 Full Name
//               </label>
//               <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" type="text" placeholder="Nicholas Odunsi" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="phone">
//                 Phone Number
//               </label>
//               <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="+160132776328" />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="password">
//                 Password
//               </label>
//               <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
//             </div>
//             <div className="flex items-center justify-center">
//               <button className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-44 rounded-full focus:outline-none focus:shadow-outline" type="button">
//                 Sign Up
//               </button>
//             </div>
//           </form>
//           <p className="text-center pl-8 justify-center">Already have an account? <a className="text-blue-500 text-bold" href='/login'>Login</a></p>
//         </div>
//       </div>
//       <div className='w-1/2 h-screen bg-blue-500 flex flex-col justify-end items-center'>
//       <img src={circleimg} alt="accounts goal 3d image" className='w-692 h-732  text-blue-500 justify-center' />
//         <h1 className='text-2xl text-bold text-white text-center'>Geo-Client Mapping Interface</h1>
//         <p className='text-white mb-8'>Navigate your sales territory with ease! Our Map View helps you locate clients,</p>
//       </div>
//     </div>
//   );
// }

// export default Signup;

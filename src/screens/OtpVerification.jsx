/*import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logopic.png';
import CircleImg from '../assets/circleimg.png';
import Globe from '../assets/globe.png';
import axios from 'axios';
import Loading from '../components/Loading';

const OtpVerification = () => {

  const [loading, setLoading] =  useState(false);

  const [error, setError] =  useState(null);

  const [userId, setUserId] = useState("");
  const  [sucess, setSucess] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '']); // Array to store each digit of OTP
 
  // Function to handle input change for each digit
 

  // Function to handle input change for each digit
const handleChange = (index, value) => {
  if (value.length > 1) {
    // If user pastes OTP
    let pastedOtp = value.split('');
    if (pastedOtp.length === otp.length) {
      setOtp(pastedOtp);
    }
  } else {
    // If user types OTP
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input field if available
    if (index < otp.length - 1 && value !== '') {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  }
};

// Function to handle pasted OTP
const handlePaste = (e) => {
  e.preventDefault();
  const pastedData = e.clipboardData.getData('text');
  if (pastedData && pastedData.length === otp.length) {
    setOtp(pastedData.split(''));
  }
};

  const [data, setData] = useState([])
  useEffect(() => {
      if(localStorage.getItem("usersparameter")){
        setData(JSON.parse(localStorage.getItem("usersparameter")))
      }
  }, [])
  
  

  

const navigate = useNavigate()

const handleSubmit =  async (e) => {
  e.preventDefault()
  const otpCode = otp.join(''); 
  let credentials= {userId: data.userId, otp: otpCode};

  try {
    setLoading(true);
    
    const response = await axios.post("https://api.accountsgoal.com/api/verifyotp", credentials, {
      headers: {
        "Content-Type": "application/json; charset= UTF-8",
        "Access-Control-Allow-Origin": "*",
      }
    })

    if(response) {
      setSucess("OTP Veified Succesfully")
      console.log(response);
      setTimeout(() => {
        navigate("/sucess-register")
      }, 2000);

    }
    setLoading(false)
    
  } catch (error) {
    setError(error.response?.data?.msg)
    setLoading(false);
    console.log(error);
    
  }

}
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 md:h-screen '>
    <div className='h-full w-full md:overflow-y-auto -mt-12'>
      <div className='md:w-44 w-52 mx-auto md:mx-0'>
        <img src={Logo} alt='logo' className='w-full h-full'/>
        </div>
        <form onSubmit={handleSubmit} className='px-8 md:px-10 lg:px-20 -mt-7 '>
        <div>
        <h2 className='font-inter font-bold text-center -mt-16 md:-mt-0 md:text-left text-xl'>OTP Verification</h2>
        <p className='font-inter text-[#5C5C5C] text-[12px] md:text-[14px] text-center md:text-left'> We’ve sent an otp to the mail you provided us</p>
        </div>

        
        {error && (<p className='bg-red-500 text-center  text-white py-3 w-full mt-5 '>{error}</p>)}
        {sucess && (<p className='bg-green-500 text-center text-white py-3 w-full mt-5 '>{sucess}</p>)}

        <div className='flex items-center gap-x-3 justify-center'>
   <input type='hidden' onChange={(e) => setUserId(e.target.value)} value={data.userId} name='userId' onSubmit={handleSubmit} />

   {otp.map((digit, index) => (
    
    <div className='border-2 border-[#d7d7d7d7] w-20 h-20 rounded-full overflow-hiddenborder-[#dfdfdf] my-20 flex items-center justify-center'>
       
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            // style={{ width: '30px', marginRight: '10px' }}
            className='border-2   px-3 text-center text-2xl py-2  outline-none w-full h-full border-none bg-transparent rounded-full flex items-center justify-center'
          />
        </div>
        ))}


        </div>



        <button type='submit' className={`${loading ? 'bg-blue-200 flex items-center justify-center w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6' : 'bg-[#4169e1] w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6'}`}>{loading ? <Loading /> : 'Verify'}</button>
          <p className='font-inter text-[14px] flex items-center gap-x-1 text-center justify-end mt-1'>Send code again <span to={'/'} className='te font-bold  text-[14px] '>00:30</span></p>
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

export default OtpVerification*/

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logopic.png';
import CircleImg from '../assets/circleimg.png';
import Globe from '../assets/globe.png';
import axios from 'axios';
import Loading from '../components/Loading';
import { FiRefreshCw } from "react-icons/fi";

const OtpVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [success, setSuccess] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(30);

  
  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);


  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < otp.length - 1 && value !== '') {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (pastedData.length === otp.length) {
      setOtp(pastedData.split(''));
    }
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("usersparameter")) {
      setData(JSON.parse(localStorage.getItem("usersparameter")));
    }
  }, []);


  const refreshOtp = () => {
    // Reset the OTP
    setOtp(['', '', '', '']);
    // Reset the countdown
    setCountdown(30);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    let credentials = { userId: data.userId, otp: otpCode };

    try {
      setLoading(true);
      const response = await axios.post("https://api.accountsgoal.com/api/verifyotp", credentials, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response) {
        setSuccess("OTP Verified Successfully");
        console.log(response);
        setTimeout(() => {
          navigate("/success-register");
        }, 2000);
      }
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.msg);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 md:h-screen'>
      <div className='h-full w-full md:overflow-y-auto -mt-12'>
        <div className='md:w-44 w-52 mx-auto md:mx-0'>
          <img src={Logo} alt='logo' className='w-full h-full'/>
        </div>
        <form onSubmit={handleSubmit} className='px-8 md:px-10 lg:px-20 -mt-7'>
          <div>
            <h2 className='font-inter font-bold text-center -mt-16 md:-mt-0 md:text-left text-xl'>OTP Verification</h2>
            <p className='font-inter text-[#5C5C5C] text-[12px] md:text-[14px] text-center md:text-left'>We’ve sent an otp to the mail you provided us</p>
          </div>
          {error && (<p className='bg-red-500 text-center text-white py-3 w-full mt-5'>{error}</p>)}
          {success && (<p className='bg-green-500 text-center text-white py-3 w-full mt-5'>{success}</p>)}
          <div className='flex items-center gap-x-3 justify-center'>
            <input type='hidden' onChange={(e) => setUserId(e.target.value)} value={data.userId} name='userId' onSubmit={handleSubmit} />
            {otp.map((digit, index) => (
              <div key={index} className='border-2  w-20 h-20 rounded-full overflow-hidden border-[#dfdfdf] my-20 flex items-center justify-center'>
                <input
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onPaste={index === 0 ? handlePaste : null}
                  className='border-2 px-3 text-center text-2xl py-2 outline-none w-full h-full border-none bg-transparent rounded-full flex items-center justify-center'
                />
              </div>
            ))}
          </div>
          <button type='submit' className={`${loading? 'bg-blue-200 flex items-center justify-center w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6' : 'bg-[#4169e1] w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6'}`}>{loading? <Loading /> : 'Verify'}</button>
          {countdown > 0 ? (
            <p className='font-inter text-[14px] flex items-center gap-x-1 text-center justify-end mt-1'>Send code again <span className='font-bold text-[14px]'>{countdown < 10 ? `00:0${countdown}` : `00:${countdown}`}</span></p>
          ) : (
            <>
              <h3 className='font-inter text-[14px] flex items-center gap-x-1 text-center justify-end mt-1'>OTP code expired, Resend here <button onClick={refreshOtp} className='font-inter text-lg text-white bg-blue-500 flex items-center gap-x-1 justify-center py-2 px-4 rounded mt-2'><FiRefreshCw  /></button></h3>
             
            </>
          )}
          
          {/* <p className='font-inter text-[14px] flex items-center gap-x-1 text-center justify-end mt-1'>Send code again <span to={'/'} className='te font-bold text-[14px] '>00:30</span></p> */}
        </form>
      </div>
      <div className='hidden md:flex bg-blue-500 h-full flex-col items-center'>
        <div className='relative h-[400px] w-full pt-10 flex flex-col items-center'>
          <div className='circleImg w-[400px] h-[400px] rounded-full flex flex-col justify-center items-center'></div>
          <img src={Globe} alt="" className='absolute top-28 w-[600px]'/>
        </div>
        <div>
          <h2 className='font-bold text-center text-2xl font-inter text-white mt-4'>Geo-Client Mapping Interface</h2>
          <p className='font-inter text-[#f3f3f3f3] text-center text-[16px] font-normal'>Navigate your sales territory with ease Our Map View helps you locate <br /> clients,</p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
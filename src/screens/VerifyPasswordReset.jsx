/*import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logopic.png';
import CircleImg from '../assets/circleimg.png';
import Globe from '../assets/globe.png';
import axios from 'axios';
import Loading from '../components/Loading';
import { useStateContext } from '../context/contextProvider';

const VerifyPasswordReset = () => {

const [loading, setLoading] = useState(false)

  const [userId, setUserId] = useState("");
  const  [sucess, setSucess] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '']); // Array to store each digit of OTP

  const {formData, setFormData} = useStateContext();

  
  // Function to handle input change for each digit
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input field if available
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

  

const navigate = useNavigate()
const nextPage = () => {
  const otpValues = otp.join(''); // Combine the OTP values into a single string
  setFormData({ ...formData, otpValues });
navigate('/password-reset')};


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 md:h-screen '>
    <div className='h-full w-full md:overflow-y-auto -mt-12'>
      <div className='md:w-44 w-52 mx-auto md:mx-0'>
        <img src={Logo} alt='logo' className='w-full h-full'/>
        </div>
        <form  className='px-8 md:px-10 lg:px-20 -mt-7 '>
        <div>
        <h2 className='font-inter font-bold text-center -mt-16 md:-mt-0 md:text-left text-xl'>Password Reset</h2>
        <p className='font-inter text-[#5C5C5C] text-[12px] md:text-[14px] text-center md:text-left'>We’ve sent an otp to the mail you provided us</p>
        </div>



        <div className='flex items-center gap-x-3 justify-center'>
 

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



        <button onClick={nextPage} className={`${loading ? 'bg-blue-200 flex items-center justify-center w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6' : 'bg-[#4169e1] w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6'}`}>{loading ? <Loading /> : 'Verify'}</button>
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
  )l
}

export default VerifyPasswordReset*/

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logopic.png";
import CircleImg from "../assets/circleimg.png";
import Globe from "../assets/globe.png";
import axios from "axios";
import Loading from "../components/Loading";
import { useStateContext } from "../context/contextProvider";
import { FiRefreshCw } from "react-icons/fi";
import {
  useResetPasswordMutation,
  useVerifyOtpMutation,
} from "../store/authApi";

const VerifyPasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [success, setSuccess] = useState(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(59);
  const [data, setData] = useState([]);
  const [succeed, setSucceed] = useState("");
  const [err, setErr] = useState(null);
  const [emptyField, setEmptyField] = useState(null);

  const { formData, setFormData } = useStateContext();

  const [verifyOtp, { isLoading, isError, error }] = useVerifyOtpMutation();
  const [resetPassword, { isLoading: resendLoad, isError: resendIsError }] =
    useResetPasswordMutation();

  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Function to handle input change for each digit
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input field if available
    if (index < otp.length - 1 && value !== "") {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("usersparameter")) {
      setData(JSON.parse(localStorage.getItem("usersparameter")));
    }
  }, []);

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (pastedData.length === otp.length) {
      setOtp(pastedData.split(""));
    }
  };

  const navigate = useNavigate();
  const nextPage = () => {
    const otpValues = otp.join(""); // Combine the OTP values into a single string
    setFormData({ ...formData, otpValues });
    navigate("/password-reset");
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await resetPassword({ email: data.email }).unwrap();
      // dispatch(setCredentials({ ...res }));
      if (res) {
        setOtp(["", "", "", ""]);

        setCountdown(59);

        if (localStorage.getItem("usersparameter")) {
          localStorage.removeItem("usersparameter");
        }
        setSucceed("OTP Resent to your email successfully");

        localStorage.setItem("usersparameter", JSON.stringify(res?.data));
      }
    } catch (error) {
      console.log(error);
      console.log(error?.data?.msg);
      setErr(error?.data?.msg);
    }
  };

  const refreshOtp = async () => {
    // Reset the OTP
    setOtp(["", "", "", ""]);
    await handleResendOtp();
    // Reset the countdown
    setCountdown(59);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setEmptyField("Please fill all fields");
      // console.log("please fill all fields");
      return;
    }

    const otpValues = otp.join("");

    try {
      const res = await verifyOtp({
        otp: otpValues,
        userId: data.userId,
      }).unwrap();

      if (res) {
        setSucceed("Otp verified Successfully");
        setTimeout(() => {
          navigate("/password-reset");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      // console.log(error.data.msg);
      setErr(error?.data?.msg);
    }
  };
  console.log("eerrrrr", error?.data?.error);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen ">
      <div className="h-full w-full md:overflow-y-auto -mt-12">
        <div className="md:w-44 w-52 mx-auto md:mx-0">
          <img src={Logo} alt="logo" className="w-full h-full" />
        </div>
        <form className="px-8 md:px-10 lg:px-20 -mt-7 ">
          <div>
            <h2 className="font-inter font-bold text-center -mt-16 md:-mt-0 md:text-left text-xl">
              Password Reset
            </h2>
            <p className="font-inter text-[#5C5C5C] text-[12px] md:text-[14px] text-center md:text-left">
              We’ve sent an otp to the mail you provided us
            </p>
          </div>
          {isError && (
            <p className="bg-[#B20000] mt-3 text-white font-dmSans py-2 px-3">
              {error?.data?.error ||
                "Please check your internet connection and try again"}
            </p>
          )}
          {emptyField && (
            <p className="bg-[#B20000] mt-3 text-white font-dmSans py-2 px-3">
              {emptyField}
            </p>
          )}
          {succeed && (
            <p className="bg-[#36A74A] mt-3 text-white font-dmSans py-2 px-3">
              {succeed}
            </p>
          )}{" "}
          <div className="flex items-center gap-x-3 justify-center">
            {otp.map((digit, index) => (
              <div
                key={index}
                className="border-2 border-[#d7d7d7d7] w-20 h-20 rounded-full overflow-hiddenborder-[#dfdfdf] my-20 flex items-center justify-center"
              >
                <input
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onPaste={index === 0 ? handlePaste : null}
                  className="border-2 px-3 text-center text-2xl py-2 outline-none w-full h-full border-none bg-transparent rounded-full flex items-center justify-center"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className={`${
              isLoading
                ? "bg-blue-200 flex items-center justify-center w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6"
                : "bg-[#4169e1] w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6"
            }`}
          >
            {isLoading ? <Loading /> : "Verify"}
          </button>
          {countdown > 0 ? (
            <p className="font-inter text-[14px] flex items-center gap-x-1 text-center justify-end mt-1">
              Send code again{" "}
              <span className="font-bold text-[14px]">
                {countdown < 10 ? `00:0${countdown}` : `00:${countdown}`}
              </span>
            </p>
          ) : (
            <>
              <h3 className="font-inter text-[14px] flex items-center gap-x-1 text-center justify-end mt-1">
                OTP code expired, Resend here{" "}
                <button
                  onClick={handleResendOtp}
                  className="font-inter text-lg text-white bg-blue-500 flex items-center gap-x-1 justify-center py-2 px-4 rounded mt-2"
                >
                  <FiRefreshCw />
                </button>
              </h3>
            </>
          )}
          {/* <button onClick={nextPage} className={`${loading ? 'bg-blue-200 flex items-center justify-center w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6' : 'bg-[#4169e1] w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6'}`}>{loading ? <Loading /> : 'Verify'}</button> */}
          {/* <p className='font-inter text-[14px] flex items-center gap-x-1 text-center justify-end mt-1'>Send code again <span className='font-bold text-[14px]'>{countdown < 10 ? `00:0${countdown}` : `00:${countdown}`}</span></p> */}
          {/* <p className='font-inter text-[14px] flex items-center gap-x-1 text-center justify-end mt-1'>Send code again <span to={'/'} className='te font-bold  text-[14px] '>00:30</span></p> */}
        </form>
      </div>
      <div className="hidden md:flex bg-blue-500 h-full  flex-col items-center">
        <div className="relative h-[400px] w-full pt-10 flex flex-col items-center">
          <div className="circleImg w-[400px] h-[400px] rounded-full flex flex-col justify-center items-center"></div>
          <img src={Globe} alt="" className="absolute top-28 w-[600px]" />
        </div>
        <div>
          <h2 className="font-bold text-center text-2xl font-inter text-white mt-4">
            Geo-Client Mapping Interface
          </h2>
          <p className="font-inter text-[#f3f3f3f3] text-center text-[16px] font-normal">
            Navigate your sales territory with ease! Our Map View helps you
            locate <br /> clients,
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyPasswordReset;

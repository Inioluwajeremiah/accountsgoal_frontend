import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logopic from "../image/logopic.png";
import Modal from "../Modal";
import Lottie from "lottie-react";
import succssAnimation from "../../assets/animated.json";
import MapScreen from "../../screens/MapScreen";

//import { useNavigate } from 'react-router-dom';

const OrganizationSuccess = () => {
  console.log("OrganizationSuccess component rendered");

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Navigating to dashboard');
      navigate('/dashboard'); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);
  
  return (
    <Modal background={"bg-white"}>
      <div className="h-screen bg-white ">
        <div className=" h-full">
          <div className="w-60 h-60 mb-10 lg:mb- lg:mx-0 mx-auto ">
            <img
              src={logopic}
              alt="logo"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className=" flex flex-col items-center justify-center  ">
            <div className="h-[150px] w-[150px]">
              <Lottie animationData={succssAnimation} loop={true} />
              
            </div>

            <div className="font-bold font-inter text-[30px]">
              Organization Successfully
              <br />
              <h2 className="font-bold font-inter text-[30px] text-center">
                Created
              </h2>
            </div>
            <p className="font-inter text-[#777777]">
              “Welcome aboard – you're all set to explore and utilize our
              powerful tools!"
            </p>

            
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrganizationSuccess;

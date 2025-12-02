import React, { useEffect, useRef } from 'react'
import animationData from '../assets/animated.json'
import Logo from '../assets/logopic.png'
import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/Endpoints'


const PaymentSuccessful = () => {
  const navigate = useNavigate()
  const lottieRef = useRef(null); 

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const updateUserAccess = async () => {
      try {
        const response = await axios.get(`${BASE_URL}payment-success`, { withCredentials: true });
        if(response){
          console.log(response.data.message);
          
        }
      } catch (error) {
        console.error('Error updating user access:', error);
      }
    };

    updateUserAccess();
  }, []);

    const navigateToAnotherPage = ()=>{
      navigate('/dashboard')
    }


    const handleAnimationComplete = () => {
      navigateToAnotherPage();  
     };
  


  return (
    <div className='h-screen  '>
      <div className=' h-full'>

      <div className='w-60 h-60 mb-10 lg:mb- lg:mx-0 mx-auto '>
        <img src={Logo} alt="logo" className='w-full h-full object-cover object-center'/>
      </div>
      <div className=' flex flex-col items-center justify-center  '>
        <div className='h-[150px] w-[150px]'>

        <Lottie  width='100%'  
           loop={false}
           onComplete={handleAnimationComplete} 
           lottieRef={lottieRef} 
        animationData={animationData} />
        </div>
        <h2 className='font-bold font-inter text-[30px]'>Payment Successful</h2>
        <p className='font-inter text-[#777777]'>Your payment has been successfully verified and you have subscribed to Accountsgoal Premium Plan.</p>
      </div>

      </div>
    </div>
  )
}

export default PaymentSuccessful
import React, { useEffect, useRef } from 'react'
import animationData from '../assets/animated.json'
import Logo from '../assets/logopic.png'
import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom'
const SuccessRegister = () => {
  const navigate = useNavigate()
  const lottieRef = useRef(null); 

    const navigateToAnotherPage = ()=>{
      navigate('/signin')
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
        <h2 className='font-bold font-inter text-[30px]'>Account Successfully created</h2>
        <p className='font-inter text-[#777777]'>“Welcome aboard – you're all set to explore and utilize our powerful  tools!"</p>
      </div>

      </div>
    </div>
  )
}

export default SuccessRegister
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BaseUrl } from '../utils/Endpoints'
import { useSelector } from 'react-redux'
import accountgoalimg from "../assets/accountgoalimg.png";


const SuccessPayment = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const {usersInfo} = useSelector(state=>state.auth);
    const handleSuccess = async()=>{
        try {
            setLoading(true)
            const res = await axios.get(`${BaseUrl}success`, {
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${usersInfo?.token}`
               }
            }
            )
            if(res){
                navigate('/payment-success')
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

  return (
    <div className=''>
        <div className='w-32 mt-10 ml-8'>
            <img src={accountgoalimg} alt="" className='w-full h-full object-cover object-center'/>
        </div>
    <div className='flex items-center justify-center h-screen w-full lg:-mt-20 -mt-44 md:-mt-72'>
        <div className='flex items-center flex-col justify-center gap-y-3'>
            <h2 className='font-bold lg:text-xl text-center'>Your Payment has been created Successfully</h2>
            <button onClick={handleSuccess} className={`px-4 py-1 block mx-auto bg-blue-800 rounded-md outline-none text-white font-semibold ${loading && 'bg-blue-400'}`}>Proceed to finish payment</button>
        </div>
    </div>
    </div>
  )
}

export default SuccessPayment
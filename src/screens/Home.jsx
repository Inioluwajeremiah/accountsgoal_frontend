
import React from 'react';
import { FaRegMap } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { LuListChecks } from "react-icons/lu";
import { GoGoal } from "react-icons/go";
import { BiSupport } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
//import Layer_1 from "../../image/Layer_1.svg";
import MapScreen from "./../assets/map.png";

const Home = () => {
  return (
    <div className='h-full'>
    <div className=""> {/* This div will take up the remaining space */}
        <img src={MapScreen} alt='map screen image' className='w-full h-full object-cover object-center' />
      </div>
    </div>
    
  )
}

export default Home

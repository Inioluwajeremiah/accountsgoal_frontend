import React from "react";
import MapScreen from "../assets/map.png";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuPencilLine, LuContact, LuListChecks } from "react-icons/lu";
import { HiChevronRight } from "react-icons/hi";
import { GoGoal } from "react-icons/go";

const ClientInformation = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <img
          src={MapScreen}
          alt="map screen"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 p-8 bg-white">
        <div className="flex justify-between items-center mb-12">
          <div></div>
          <h1 className="text-3xl font-bold text-black">Client Information</h1>
          <MdOutlineCancel className="w-8 h-8 text-gray-500 cursor-pointer" />
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black">
            Baylor Scott & White Irving
          </h2>
          <div className="flex items-center my-4">
            <p className="text-gray-500 mr-2">Last Interaction:</p>
            <p className="text-xl font-bold text-black">51 days ago</p>
          </div>
          <div className="flex items-center my-4">
            <p className="text-gray-500 mr-2">Revenue:</p>
            <p className="text-xl font-bold text-black">$400,000</p>
          </div>
          <p className="text-gray-500 my-4">
            Recently Updated with the latest transactional data for enhanced
            accuracy in sales tracking and performance analysis on the{" "}
            <u>5th March 2024...</u>
          </p>
          <div className="flex justify-end text-end">
            {/* Your other JSX components */}
            <div className="text-blue-500 flex items-center my-4">
              <LuPencilLine className="mr-2" />
              Edit Note
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center my-4">
          <div></div>
          <LuContact className="w-7 h-7" />
          <h2 className="text-3xl font-bold text-black mr-9 justify-normal ">
            Contact Information
          </h2>
          <HiChevronRight />
        </div>
        <p className="text-gray-500 my-4">
          Baylor Scott & White Irving, 20 December 2001s
        </p>
        <div className="flex justify-between items-center my-4">
          <GoGoal className="w-7 h-7" />
          <h2 className="text-3xl font-bold text-black">Goals</h2>
          <HiChevronRight />
        </div>
        <p className="text-gray-500 my-4">
          Increase revenue generated, 13 Interaction with clients, Upgrade
          account.
        </p>

        <div className="flex justify-between items-center my-4">
          <LuListChecks className="w-7 h-7" />
          <h2 className="text-3xl font-bold text-black">To do list</h2>
          <HiChevronRight />
        </div>
        <p className="text-gray-500 my-4">
          Increase revenue generated, 13 interaction with clients, Upgrade
          account.
        </p>
      </div>
    </div>
  );
};

export default ClientInformation;

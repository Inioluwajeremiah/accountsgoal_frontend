import React from "react";
import UserIcon from "../../icons/UserIcon";
import EmailIcon from "../../icons/EmailIcon";
import DobIcon from "../../icons/DobIcon";
import PhoneBookIcon from "../../icons/PhoneBookIcon";
import closeButton from "../../assets/closeIcon.svg";

const MapContactInformationModal = ({
  showContactModal,
  handleToggleContactModal,
  currentItem,
}) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center bg-black/10 ">
      <div className="w-[90%] sm:w-[80%] mx-auto overflow-scroll bg-white px-10 py-12 rounded-3xl ">
        <div className="mb-6 flex flex-row items-center justify-between">
          <p className="font-black leading-6 text-base text-black ">
            {"Contact Information"}
          </p>
          <button
            className=" w-12 h-12 flex self-end items-center justify-center  p-2 -mt-24"
            onClick={handleToggleContactModal}
          >
            <img src={closeButton} alt="close button" />
          </button>
        </div>

        {/* list of contact details  */}

        <div className="w-full  flex flex-row items-center  mt-4">
          {/*  icon */}
          <div className="w-11 h-11 rounded-full bg-[#ECF0FC] flex items-center justify-center">
            <UserIcon color={"#4169E1"} />
          </div>
          <p className="text-xs text-primary-accent-color ml-4">
            {currentItem?.ACCOUNT_NAME}
          </p>
        </div>
        <div className="w-full  flex flex-row items-center  mt-4">
          {/*  icon */}
          <div className="w-11 h-11 rounded-full bg-[#ECF0FC] flex items-center justify-center">
            <EmailIcon color={"#4169E1"} />
          </div>
          <p className="text-xs text-primary-accent-color ml-4">
            {currentItem?.EMAIL}
          </p>
        </div>
        <div className="w-full  flex flex-row items-center  mt-4">
          {/*  icon */}
          <div className="w-11 h-11 rounded-full bg-[#ECF0FC] flex items-center justify-center">
            <DobIcon color={"#4169E1"} />
          </div>
          <p className="text-xs text-primary-accent-color ml-4">
            {currentItem?.CELEBRATIONS}
          </p>
        </div>
        <div className="w-full  flex flex-row items-center  mt-4">
          {/*  icon */}
          <div className="w-11 h-11 rounded-full bg-[#ECF0FC] flex items-center justify-center">
            <PhoneBookIcon color={"#4169E1"} />
          </div>
          <p className="text-xs text-primary-accent-color ml-4">
            {currentItem?.MOBILE_CONTACT}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapContactInformationModal;

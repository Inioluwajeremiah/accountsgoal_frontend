import React, { useState } from "react";

const DeleteDropDown = ({ showAlertModal, message, type, ToggleAlertModal }) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center  `}
    >
      <div
        className={`bg-opacity-100 transition-opacity duration-300 ease-in-out transform scale-95 opacity-0 pointer-events-none sm:opacity-100 sm:scale-100 ${
          showAlertModal ? "opacity-100 scale-100" : ""
        } w-full  h-1/2 max-h-1/2 md:h-screen md:max-h-screen rounded-t-3xl md:rounded-none overflow-scroll`}
      >
        <div
          className={`w-full ${
            type === "success"
              ? "bg-[#6CBE44]"
              : type === "warn"
              ? "bg-orange-500"
              : type === "danger"
              ? "bg-red-500"
              : ""
          } h-[10%] flex items-center justify-center`}
        >
          <p className="text-white text-base font-semibold text-center">
            {message}
          </p>
        </div>
        <button className="h-[90%]" onClick={ToggleAlertModal} />
      </div>
    </div>
  );
};

export default DeleteDropDown;

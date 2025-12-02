import React, { useState } from "react";

const DropDownAlert = ({ showAlertModal, message, type, ToggleAlertModal, customClass }) => {
  return (
    <div
      className={`w-full md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30 bg-black/10 flex flex-col justify-between items-start rounded-t-3xl md:rounded-none  overflow-scroll ${customClass}`}
    >
      <div
        className={`top-0 w-full  ${
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
      <button className="h-[90%] " onClick={ToggleAlertModal} />
    </div>
  );
};

export default DropDownAlert;

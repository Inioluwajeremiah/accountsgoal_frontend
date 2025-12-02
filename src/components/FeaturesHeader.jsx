import React from "react";
import backArrow from "../assets/backArrow.svg";
import closeButton from "../assets/closeIcon.svg";

const FeaturesHeader = ({
  title,
  handleBackButton,
  handleCloseButton,
  dontShowHeader,
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center">
        {!dontShowHeader && (
          <button onClick={handleBackButton}>
            <img src={backArrow} alt="back button icon" />
          </button>
        )}
        <p className="font-inter leading- font-semibold text-[25px] text-black ml-6">
          {title}
        </p>
      </div>
      <div>
        {!dontShowHeader && (
          <button
            className=" w-12 h-12 flex self-end items-center justify-center  p-2 "
            onClick={handleCloseButton}
          >
            <img src={closeButton} alt="close button" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FeaturesHeader;

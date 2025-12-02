import React, { useEffect, useRef } from "react";

import logopic from "../image/logopic.png";
import emailinvite from "../image/emailinvite.gif";
import Modal from "../Modal";

//import { useNavigate } from 'react-router-dom';

const InvitationSent = () => {
  console.log("InvitationSent component rendered");
  return (
    <Modal background={"bg-white"}>
      <div className="h-screen">
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
              <img src={emailinvite} alt="emailinvite"></img>
            </div>

            <h2 className="font-bold font-inter text-[30px]">
              Invitation Sent
            </h2>
            <p className="font-inter text-[#777777]">
              “Success! An invitation has been sent to your colleuge's email
              <br />
              address. They will receive all the necessary instructions to join
              you on <br /> accountsgoal.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InvitationSent;

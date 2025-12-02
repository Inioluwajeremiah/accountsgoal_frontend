import React from "react";

const Modal = ({ children, background }) => {
  return (
    <div
      className={`fixed top-0 h-screen ${
        background ? background : "bg-black/20 "
      } max-h-screen right-0 left-0 flex flex-col justify-center items-center  overflow-scroll`}
    >
      {children}
    </div>
  );
};

export default Modal;

import React from "react";

const TextArea = ({ ...props }) => {
  return (
    <textarea
      {...props}
      name=""
      id=""
      cols="30"
      rows="8"
      className="w-full border border-border-color rounded-3xl px-6 py-2 mt-4 focus:outline-none "
    ></textarea>
  );
};

export default TextArea;

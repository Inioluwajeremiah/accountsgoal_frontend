import React from "react";

const LabelField = ({ labelTitle, required }) => {
  return (
    <div className="flex flex-row items-center mt-8">
      <p className="text-sm">{labelTitle}</p>
      {required && <p className="text-red-600 text-sm ">*</p>}
    </div>
  );
};

export default LabelField;

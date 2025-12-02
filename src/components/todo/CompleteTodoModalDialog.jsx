import React from "react";

const CompleteTodoModalDialog = ({
  title,
  subTitle,
  handleConfirm,
  handleCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-3xl p-6 mx-6">
        <p className="font-bold">{title}</p>
        <p className="mt-3">{subTitle}</p>
        <div className="flex flex-row items-center justify-center gap-x-5 mt-5 ">
          <button
            className="bg-green-600 w-20 h-12 rounded-2xl"
            onClick={handleConfirm}
          >
            <p className="text-white">Yes</p>
          </button>
          <button
            className="bg-red-600 w-20 h-12 rounded-2xl"
            onClick={handleCancel}
          >
            <p className="text-white">No</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteTodoModalDialog;

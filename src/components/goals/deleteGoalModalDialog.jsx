import React from "react";

const DeleteGoalModalDialog = ({
  title,
  subTitle,
  handleConfirm,
  handleCancel,
}) => {
  //console.log('handleConfirm:', handleConfirm);

  const handleConfirmAndClose = async () => {
    console.log('handleConfirmAndClose called'); // Add this line
    console.log('Before handleConfirm');
    const result = await handleConfirm();
    console.log('After handleConfirm, result:', result);
    if (result) {
      console.log('Before handleCancel');
      handleCancel();
      console.log('After handleCancel');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
    {/* <div className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center  items-center  bg-black/50"> */}
      <div className="bg-white rounded-3xl p-6 mx-6">
        <p className="font-bold">{title}</p>
        <p className="mt-3">{subTitle}</p>
        <div className="flex flex-row items-center justify-center gap-x-5 mt-5 ">
          <button
            className="bg-green-600 w-20 h-12 rounded-2xl"
            onClick={handleConfirmAndClose}
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

export default DeleteGoalModalDialog;

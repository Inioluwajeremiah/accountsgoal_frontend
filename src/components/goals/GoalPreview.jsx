import React, { useState, useEffect } from "react";
import FeaturesHeader from "../FeaturesHeader";
import CalendarSmall from "../../icons/CalendarSmall";
import UserIcon from "../../icons/UserIcon";
import ProgressBar from "../ProgressBar";
import CreateFeatureButton from "../CreateFeatureButton";
import editIcon from "../../assets/editIcon.svg";
import EditGoal from "./EditGoal";
import EditGoalModal from "./EditGoalModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import GoalsCardLg from "./GoalsCardLg";
import DeleteGoalModalDialog from "./deleteGoalModalDialog";
import { useDeleteGoalMutation } from "../../store/goalApiSlice";
import DropDownAlert from "../DropDownAlert";

const GoalPreview = ({
  handleTogglePreviewGoalModal,
  handleToggleCloseModal,
  item,
  progressValue,
  progressColor,
  completedSubgoals,
  subGoalsLength,
}) => {
  const [toggleModal, setToggleModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleOpenDeleteModal = () => {
    //console.log('item._id:', item._id); 
    //console.log('uniqueId:', item.excelRow.uniqueId)
    setShowDeleteModal(true);
  };

  

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };





  const [deleteGoal, { isLoading: loadingDelete, error: deleteError }] =
  useDeleteGoalMutation();

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  
  /*const handleDeleteGoal = async () => {
    const response = await deleteGoal({
      uniqueId: item.excelRow.uniqueId,
      id: item?._id,
    });
    if (response?.data?.message === "Goal deleted successfully") {
      handleCloseDeleteModal();
      refetch(); // Refetch the todos to get the updated list
    } else {
      console.error("Error deleting todo: ", response);
    }
  };*/

  const fetchGoals = async () => {
    // Fetch the latest goals from the server
  };

  /*const handleDeleteGoal = async () => {
    const response = await deleteGoal({
      uniqueId: item.excelRow.uniqueId,
      id: item?._id,
    });
    if (response?.data?.message === "Goal Deleted Succesful") { // Change this line
      fetchGoals(); 
      setShowDeleteAlert(true); // Show the delete alert
    setTimeout(() => setShowDeleteAlert(false), 2000); // Hide the delete alert after 2 seconds
      return true;
    } else {
      console.error("Error deleting todo: ", response);
      return false;
    }
    
  };*/

  const handleDeleteGoal = async () => {
    const response = await deleteGoal({
      uniqueId: item.excelRow.uniqueId,
      id: item?._id,
    });
    if (response?.data?.message === "Goal Deleted Succesful") {
      fetchGoals(); 
      setShowDeleteAlert(true); // Show the delete alert
    }
  };

  useEffect(() => {
    if (showDeleteAlert === true) {
      setTimeout(() => {
        setShowDeleteAlert(false);
        handleTogglePreviewGoalModal();
      }, 2000);
    }
  }, [showDeleteAlert, handleTogglePreviewGoalModal]);
   
 

  return (
    <>
      <div
        className={`md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start pt-6  rounded-t-3xl md:rounded-none overflow-y-scroll`}
      >
        {/* <div className="w-full h-full mx-auto flex flex-col justify-between  px-10 py-12 rounded-3xl "> */}
        <div className="w-full h-full mx-auto flex flex-col justify-between  bg-white px-10 py-12 rounded-3xl overflow-y-scroll">
          <div>
            <FeaturesHeader
              title={"Goals"}
              handleBackButton={handleTogglePreviewGoalModal}
              handleCloseButton={handleToggleCloseModal}
            />

            <div className="w-[80%] mr-4 ">
              <p className="text-base font-bold text-left">
                {item?.goalName || "Goal name"}
              </p>

              <div className="flex flex-row items-center mt-6">
                <CalendarSmall />
                <p className="text-xs text-form-text-color  ml-2">
                  {new Date(item?.endDate).toDateString() || "30 days left"}
                </p>
              </div>
              <div className="flex flex-row items-center mt-2 mb-10">
                <UserIcon />
                <p className="text-xs text-form-text-color ml-2">
                  {item?.client}
                </p>
              </div>
            </div>
            {/* horizontal progress bar */}
            <ProgressBar
              progressValue={Math.floor(progressValue * 100)}
              progressColor={progressColor}
            />
            {/* progress text */}
            <div className="flex flex-row justify-between mt-8 mb-6">
              <p
                className={`${
                  progressValue <= 0.3
                    ? "text-[#F35555]"
                    : progressValue > 0.3 && progressValue < 0.7
                    ? "text-[#ffa600e6]"
                    : "text-[#226e22eb]"
                }  font-bold`}
              >
                {completedSubgoals} / {subGoalsLength}
              </p>
              <p
                className={`${
                  progressValue <= 0.3
                    ? "text-[#F35555]"
                    : progressValue > 0.3 && progressValue < 0.7
                    ? "text-[#ffa600e6]"
                    : "text-[#226e22eb]"
                }  font-bold`}
              >
                {Math.floor(progressValue * 100)}%
              </p>
            </div>

            {/* sub goals list */}
            <div className=" mx-auto mt-10">
              {item?.subGoals.map((item, index) => (
                <button
                  className="w-full flex flex-row items-center mt-3"
                  key={index}
                >
                  <input
                   // type="checkbox"
                    name=""
                    id=""
                    checked={item.status === true}
                    className="w-8 h-8 border border-black mr-4  checked:bg-primary-color"
                    onChange={() => null}
                    style={{ display: 'none' }}
                  />
                  <p className="ml-4">{item.title}</p>
                </button>
              ))}
            </div>
          </div>
         
          <div className="flex justify-between items-center mt-4">
  <CreateFeatureButton
    handleClick={handleToggleModal}
    title={"Edit information"}
    isIcon={true}
    icon={editIcon}
  />
  <div className="bg-gray-300 rounded-full flex items-center justify-center p-2 mt-10" style={{ width: '50px', height: '50px' }}>
    <RiDeleteBin6Line
      text="delete"
      size="1.5rem" 
      color="gray" 
      className="cursor-pointer"
      onClick={handleOpenDeleteModal}
    />
  </div>
</div>


        
        </div>
        
      </div>
     
      {toggleModal && (
        <EditGoalModal
          handleBackButton={handleToggleModal}
          handleToggleCloseModal={handleToggleCloseModal}
          item={item}
        />
      )}

      {showDeleteModal && (
        <DeleteGoalModalDialog
          todoId={item._id} 
          uniqueId={item.excelRow.uniqueId} 
          title="Delete Goal"
          subTitle="Are you sure you want to delete this goal?"
          handleDeleteData={item} 
          handleConfirm={handleDeleteGoal}
          handleCancel={handleCloseDeleteModal}
        />
      )}

      {/* ... existing code ... */}
    {showDeleteAlert && (
      <DropDownAlert
        showAlertModal={showDeleteAlert}
        message={"Goal deleted successfully"}
        type={"success"}
      />
    )}
    </>
  );
};

export default GoalPreview;

import React, { useState, useEffect } from "react";

import UserIcon from "../../icons/UserIcon";
import { useSelector } from "react-redux";
import CalendarSmall from "../../icons/CalendarSmall";
import DeleteComponent from "../../icons/DeleteComponent";
import {
  useDeleteGoalMutation,
  useEditGoalMutation,
} from "../../store/goalApiSlice";
import { useGetExcelDataQuery } from "../../store/accountApiSlice";
import CircularProgressBar from "../CircularProgressBar";
import ProgressBar from "../ProgressBar";
import GoalPreview from "./GoalPreview";
//import DeleteGoalModalDialog from "./deleteGoalModalDialog";
//import { RiDeleteBin6Line } from "react-icons/ri";

const GoalsCardLg = ({ item, index, lastIndex, loadingGoals }) => {
  const { accountsGoalUser } = useSelector((state) => state.auth);

  const [selectedItem, setSelectedItem] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [ViewGoalModal, setViewGoalModal] = useState(false);
  const [toggleAttachClients, settoggleAttachClients] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [goalName, setGoalName] = useState(item.goalName);
  const [editGoalName, setEditGoalName] = useState(item.goalName);
  const [date, setDate] = useState(new Date());
  // const [attachedClients, setAttachedClients] = useState([]);
  const [attachClientInput, setAttaChClientInput] = useState("");
  const [attachedClients, setAttachedClients] = useState(item?.client);
  const [attachedClient, setAttachedClient] = useState("");
  const [attachedClientUniqueId, setAttachedClientUniqueId] = useState(
    item?.excelRow?.uniqueId
  );
  const [toggleNewSUbgoals, setToggleNewSubgoals] = useState(false);
  const [subgoalInput, setSubgoalInput] = useState("");
  const [subgoals, setSubgoals] = useState(item?.subGoals);
  const [selectedSubgoals, setSelectedSubgoals] = useState(item?.subGoals);
  const [showAlertModal, setShowAlertModal] = useState(false);

  //const [showDeleteModal, setShowDeleteModal] = useState(false);

  const subGoalsLength = item?.subGoals?.length;
  const completedSubgoals = item?.subGoals.reduce((accumulator, item) => {
    if (item?.status === true) {
      return accumulator + 1;
    } else {
      return accumulator;
    }
  }, 0);

  const progressValue =
    subGoalsLength > 0 ? completedSubgoals / subGoalsLength : 0;

  const isValidForm = !goalName || !date || !attachedClients;

  const [editGoal, { isLoading: loadingEditGoal, error: editGoalError }] =
    useEditGoalMutation();

  //const [deleteGoal, { isLoading: loadingDelete, error: deleteError }] =
  // useDeleteGoalMutation();

  /*const handleOpenDeleteModal = () => {
      //console.log('item._id:', item._id); 
      //console.log('uniqueId:', item.excelRow.uniqueId)
      setShowDeleteModal(true);
    };*/

  /* const handleCloseDeleteModal = () => {
      setShowDeleteModal(false);
    };*/

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

  const renderLeftActions = (progress, dragX) => {
    // const trans = dragX.interpolate({
    //   inputRange: [0, 50, 100, 101],
    //   outputRange: [-20, 0, 0, 1],
    // });
    return (
      <div className="flex flex-row items-center pl-4">
        <DeleteComponent onPressDelete={handleDeleteItem} />
      </div>
    );
  };

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  const handleToggleCloseModal = () => {
    setToggleModal(false);
  };
  const handleToggleEditModal = () => {
    setViewGoalModal(!ViewGoalModal);
  };
  const handleToggleAttachClient = () => {
    settoggleAttachClients(!toggleAttachClients);
  };

  const handleDeleteItem = async () => {
    const response = await deleteGoal({
      uniqueId: item.excelRow.uniqueId,
      id: item._id,
    });
    console.log("delete response ==> ", response);
    if (response.data) {
      // refetch();
    }
  };

  useEffect(() => {
    if (showAlertModal === true) {
      setTimeout(() => {
        setShowAlertModal(false);
      }, 2000);
    }
  });

  return (
    <>
      {/* goal card */}
      <div
        className="w-[80%] md:w-[30%] max-w-[80%] md:max-w-[30%] flex flex-row items-center justify-between "
        renderRightActions={renderLeftActions}
      >
        <button
          key={index}
          className={`w-full h-[164px] max-h-[164px]  flex flex-row items-center justify-between  relative bg-white  py-3 px-4 ${
            lastIndex === index ? "mb-20 md:mb-4" : "mb-4"
          } border border-[#A8A8A8] rounded-xl`}
          onClick={handleToggleModal}
          style={{}}
        >
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
            <div className="flex flex-row items-center mt-2">
              <UserIcon />
              <p className="text-xs text-form-text-color ml-2">
                {attachedClients || "Baylor scott & White Irving"}
              </p>
            </div>
          </div>
          {/* <Progress.Bar progress={0.3} width={200} /> */}
          <div className="w-[20%] flex justify-center items-center ">
            {/* <ProgressBar value={50} maxValue={100} /> */}
            <CircularProgressBar
              progressValue={Math.floor(progressValue * 100)}
              size={86}
              strokeWidth={5}
              strokeColor={
                progressValue <= 0.3
                  ? "#F35555"
                  : progressValue > 0.3 && progressValue < 0.7
                  ? "#ffa600e6"
                  : "#226e22eb"
              }
            />
          </div>
        </button>
      </div>

      {toggleModal && (
        <GoalPreview
          handleTogglePreviewGoalModal={handleToggleModal}
          handleToggleCloseModal={handleToggleCloseModal}
          item={item}
          progressValue={progressValue}
          progressColor={
            progressValue <= 0.3
              ? "#F35555"
              : progressValue > 0.3 && progressValue < 0.7
              ? "#ffa600e6"
              : "#226e22eb"
          }
          completedSubgoals={completedSubgoals}
          subGoalsLength={subGoalsLength}
          fromList={true}
        />
      )}
      {/*<RiDeleteBin6Line 
             text = "delete"
              size={30} // Increase the size as needed
              color="red" // Change the color to blue
              style={{ marginLeft: "auto" }} // Move it to the right
              onClick={handleOpenDeleteModal } // Make it clickable to toggle the edit component
            />*/}

      {/*} {showDeleteModal && (
        <DeleteGoalModalDialog
          todoId={item._id} // Ensure that item._id is the correct todoId
          uniqueId={item.excelRow.uniqueId} // Ensure that item.excelRow.uniqueId is the correct uniqueId
          subTitle="Are you sure you want to delete this goal?"
          handleDeleteData={item} 
          handleConfirm={handleDeleteGoal}
          handleCancel={handleCloseDeleteModal}
        />
      )}*/}
      {/*loadingEditGoal || (loadingCompleteGoal && <LoadingAnimation2 />)*/}
    </>
  );
};

export default React.memo(GoalsCardLg);

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
import { MdBiotech } from "react-icons/md";

const GoalsCard = ({
  item,
  index,
  lastIndex,
  loadingGoals,
  handleToggleCloseModal,
}) => {
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

  const [deleteGoal, { isLoading: loadingDelete, error: deleteError }] =
    useDeleteGoalMutation();

  // const {
  //   data: excelData,
  //   isLoading: loadingExcelData,
  //   isError: isExceElrror,
  //   error: excelDataError,
  //   refetch: refetchExcelData,
  // } = useGetExcelDataQuery({
  //   userId: accountsGoalUser?._id,
  //   token: accountsGoalUser?.token,
  // });

  // let newExcelData = [];
  // excelData &&
  //   excelData.forEach((user) => {
  //     user.data.forEach((data) => newExcelData.push(data));
  //   });

  // // filter users
  // const filteredClientData =
  //   newExcelData &&
  //   newExcelData.filter((user) =>
  //     user?.ACCOUNT_NAME?.toLowerCase().includes(
  //       attachClientInput.toLowerCase()
  //     )
  //   );

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

  // const handleEditGoal = async () => {
    
  //   const body = {
  //     id: item._id,
  //     uniqueId: attachedClientUniqueId,
  //     goalName: goalName,
  //     client: attachedClients,
  //     endDate: date.toString(),
  //     subGoals: selectedSubgoals,
  //   };
  //   console.log("edit goal body ==>", body);
  //   try {
  //     const response = await editGoal(body);

  //     console.log(" edit goal ===> ", response);
  //     if (response.data) {
  //       // refetch();
  //       setShowAlertModal(true);
  //       handleToggleModal();
  //     }

  //     if (response.error) {
  //       Alert.alert("", response.error.data.message);
  //     }
  //   } catch (error) {
  //     Alert.alert("", error.message);
  //   }
  // };

  return (
    <>
      {/* goal card */}
      <div
        className=" flex flex-row items-center justify-between "
        renderRightActions={renderLeftActions}
      >
        <button
          key={index}
          className={`w-full h-[164px] max-h-[164px]  flex flex-row items-center justify-between  relative bg-white  py-3 px-4 ${
            lastIndex === index ? "mb-20" : "mb-4"
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
        />
      )}
    </>
  );
};

export default React.memo(GoalsCard);

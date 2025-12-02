import React, { useEffect, useState } from "react";
import FeaturesHeader from "../FeaturesHeader";
import CreateFeatureButton from "../CreateFeatureButton";
import LabelField from "../forms/LabelField";

import TextInputField from "../forms/TextInputField";
import DateField from "../forms/DateField";
import DropDown from "../forms/DropDown";
import DropDownAlert from "../DropDownAlert";
import { useSelector } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";

import {
  useCompleteGoalMutation,
  useCreateGoalMutation,
  useEditGoalMutation,
} from "../../store/goalApiSlice";
import { useGetExcelDataQuery } from "../../store/accountApiSlice";

import LoadingAnimation2 from "../LoadingAnimation2";
import { BASE_URL } from "../../utils/Endpoints";

const EditGoalModal = ({ handleBackButton, handleToggleCloseModal, item }) => {
  const { accountsGoalUser } = useSelector((state) => state.auth);

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [goalName, setGoalName] = useState(item?.goalName);
  const [date, setDate] = useState(item?.endDate ? item?.endDate : new Date());
  const [toggleAttachClients, settoggleAttachClients] = useState(false);
  const [attachedClients, setAttachedClients] = useState(item?.client);
  const [attachClientInput, setAttaChClientInput] = useState("");
  const [attachedClient, setAttachedClient] = useState(item?.client);
  const [attachedClientUniqueId, setAttachedClientUniqueId] = useState(
    item?.excelRow?.uniqueId
  );
  const [toggleNewSUbgoals, setToggleNewSubgoals] = useState(false);
  const [subgoalInput, setSubgoalInput] = useState("");
  const [subgoals, setSubgoals] = useState(item?.subGoals);
  const [selectedSubgoals, setSelectedSubgoals] = useState(item?.subGoals);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const isValidForm = !goalName || !date || !attachedClient;

  console.log("isValidForm ==> ", goalName + date + attachedClient);

  // edit goal
  const [
    editGoal,
    { isLoading: loadingEditGoal, error: editGoalError, isSuccess },
  ] = useEditGoalMutation();

  console.log("isSuccess ==> ", isSuccess);
  console.log("item ==> ", item);

  // mark goal as complete
  const [
    completeGoal,
    { isLoading: loadingCompleteGoal, error: completeGoalError },
  ] = useCompleteGoalMutation();

  // filter users
  // const filteredClientData =
  //   attachClientInput &&
  //   allUsers &&
  //   allUsers.filter((user) =>
  //     user.email.toLowerCase().includes(attachClientInput.toLocaleLowerCase())
  //   );

  const {
    data: excelData,
    isLoading: loadingExcelData,
    isError: isExceElrror,
    error: excelDataError,
    refetch: refetchExcelData,
  } = useGetExcelDataQuery({
    userId: accountsGoalUser?._id,
    token: accountsGoalUser?.token,
  });

  // filter users
  let newExcelData = [];
  excelData &&
    excelData.forEach((user) => {
      user.data.forEach((data) => newExcelData.push(data));
    });

  // filter users
  const filteredClientData =
    newExcelData &&
    newExcelData.filter((user) =>
      user.ACCOUNT_NAME.toLowerCase().includes(
        attachClientInput.toLocaleLowerCase()
      )
    );

  const handleToggleAttachClient = () => {
    settoggleAttachClients(!toggleAttachClients);
  };

  const handleSelectClients = (evt) => {
    const item = JSON.parse(evt.target.value);
    setAttachedClient(item.ACCOUNT_NAME);
    setAttachedClientUniqueId(item.uniqueId);
    setAttachedClients(item.ACCOUNT_NAME);
    setAttaChClientInput("");
    handleToggleAttachClient();
  };

  const handleDateTimePicker = (evt) => {
    const selectedDate = evt.target.value;
    const currentDate = selectedDate || date;
    setDate(currentDate);
    // setShowDateTimePicker(false);
  };

  const handelToggleDateTimePickerMode = () => {
    setShowDateTimePicker(true);
  };

  const handleToggleNewSubgoals = () => {
    setToggleNewSubgoals(!toggleNewSUbgoals);
  };

  const handleSetSubgoals = (evt) => {
    if (subgoalInput.trim() !== "" && evt.key === "Enter") {
      if (!toggleNewSUbgoals) {
        setSubgoals((prevGoals) => [
          ...prevGoals,
          { title: subgoalInput, status: false },
        ]);
        setSelectedSubgoals((prevGoals) => [
          ...prevGoals,
          { title: subgoalInput, status: false },
        ]);

        setSubgoalInput("");
        setToggleNewSubgoals(false);
      } else {
        setSubgoals((prevGoals) => [
          ...prevGoals,
          { title: subgoalInput, status: true },
        ]);

        setSelectedSubgoals((prevGoals) => [
          ...prevGoals,
          { title: subgoalInput, status: true },
        ]);

        setSubgoalInput("");
        setToggleNewSubgoals(false);
      }
    }
  };

  const handleRemoveSubgoal = (index) => {
    setSubgoals(prevGoals => prevGoals.filter((_, i) => i !== index));
    setSelectedSubgoals(prevGoals => prevGoals.filter((_, i) => i !== index));
  };


  const handleSelectSubgoals = (index) => {
    setSelectedSubgoals((prevGoals) => {
      if (prevGoals[index].status === false) {
        // If status is false, set it to true
        return [
          ...prevGoals.slice(0, index), // Keep previous items before the updated one
          { ...prevGoals[index], status: true }, // Update the status of the selected item
          ...prevGoals.slice(index + 1), // Keep previous items after the updated one
        ];
      }
      if (prevGoals[index].status === true) {
        // If status is true, set it to false
        return [
          ...prevGoals.slice(0, index), // Keep previous items before the updated one
          { ...prevGoals[index], status: false }, // Update the status of the selected item
          ...prevGoals.slice(index + 1), // Keep previous items after the updated one
        ];
      }
      // Return the previous state if no condition is met
      return prevGoals;
    });
  };

  const handleEditGoal = async () => {
    const body = {
      id: item._id,
      uniqueId: attachedClientUniqueId,
      goalName: goalName,
      client: attachedClients,
      endDate: date.toString(),
      subGoals: selectedSubgoals,
    };
    console.log("edit goal body ==>", body);
    try {
      const response = await editGoal(body);

      console.log(" edit goal ===> ", response);
      if (response.data) {
        // refetch();
        setShowAlertModal(true);
        // handleToggleModal();
      }

      if (response.error) {
        Alert.alert("", response.error.data.message);
      }
    } catch (error) {
      Alert.alert("", error.message);
    }
  };

  const handleCompleteGoal = async () => {
    const body = {
      id: item._id,
      uniqueId: attachedClientUniqueId,
    };
    console.log("complete goal body ==>", body);
    try {
      const response = await completeGoal(body);

      console.log(" edit goal ===> ", response);
      if (response.data) {
        // refetch();
        setShowAlertModal(true);
        // handleToggleModal();
      }

      if (response.error) {
        Alert.alert("", response.error.data.message);
      }
    } catch (error) {
      Alert.alert("", error.message);
    }
  };

  useEffect(() => {
    if (showAlertModal === true) {
      setTimeout(() => {
        setShowAlertModal(false);
        handleBackButton();
      }, 2000);
    }
  });

  // call update status endpoint
  useEffect(() => {
    const getColorStatus = () => {
      fetch(
        `${BASE_URL}goal/color-status/${accountsGoalUser?._id}?excelUniqueId=${item?.excelRow.uniqueId}`,
        {
          method: "GET",
          // Authorization: `Bearer ${accountsGoalUser?.token}`,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("color status fetch data", data);
        })

        .catch((err) => {
          console.log("get color error ==> ", err);
        });
    };
    getColorStatus();
    refetchExcelData();
  }, [editGoal, isSuccess]);
  return (
    <div
      className={`md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start pt-6 rounded-t-3xl md:rounded-none  overflow-scroll`}
    >
      <div className="w-full h-full mx-auto flex flex-col justify-between  bg-white px-10 py-12 rounded-3xl overflow-y-scroll">
        <div className="flex flex-col justify-start mb-20 ">
          <FeaturesHeader
            title={"Goals"}
            handleBackButton={handleBackButton}
            handleCloseButton={handleToggleCloseModal}
          />
          {/* Goal Name */}
          <div className="w-[80%] mx-auto">
            <LabelField labelTitle={"Goal Name"} required={true} />
            <TextInputField
              onChange={(e) => setGoalName(e.target.value)}
              value={goalName}
            />
            {/* End Date */}
            <LabelField labelTitle={"End Date"} required={true} />
            <DateField
              dateValue={date}
              value={date}
              handleSelectDate={handleDateTimePicker}
              min={new Date().toISOString().split("T")[0]}
              // onChange={(e) => setDate(e.target.value || date)}
            />
            {/* Attach Clients */}
            <LabelField labelTitle={"Attach Clients"} required={true} />
            <DropDown
              value={attachedClients}
              filteredClientData={filteredClientData}
              handleSelectClients={handleSelectClients}
              handleSearchTerm={setAttaChClientInput}
              searchTerm={attachClientInput}
              attachedClient={attachedClient}
              handleToggleAttachClient={handleToggleAttachClient}
              toggleAttachClient={toggleAttachClients}
            />
          </div>

          {/* sub goals */}
          {/* sub goal title */}
          <div className="mt-14 flex flex-row items-center justify-between">
            <p className="  font-bold text-xl">Sub goals</p>
            <button onClick={handleCompleteGoal}>
              <p className="text-sm text-[#FFA500]">Mark as done</p>
            </button>
          </div>

          <div className="w-[80%] mx-auto mt-6">
            <div className="w-full flex flex-row items-center">
              {/* check box */}
              <input
                type="checkbox"
                name=""
                id=""
                checked={toggleNewSUbgoals}
                className="w-8 h-8 p-1 border border-black mr-6 appearance-none  checked:bg-black "
                onChange={handleToggleNewSubgoals}
              />
              <input
                type="text"
                className="flex-1 h-8 border-b  focus:outline-none"
                placeholder="List item"
                value={subgoalInput}
                onChange={(e) => setSubgoalInput(e.target.value)}
                onKeyDown={handleSetSubgoals}
              />
            </div>
          </div>

          {/* sub goals list */}
        {/*  <div className="w-[80%] mx-auto mt-6">
            {selectedSubgoals.map((item, index) => (
              <button
                className="w-full flex flex-row items-center mt-3"
                key={index}
                onClick={() => handleSelectSubgoals(index)}
              >
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={item.status === true}
                  className="w-8 h-8 p-2 border border-black mr-4  checked:bg-black"
                  onChange={() => null}
                />
                <p className="ml-4">{item.title}</p>
                <div className="flex items-center ml-auto">
                <button 
  className="text-black-500 hover:text-black-700 justify-right mr-50"  
  onClick={() => handleRemoveSubgoal(index)}
>
  <MdOutlineCancel size={20} className="mr-30"/>
</button>
</div>
              </button>
            ))}
          </div>*/}

          <div className="w-[80%] mx-auto mt-6">
{selectedSubgoals.map((item, index) => (
  <button className="w-full flex items-center m-3" key={index}>
    {/* <div className="w-full flex flex-row items-center"> */}
      <input
        type="checkbox"
        name=""
        id=""
        checked={item.status === true}
        className="w-8 h-8 border border-black mr-4 checked:bg-primary-color"
        onChange={() => handleSelectSubgoals(index)}
      />
      <p className="m-4" onClick={() => handleSelectSubgoals(index)}>
        {item.title}
      </p>
      <div className="flex items-center ml-auto">
    {item && item.status !== undefined && (
      <button 
        className="text-black-500 hover:text-black-700 justify-right"  
        onClick={() => handleRemoveSubgoal(index)}
      >
        <MdOutlineCancel size={20} />
      </button>
    )}
    </div>
  </button>
  
))}

</div>


          {/* <Goals /> */}
        </div>
        {/* create goal button */}

        <CreateFeatureButton
          title={"Save changes"}
          handleClick={handleEditGoal}
          isIcon={false}
          isValidForm={isValidForm}
        />
      </div>
      {showAlertModal && (
        <DropDownAlert
          showAlertModal={showAlertModal}
          message={"Goal updated"}
          type={"success"}
        />
      )}
      {loadingEditGoal || (loadingCompleteGoal && <LoadingAnimation2 />)}
    </div>
  );
};

export default EditGoalModal;

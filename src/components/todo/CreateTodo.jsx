import React, { useEffect, useState } from "react";
import FeaturesHeader from "../FeaturesHeader";
import CreateFeatureButton from "../CreateFeatureButton";
import LoadingAnimation2 from "../LoadingAnimation2";
import { useCreateTodoMutation } from "../../store/todoApiSlice";
import { useGetExcelDataQuery } from "../../store/accountApiSlice";
import LabelField from "../forms/LabelField";
import TextInputField from "../forms/TextInputField";
import { priorityData } from "../../utils/dummyData";
import { useSelector } from "react-redux";
import DropDown from "../forms/DropDown";
import DateField from "../forms/DateField";
import TextArea from "../forms/TextArea";
import DropDownAlert from "../DropDownAlert";
import { useGetUserQuery } from "../../store/authApi";
import axios from "axios";
import { BASE_URL } from "../../utils/Endpoints";
//import { Switch } from 'react-router-dom';
//import TodoStatusBar from "./TodoStatusBar";

const CreateTodo = ({
  handleBackButton,
  handleCloseButton,
  fromList,
  fromMap,
  attachedClientAccountName,
  uniqueId,
}) => {
  //const { accountsGoalUser } = useSelector((state) => state.auth);
  const { data: accountsGoalUser, isError, error } = useGetUserQuery();
  //const [todo, setTodo] = useState([]);
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [note, setNote] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [togglePriority, setTogglePriority] = useState(false);
  const [toggleReminder, setToggleReminder] = useState(false);
  const [toggleNoEndDate, setToggleNoEndDate] = useState(false);
  const [toggleAttachClient, settoggleAttachClient] = useState(false);
  const [attachClientInput, setAttaChClientInput] = useState("");
  const [attachedClient, setAttachedClient] = useState(
    attachedClientAccountName || ""
  );
  const [attachedClientUniqueId, setAttachedClientUniqueId] = useState(
    uniqueId || ""
  );

  const [inviteLoad, setInviteLoad] = useState(false);
  const [getInvitedUserData, setGetInvitedUserData] = useState(null);
  const { accountsGoalUser: invitedUserfromLocalStorage } = useSelector(
    (state) => state.auth
  );

  const getInvitedUser = async () => {
    try {
      setInviteLoad(true);
      const res = await axios.get(
        `${BASE_URL}getuser-under-organization/${invitedUserfromLocalStorage.organizationId}/${invitedUserfromLocalStorage.userId}/${invitedUserfromLocalStorage._id}`
      );
      if (res) {
        console.log(res.data, "innnnnnvvvv");
        setGetInvitedUserData(res?.data[0]);
      }
      setInviteLoad(false);
    } catch (error) {
      setInviteLoad(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getInvitedUser();
  }, []);

  const isValidForm = !eventName || !date || !priority || !attachedClient;

  const [createTodo, { isLoading: loadingCreateTodo, error: createTodoError }] =
    useCreateTodoMutation();

  const {
    data: excelData,
    isLoading: loadingExcelData,
    isError: isExceElrror,
    error: excelDataError,
    refetch: refetchExcelData,
  } = useGetExcelDataQuery({
    userId: accountsGoalUser
      ? accountsGoalUser?._id
      : inviteLoad
      ? "loading"
      : getInvitedUserData && getInvitedUserData?.userId?._id,
    // token: accountsGoalUser?.token,
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

  const handleSearchClient = (evt) => {
    setAttaChClientInput(evt.target.value);
  };
  const handleCloseCreateGoalModal = () => {
    handleBackButton();
    handleCloseButton();
  };
  const handleDateTimePicker = (evt) => {
    const selectedDate = evt.target.value;
    const currentDate = selectedDate || date;
    setDate(currentDate);
    // setShowDateTimePicker(false);
  };

  const handleTogglePriority = () => {
    setTogglePriority(!togglePriority);
  };
  const handleSelectPriority = (value) => {
    setPriority(value);
    handleTogglePriority();
  };
  const handleToggleAttachClient = () => {
    settoggleAttachClient(!toggleAttachClient);
  };

  const handleSelectClients = (item) => {
    // const item = JSON.parse(evt.target.value);
    // const item = evt.target.value;
    console.log("item ACCOUNT_NAME ==> ", item);
    setAttachedClient(item?.ACCOUNT_NAME);
    setAttachedClientUniqueId(item.uniqueId);
    // setAttaChClientInput("");
    handleToggleAttachClient();
  };
  const handleToggleReminder = () => {
    setToggleReminder((previousState) => !previousState);
  };
  const handleToggleNoEndDate = () => {
    setToggleNoEndDate((previousState) => !previousState);
  };

  const handleCreateTodo = async () => {
    const body = {
      uniqueId: attachedClientUniqueId,
      user: accountsGoalUser
        ? accountsGoalUser?._id
        : inviteLoad
        ? "loading"
        : getInvitedUserData && getInvitedUserData?.userId?._id,
      todoName: eventName,
      attachClient: attachedClient,
      endDate: date.toString(),
      setPriority: priority,
      noEndDate: toggleNoEndDate,
      setReminder: toggleReminder,
      status: false,
      note: note,
    };
    try {
      const response = await createTodo(body);
      console.log("todo body ==>", body);
      console.log("todo ===> ", response);
      //setTodo((prevTodos) => [...prevTodos, response.data]);

      if (response.data) {
        // Add the new todo to the todos state

        // refetchExcelData();
        setShowAlertModal(true);
        // handleBackButton();
        setEventName("");
        setDate(null);
        setPriority("");
        setToggleReminder(false);
        setNote("");
      }

      if (response.error) {
        alert(response.error.data?.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (showAlertModal === true) {
      setTimeout(() => {
        setShowAlertModal(false);
        handleBackButton();
      }, 3000);
    }
  });

  return (
    <div
      className={`w-full md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start pt-6 rounded-t-3xl md:rounded-none  overflow-scroll`}
    >
      <div className="w-full h-full mx-auto flex flex-col   bg-white px-10 py-12 rounded-3xl overflow-y-scroll">
        <div className="flex flex-col justify-start mb-20 ">
          <FeaturesHeader
            title={"To-do list"}
            handleBackButton={handleBackButton}
            handleCloseButton={
              fromList ? handleCloseCreateGoalModal : handleCloseButton
            }
          />

          <div className="w-[80%] mx-auto">
            {/* todo */}
            <LabelField labelTitle={"Todo"} required={true} />
            <TextInputField
              // placeholder="Todo name"
              color={"#B9B9B9"}
              onChange={(e) => setEventName(e.target.value)}
            />
            {/* attachedClients */}
            {filteredClientData && (
              <>
                <LabelField labelTitle={"Attach clients"} required={true} />
                {fromMap ? (
                  <button
                    className="w-full mt-4 h-12 flex flex-row items-center justify-between  rounded-full px-6  py-2 border border-border-color"
                    onClick={null}
                  >
                    <p className="text-sm">{attachedClient}</p>
                  </button>
                ) : (
                  <DropDown
                    filteredClientData={
                      filteredClientData && filteredClientData
                    }
                    handleSelectClients={handleSelectClients}
                    handleSearchTerm={handleSearchClient}
                    searchTerm={attachClientInput}
                    attachedClient={attachedClient}
                    handleToggleAttachClient={handleToggleAttachClient}
                    toggleAttachClient={toggleAttachClient}
                  />
                )}
              </>
            )}

            {/* enddate */}
            <LabelField labelTitle={"Date"} required={true} />
            <DateField
              dateValue={date}
              handleSelectDate={handleDateTimePicker}
              min={new Date().toISOString().split("T")[0]}
              // onChange={(e) => setDate(e.target.value || date.target.value)}
            />
            <br />
            <br />
            {/* no end date */}
            {/*<div className="mt-10 items-center flex-row justify-between  ">
            <p>No end date for task</p>
           <Switch 
              trackColor={{
                false: "#C5C5C5",
                true: "#4169E1",
              }}
              thumbColor={toggleReminder ? "#fff" : "#fff"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleToggleNoEndDate}
              value={toggleNoEndDate}
             {/*  />
          </div> */}

            {/*<LabelField
  label="No End Date" className = "bg-blue-600"
  
  value={toggleNoEndDate ? "Yes"  : "No"}
  
  onClick={handleToggleNoEndDate}
/>*/}

            <div className="flex items-center justify-between">
              <label className="font-inter text-[14px]" htmlFor="noEndDate">
                No End Date
              </label>
              <div
                className={`w-11 h-7 rounded-full relative cursor-pointer transition-colors duration-300 ${
                  toggleNoEndDate ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={handleToggleNoEndDate}
              >
                <span
                  className={`block w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    toggleNoEndDate ? "translate-x-4" : ""
                  }`}
                ></span>
              </div>
            </div>

            {/* priority */}
            <LabelField labelTitle={"Set Priority"} required={true} />
            <div className="w-full flex flex-row  mt-4  gap-x-[3%] ">
              {priorityData.slice(1, 4).map((item, index) => (
                <button
                  onClick={() => handleSelectPriority(item.title)}
                  className={`w-[30%] 2xl:w-[30%] h-12 flex items-center justify-start rounded-lg ${
                    index === 0
                      ? "bg-[#6787E7]"
                      : index === 1
                      ? "bg-[#809BEB]"
                      : "bg-[#C4D1F6]"
                  }  ${priority === item.title ? "border border-black" : ""}`}
                  key={index}
                >
                  <p
                    className={` text-white text-sm text-center py-1 px-2 ${
                      priority === item.title ? "" : ""
                    }`}
                  >
                    {item.title}
                  </p>
                </button>
              ))}
            </div>

            {/* reminder */}
            {/* <div className="mt-10 items-center flex-row justify-between  ">
            <p>Set Reminder</p>
            {/*<Switch
              trackColor={{
                false: "#C5C5C5",
                true: "#4169E1",
              }}
              thumbColor={toggleReminder ? "#fff" : "#fff"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleToggleReminder}
              value={toggleReminder}
           {/* />
          </div> */}
            {/*<LabelField className="mt-10 items-center flex-row justify-between"
  label="Set Reminder"
  value={toggleReminder ? "Yes" : "No"}
  onClick={handleToggleReminder}
/></div>*/}
            <br />

            <div className="flex items-center justify-between">
              <label className="font-inter text-[14px]" htmlFor="reminder">
                Set Reminder
              </label>
              <div
                className={`w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-300 ${
                  toggleReminder ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={handleToggleReminder}
              >
                <span
                  className={`block w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    toggleReminder ? "translate-x-5" : ""
                  }`}
                ></span>
              </div>
            </div>

            {/* note */}
            <LabelField labelTitle={"Note"} required={false} />
            <TextArea
              maxLength={200}
              color={"#B9B9B9"}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <CreateFeatureButton
          title={"Create To-do"}
          handleClick={handleCreateTodo}
          isIcon={false}
          isValidForm={isValidForm}
        />
      </div>
      {showAlertModal && (
        <DropDownAlert
          showAlertModal={showAlertModal}
          message={"To-do created"}
          type={"success"}
        />
      )}

      {loadingCreateTodo && <LoadingAnimation2 />}
    </div>
  );
};

export default CreateTodo;

import React, { useEffect, useState } from "react";
import FeaturesHeader from "../FeaturesHeader";
import CreateFeatureButton from "../CreateFeatureButton";
import LabelField from "../forms/LabelField";
import Goals from "../../screens/GoalsOld";
import TextInputField from "../forms/TextInputField";
import DateField from "../forms/DateField";
import DropDown from "../forms/DropDown";
import DropDownAlert from "../DropDownAlert";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { useCreateGoalMutation } from "../../store/goalApiSlice";
import { useGetExcelDataQuery } from "../../store/accountApiSlice";
import LoadingAnimation2 from "../LoadingAnimation2";
import { useGetUserQuery } from "../../store/authApi";
import axios from "axios";
import { BASE_URL } from "../../utils/Endpoints";
import { MdOutlineCancel } from "react-icons/md";

const CreateGoalModal = ({
  handleBackButton,
  handleCloseButton,
  fromList,
  fromMap,
  attachedClientAccountName,
  uniqueId,
}) => {
  // const { accountsGoalUser } = useSelector((state) => state.auth);

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

  const {
    data: accountsGoalUser,
    isLoading,
    isError,
    error,
  } = useGetUserQuery();

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [date, setDate] = useState(null);
  const [toggleAttachClient, settoggleAttachClient] = useState(false);
  const [attachClientInput, setAttaChClientInput] = useState("");
  const [attachedClient, setAttachedClient] = useState(
    attachedClientAccountName || ""
  );
  const [attachedClientUniqueId, setAttachedClientUniqueId] = useState(
    uniqueId || ""
  );
  const [toggleNewSUbgoals, setToggleNewSubgoals] = useState(false);
  const [subgoalInput, setSubgoalInput] = useState("");
  const [subgoals, setSubgoals] = useState([]);
  const [selectedSubgoals, setSelectedSubgoals] = useState([]);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const isValidForm = !goalName || !date || !attachedClient;

  console.log("isValidForm ==> ", goalName + date + attachedClient);

  // create goal
  const [createGoal, { isLoading: loadingCreateGoal, error: createGoalError }] =
    useCreateGoalMutation();

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
      user.ACCOUNT_NAME.toLowerCase().includes(attachClientInput.toLowerCase())
    );

  const handleSearchClient = (evt) => {
    setAttaChClientInput(evt.target.value);
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

  const handleCreateGoal = async () => {
    const body = {
      uniqueId: attachedClientUniqueId,
      user: accountsGoalUser
        ? accountsGoalUser?._id
        : inviteLoad
        ? "loading"
        : getInvitedUserData && getInvitedUserData?.userId?._id,
      goalName: goalName,
      client: attachedClient,
      endDate: date.toString(),
      subGoals: selectedSubgoals,
    };


  

    try {
      const response = await createGoal(body);

      if (response.data) {
        // refetch();
        setShowAlertModal(true);
        // handleToggleModal();
        setSubgoals([]);
        setSelectedSubgoals([]);
        setAttachedClient("");
        setDate(null);
      }

      if (response.error) {
        Alert.alert("", response.error.data.message);
      }
    } catch (error) {
      Alert.alert("", error.message);
    }
  };

  const handleCloseCreateGoalModal = () => {
    handleBackButton();
    handleCloseButton();
  };

  useEffect(() => {
    if (showAlertModal === true) {
      setTimeout(() => {
        setShowAlertModal(false);
        handleBackButton();
      }, 2000);
    }
  });

  return (
    <div
      className={`md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start pt-6 rounded-t-3xl md:rounded-none  overflow-scroll`}
    >
      <div className="w-full h-full mx-auto flex flex-col justify-between  bg-white px-10 py-12 rounded-3xl overflow-y-scroll">
        <div className="flex flex-col justify-start mb-20 ">
          <FeaturesHeader
            title={"Goals"}
            handleBackButton={handleBackButton}
            handleCloseButton={
              fromList ? handleCloseCreateGoalModal : handleCloseButton
            }
          />
          {/* Goal Name */}
          <div className="w-[80%] mx-auto">
            <LabelField labelTitle={"Goal Name"} required={true} />
            <TextInputField onChange={(e) => setGoalName(e.target.value)} />
            {/* End Date */}
            <LabelField labelTitle={"End Date"} required={true} />
            <DateField
              dateValue={date}
              handleSelectDate={handleDateTimePicker}
              min={new Date().toISOString().split("T")[0]}
              // onChange={(e) => setDate(e.target.value || date)}
            />
            {/* Attach Clients */}
            <LabelField labelTitle={"Attach Clients"} required={true} />
            {fromMap ? (
              <button
                className="w-full mt-4 h-12 flex flex-row items-center justify-between  rounded-full px-6  py-2 border border-border-color"
                onClick={null}
              >
                <p className="text-sm">{attachedClient}</p>
              </button>
            ) : (
              <DropDown
                filteredClientData={filteredClientData && filteredClientData}
                handleSelectClients={handleSelectClients}
                handleSearchTerm={handleSearchClient}
                searchTerm={attachClientInput}
                attachedClient={attachedClient}
                handleToggleAttachClient={handleToggleAttachClient}
                toggleAttachClient={toggleAttachClient}
              />
            )}
          </div>

          {/* sub goals */}
          {/* sub goal title */}
          <p className="mt-14  font-bold text-xl">Sub goals</p>
          <div className="w-[80%] mx-auto mt-6">
            <div className="w-full flex flex-row items-center">
              {/* check box */}
              <input
                type="checkbox"
                name=""
                id=""
                checked={toggleNewSUbgoals}
                className="w-8 h-8 border border-black mr-6  checked:bg-primary-color"
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
          <div className="w-[80%] mx-auto mt-6">
            {selectedSubgoals.map((item, index) => (
              <button
                className="w-full flex  flex-row items-center mt-3"
                key={index}
                // onClick={() => handleSelectSubgoals(index)}
              >
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={item.status === true}
                  className="w-8 h-8 border border-black mr-4  checked:bg-primary-color"
                  onChange={() => handleSelectSubgoals(index)}
                />
                <p className="m-4" onClick={() => handleSelectSubgoals(index)}>
                  {item.title}
                </p>
                <div className="flex items-center ml-auto">
                <button 
  className="text-black-500 hover:text-black-700 justify-right mr-50"  
  onClick={() => handleRemoveSubgoal(index)}
>
  <MdOutlineCancel size={20} className="mr-30"/>
</button>
</div>
                
                {/* <p className="ml-4">{item.title}</p> */}
              </button>
            ))}
          </div>

          {/* <Goals /> */}
        </div>

        <CreateFeatureButton
          title={"Create goal"}
          handleClick={handleCreateGoal}
          isIcon={false}
          isValidForm={isValidForm}
        />
      </div>
      {showAlertModal && (
        <DropDownAlert
          showAlertModal={showAlertModal}
          message={"Goal created"}
          type={"success"}
        />
      )}

      {loadingCreateGoal && <LoadingAnimation2 />}
    </div>
  );
};

export default CreateGoalModal;

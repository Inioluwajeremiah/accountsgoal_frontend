import React, { useEffect, useState } from "react";
import MapScreen from "../assets/map.png";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import Axios from "axios";
import { useGetExcelDataQuery } from "../store/accountApiSlice";
import { useGetUserQuery } from "../store/authApi";
import { useCreateGoalMutation } from "../store/goalApiSlice";
import DropDown from "../components/forms/DropDown";
import LabelField from "../components/forms/LabelField";
import DateField from "../components/forms/DateField";
import DropDownAlert from "../components/DropDownAlert";
import CreateFeatureButton from "../components/CreateFeatureButton";
import LoadingAnimation2 from "../components/LoadingAnimation2";



const Goals = () => {
  const [checked, setChecked] = useState(false);
  const [subgoals, setSubgoals] = useState([{ id: 1, value: "" }]);
  // const [formData, setFormData] = useState({
  //   goalName: "",
  //   client: "",
  //   endDate: "",
  //   subGoals: [],
  // });
  const [goalName, setGoalName] = useState("");
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [selectedSubgoals, setSelectedSubgoals] = useState([]);
  const [subgoalInput, setSubgoalInput] = useState("");
  const [toggleNewSUbgoals, setToggleNewSubgoals] = useState(false);
  const [attachedClient, setAttachedClient] = useState("");
  const [attachedClientUniqueId, setAttachedClientUniqueId] = useState("");
  const [toggleAttachClient, settoggleAttachClient] = useState(false);
  const [attachClientInput, setAttaChClientInput] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);

  const isValidForm = !goalName || !date || !attachedClient;

  // create goal
  const [createGoal, { isLoading: loadingCreateGoal, error: createGoalError }] =
    useCreateGoalMutation();
  
  const handleChange = (event) => {
    const { name, value } = event.target; // Extract name and value from the event target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Update the formData state with the new value
    }));
    console.log(formData);
  };

  const {
    data: accountsGoalUser,
    isError,
    error,
  } = useGetUserQuery();

  const {
    data: excelData,
    isLoading: loadingExcelData,
    isError: isExceElrror,
    error: excelDataError,
    refetch: refetchExcelData,
  } = useGetExcelDataQuery({
    userId: accountsGoalUser?._id,
    // token: accountsGoalUser?.token,
  });

    // filter users
    let newExcelData = [];
    excelData &&
      excelData?.forEach((user) => {
        user?.data?.forEach((data) => newExcelData.push(data));
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

  const handleSubgoalChange = (index, event) => {
    const { value } = event.target;
    const updatedSubgoals = [...subgoals];
    updatedSubgoals[index] = {
      ...updatedSubgoals[index],
      value,
      status: "",
      title: "",
    };
    setSubgoals(updatedSubgoals);
  };

  const handleSetSubgoals = (event) => {
    if (event.key === "Enter") {
      setSubgoals((prevGoals) => [
        ...prevGoals,
        { title: subgoalInput, status: false },
      ]);
      setSelectedSubgoals((prevGoals) => [
        ...prevGoals,
        { title: subgoalInput, status: false },
      ]);
      console.log("subgoals ===> ", subgoals);
      setSubgoalInput("");
      setToggleNewSubgoals(false);
    }
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

  const handleDateTimePicker = (evt) => {
    const selectedDate = evt.target.value;
    const currentDate = selectedDate || date;
    setDate(currentDate);
    // setShowDateTimePicker(false);
  };

  const handelToggleDateTimePickerMode = () => {
    setShowDateTimePicker(true);
  };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage("");

//     // Convert subgoals array into an array of objects with status and title
//     /*const subGoalsArray = subgoals.map(subgoal => ({
//     value: subgoal.value,
//     status: "In Progress", // Default status
//     title: subgoal.value // Using value as title for simplicity, adjust as needed
//  }));*/

//     // Include subGoals from subgoals state

//     Axios.post("http://localhost:5000/api/goal/createGoal", {
//       user: "65cb2da51a72aa8fffe4f20b",
//       goalName: formData.goalName,
//       client: formData.client,
//       endDate: formData.endDate,
//       subGoals: selectedSubgoals,
//     })

//       .then((res) => {
//         console.log(res.data);
//         setMessage("Goal created successfully.");
//         // Optionally, clear the form or show a success message
//         setFormData({
//           goalName: "",
//           client: "",
//           endDate: "",
//           subGoals: [],
//         });
//         setIsSuccess(true); // Set success state to true
//       })
//       .catch((err) => {
//         console.error(err);
//         setMessage("An error occurred while creating the goal.");
//         setIsSuccess(false);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

const handleCreateGoal = async () => {
  const body = {
    uniqueId: attachedClientUniqueId,
    user: accountsGoalUser._id,
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
     alert("", response.error.data.message);
    }
  } catch (error) {
   alert("", error.message);
   console.log(error);
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
    <div className="flex h-screen">
      {/* <div className="">
        <img
          src={MapScreen}
          alt="map screen image"
          className="w-full h-full object-cover"
        />
      </div> */}

      <div className="p-">
        <div className="justify-items-start p-4">
          <div className="flex justify-between w-full">
            {" "}
            {/* Adjusted to use flex and justify-between */}
            <div className="flex gap-x-10 items-center w-full">
              {" "}
              {/* Adjusted to use flex and justify-start */}
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold font-inter">Goals</h1>
              </div>
            </div>
            <div>
              <div className="mr-3">
                <MdOutlineCancel className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="px-10 mt-16">
            {isLoading && <p>Loading...</p>}
            {message && (
              <p
                className={`${
                  isSuccess ? "bg-green-500" : "bg-red-500"
                } text-center text-white py-3 w-full mt-5`}
              >
                {message}
              </p>
            )}

            <div className="px-10 mt-16">
              <div className="flex flex-col gap-y-1 mt-14 md:mt-4">
                <label className="font-inter text-[14px]" htmlFor="start date">
                  Goal Name <span className="text-[#ed0202]">*</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="goalName"
                  value={goalName}
                  onChange={(e)=>setGoalName(e.target.value)} 
                  className="border-2 rounded-2xl placeholder:text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-[461px] h-[54px]"
                />
              </div>

              <div className="flex flex-col gap-y-1 mt-14 md:mt-10">
              {/* Attach Clients */}
            <LabelField labelTitle={"Attach Clients"} required={true} />
            <DropDown
              filteredClientData={filteredClientData && filteredClientData}
              handleSelectClients={handleSelectClients}
              handleSearchTerm={handleSearchClient}
              searchTerm={attachClientInput}
              attachedClient={attachedClient}
              handleToggleAttachClient={handleToggleAttachClient}
              toggleAttachClient={toggleAttachClient}
            />
                {/* <label className="font-inter text-[14px]" htmlFor="client">
                  Client<span className="text-[#ed0202]">*</span>
                </label>
                <select
                  name="client" // Ensure this matches the key in your formData state
                  value={formData.client}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Client</option>
                  <option value="Israel@accountsgoal.com">
                    Israel@accountsgoal.com
                  </option>
                  <option value="Israel@gloriation.com">
                    Israel@gloriation.com
                  </option>
                  <option value="Davidson@gloriation.com">
                    Davidson@gloriation.com
                  </option>
                </select> */}
              </div>
              <div className="flex flex-col gap-y-1 mt-14 md:mt-10">
              <LabelField labelTitle={"End Date"} required={true} />
            <DateField
              dateValue={date}
              handleSelectDate={handleDateTimePicker}
              // onChange={(e) => setDate(e.target.value || date)}
            />
              </div>
            </div>
            <div className="flex flex-col gap-y-1 mt-14 md:mt-10 px-5">
              <h1 className="text-3xl font-bold ">Sub Goals</h1>
              <div className="flex items-center gap-x-4 mt-3 ml-12">
                <div className="h-7 w-7 overflow-hidden border-2 border-black cursor-pointer">
                  <input
                    type="checkbox"
                    className="bg-transparent h-full w-full"
                  />
                </div>
                <input
                  type="text"
                  placeholder="list item"
                  value={subgoalInput}
                  onChange={(event) => setSubgoalInput(event.target.value)}
                  onKeyDown={handleSetSubgoals}
                  className="border-2 rounded-2xl placeholder:text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-[461px] h-[54px]"
                />
              </div>
              {/*
              {subgoals.map((subgoal, index) => (
                <div
                  className="flex flex-row items-center justify-center"
                  key={index}
                >
                  <div className="h-7 w-7 pr-8  overflow-hidden border-2 border-black cursor-pointer align-right">
                    <input
                      type="checkbox"
                      value={subgoalInput}
                      onChange={(event) => setSubgoalInput(event.target.value)}
                      onKeyDown={(event) => handleSelectSubgoals(event)}
                      // onChange={(event) => setSubgoalInput(event.target.value)}
                      // onKeyDown={(event) =>handleSelectSubgoals(event)}
                      className="bg-transparent h-full w-full pr-80 mr-96"
                    />
                  </div>
                  <p className="text-black">{subgoal.title}</p>
                </div>
              ))}*/}

              {subgoals.map((subgoal, index) => (
  <div className="flex flex-row items-center justify-center" key={index}>
    <label className="flex items-center cursor-pointer">
      <div className="h-7 w-7 pr-8 overflow-hidden border-2 border-black">
        <input
          type="checkbox"
          value={subgoalInput}
          onChange={(event) => setSubgoalInput(event.target.value)}
          onKeyDown={(event) => handleSelectSubgoals(event)}
          className="bg-transparent h-full w-full pr-80 mr-96"
        />
      </div>
      <p className="text-black">{subgoal.title}</p>
    </label>
  </div>
))}
            </div>

            <br />
            <br />
            <br />
            <br />

            {/* <button
              onClick={handleCreateGoal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded-full focus:outline-none focus:shadow-outline mt-20 mx-auto block"
              type="submit"
            >
              Create Goal
            </button> */}
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
      </div>
    </div>
  );
};

export default Goals;

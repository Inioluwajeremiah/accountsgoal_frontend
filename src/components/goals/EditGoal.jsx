import React, { useState, useEffect } from "react";
import MapScreen from "../../assets/map.png";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import axios from "axios";

const EditGoal = () => {
  const [goalData, setGoalData] = useState({});
  const goalId = "662b485d63d07379df542ffe"; // The goal ID you want to edit

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/goal/getGoalById/${goalId}`
        );
        setGoalData(response.data);
      } catch (error) {
        console.error("Error fetching goal data:", error);
      }
    };

    fetchGoalData();
  }, [goalId]);

  const [subgoals, setSubgoals] = useState([{ id: 1, value: "" }]);
  const [formData, setFormData] = useState({
    goalName: "",
    client: "",
    endDate: "",
    subGoals: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [selectedSubgoals, setSelectedSubgoals] = useState([]);
  const [subgoalInput, setSubgoalInput] = useState("");
  const [toggleNewSubgoals, setToggleNewSubgoals] = useState(false);
  const totalDays = 30; // Example total days
  const daysLeft = 30; // Example days left
  const progressPercentage = 20; // Example percentage, you can replace it with your logic

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      setSubgoalInput("");
      setToggleNewSubgoals(false);
    }
  };

  const handleSelectSubgoals = (index) => {
    setSelectedSubgoals((prevGoals) => {
      if (prevGoals[index].status === false) {
        return [
          ...prevGoals.slice(0, index),
          { ...prevGoals[index], status: true },
          ...prevGoals.slice(index + 1),
        ];
      }
      if (prevGoals[index].status === true) {
        return [
          ...prevGoals.slice(0, index),
          { ...prevGoals[index], status: false },
          ...prevGoals.slice(index + 1),
        ];
      }
      return prevGoals;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/goal/updateGoal/${goalId}`,
        goalData
      );
      console.log("Goal updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="">
        <img
          src={MapScreen}
          alt="map screen image"
          className="w-full h-full object-cover"
        />
      </div>

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
                  value={goalData.goalName || ""}
                  onChange={handleChange} // Pass the event to handleChange
                  className="border-2 rounded-2xl placeholder:text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-[461px] h-[54px]"
                />
              </div>

              <div className="flex flex-col gap-y-1 mt-14 md:mt-10">
                <label className="font-inter text-[14px]" htmlFor="client">
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
                </select>
              </div>
              <div className="flex flex-col gap-y-1 mt-14 md:mt-10">
                <label className="font-inter text-[14px]" htmlFor="start date">
                  End Date<span className="text-[#ed0202]">*</span>
                </label>
                <input
                  type="date"
                  placeholder=""
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="border-2 rounded-2xl placeholder:text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-[461px] h-[54px]"
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
              ))}
            </div>

            <br />
            <br />
            <br />
            <br />

            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded-full focus:outline-none focus:shadow-outline mt-20 mx-auto block"
              type="submit"
            >
              Create Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGoal;

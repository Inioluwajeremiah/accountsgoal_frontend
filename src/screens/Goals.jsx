/*import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllGoalsQuery } from "../store/goalApiSlice";
import goalsIcon from "../assets/goalsIcon.svg";
import LoadingAnimation2 from "../components/LoadingAnimation2";
import GoalsCardLg from "../components/goals/GoalsCardLg";
import FeaturesMainHeader from "../components/FeaturesMainHeader";
import LoadingAnimation from "../components/LoadingAnimation";
import AddFloatingButon from "../components/AddFloatingButon";
import CreateGoalModal from "../components/goals/CreateGoalModal";
import emptyGoal from "../assets/emptyGoal.svg";
import CreateFeatureButton from "../components/CreateFeatureButton";

const Goals = () => {
  const { accountsGoalUser } = useSelector((state) => state.auth);
  const [showCreateGoalModal, setShowCreateGoalModal] = useState(false);
  // const [allGoals, setAlGoals] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: goals,
    refetch: refetchGoals,
    isLoading: loadingGoals,
    error: goalError,
  } = useGetAllGoalsQuery({ user: accountsGoalUser?._id });

  const allGoals = useMemo(() => {
    if (goals && goals.goals) {
      let filteredGoals = goals.goals.filter((item) =>
        item.goalName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Sort the filtered goals in ascending order based on the endDate
      return filteredGoals.sort(
        (a, b) => new Date(a.endDate) - new Date(b.endDate)
      );
    }
    return [];
  }, [goals, searchTerm]);


  /*const allGoals = useMemo(() => {
    if (goals) {
      return goals.goals.filter((item) =>
        item.goalName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [goals, searchTerm]);*/

/* const handleToggleCreateGoalModal = () => {
    setShowCreateGoalModal(!showCreateGoalModal);
  };*/

//return (
{
  /*<div className="px-10 pt-10 bg-screen-bg h-screen overflow-y-scroll">
      <FeaturesMainHeader
        map={true}
        placeHolderText={"Search by name"}
        handleSearch={setSearchTerm}
      />
      <div className=" flex flex-row flex-wrap  items-center gap-4 mt-10">
        {!loadingGoals &&
          allGoals &&
          allGoals?.map((item, index) => (
            <GoalsCardLg
              key={index}
              // loadingGoals={loadingGoals}
              item={item}
              index={index}
              lastIndex={allGoals.length - 1}

              // handleToggleCloseModal={handleToggleCloseModal}
            />
          ))}
        {!loadingGoals && !allGoals && (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <img src={goalsIcon} alt="goals icon" />
            <p className="text-[24px] text-[#A8A8A8] mt-6">No goals is set</p>
          </div>
        )}
      {/*  <img src={emptyGoal} alt="emptyGoal" /> 
        {loadingGoals && <LoadingAnimation />}
      </div>

      <AddFloatingButon handleOnclick={handleToggleCreateGoalModal} />

      {showCreateGoalModal && (
        <CreateGoalModal
          handleBackButton={handleToggleCreateGoalModal}
          handleCloseButton={() => setShowCreateGoalModal(false)}
          fromList={true}
        />
      )}
    </div>
  )
    
}*/
}

{
  /*return (

  <div className="px-10 pt-10 bg-screen-bg h-screen overflow-y-scroll">
      <FeaturesMainHeader
        map={true}
        placeHolderText={"Search by name"}
        handleSearch={setSearchTerm}
        showFilterIcon={false}
      />
      <div className="flex flex-row flex-wrap items-start gap-4 mt-10 ">
      {!loadingGoals && goals && goals.goals && goals.goals.length > 0 ? (
        allGoals.map((item, index) => (
          <GoalsCardLg
            key={index}
            item={item}
            index={index}
            lastIndex={allGoals.length - 1}
          />
        ))
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center space-y-4 mt-20">
            <img src={emptyGoal} alt="emptyGoal" />
            <br/>
            <CreateFeatureButton
              title={"Create Goal"}
              handleClick={handleToggleCreateGoalModal}
              isIcon={false}
              customClass="create-goal-button"
            />
          </div>
        )}
        {loadingGoals && <LoadingAnimation />}
      </div>

      <AddFloatingButon handleOnclick={handleToggleCreateGoalModal} />

      {showCreateGoalModal && (
        <CreateGoalModal
          handleBackButton={handleToggleCreateGoalModal}
          handleCloseButton={() => setShowCreateGoalModal(false)}
          fromList={true}
        />
      )}
    </div>
  );
};
   
export default Goals;*/
}

import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllGoalsQuery } from "../store/goalApiSlice";
import goalsIcon from "../assets/goalsIcon.svg";
import LoadingAnimation2 from "../components/LoadingAnimation2";
import GoalsCardLg from "../components/goals/GoalsCardLg";
import FeaturesMainHeader from "../components/FeaturesMainHeader";
import LoadingAnimation from "../components/LoadingAnimation";
import AddFloatingButon from "../components/AddFloatingButon";
import CreateGoalModal from "../components/goals/CreateGoalModal";
import emptyGoal from "../assets/emptyGoal.svg";
import CreateFeatureButton from "../components/CreateFeatureButton";
import axios from "axios";
import { BASE_URL } from "../utils/Endpoints";
import { useGetUserQuery } from "../store/authApi";

const Goals = () => {
  // const { accountsGoalUser } = useSelector((state) => state.auth);
  const [showCreateGoalModal, setShowCreateGoalModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  //const [selectedDate, setSelectedDate] = useState(null);
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

  const {
    data: goals,
    refetch: refetchGoals,
    isLoading: loadingGoals,
    error: goalError,
  } = useGetAllGoalsQuery({
    user: accountsGoalUser
      ? accountsGoalUser?._id
      : inviteLoad
      ? "loading"
      : getInvitedUserData && getInvitedUserData?.userId?._id,
  });

  console.log(goals);
  console.log("Loading:", loadingGoals);
  if (goalError) {
    console.log("Error:", goalError);
  } else {
    console.log("No error message was provided.");
  }

  if (goals && goals.length > 0) {
    console.log("First goal object:", goals[0]);
  }

  console.log("Search term:", searchTerm);

  // ... existing code ...

  const allGoals = useMemo(() => {
    if (goals) {
      let filteredGoals = goals.filter((item) =>
        item.goalName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Check if filteredGoals is not empty before trying to sort it
      if (filteredGoals.length > 0) {
        return filteredGoals.sort(
          (a, b) => new Date(a.endDate) - new Date(b.endDate)
        );
      }
    }
    return [];
  }, [goals, searchTerm]);

  console.log(allGoals);

  const handleToggleCreateGoalModal = () => {
    setShowCreateGoalModal(!showCreateGoalModal);
  };

  return (
    <div className="px-10 pt-10 bg-screen-bg h-screen overflow-y-scroll">
      <FeaturesMainHeader
        map={true}
        placeHolderText={"Search by name"}
        handleSearch={setSearchTerm}
        showFilterIcon={false}
      />
      {/*<div className="flex flex-row flex-wrap items-start gap-4 mt-10 ">
        {!loadingGoals && goals && goals.length > 0 ? (
          goals.map((item, index) => (
            <GoalsCardLg
              key={index}
              item={item}
              index={index}
              lastIndex={goals.length - 1}
            />*/}
      <div className="flex flex-row flex-wrap items-start gap-4 mt-10 ">
        {!loadingGoals && allGoals && allGoals.length > 0 ? (
          allGoals.map((item, index) => (
            <GoalsCardLg
              key={index}
              item={item}
              index={index}
              lastIndex={allGoals.length - 1}
            />
          ))
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center space-y-4 mt-20">
            <img src={emptyGoal} alt="emptyGoal" />
            <br />

            <CreateFeatureButton
              title={"Create Goals"}
              handleClick={handleToggleCreateGoalModal}
              isIcon={false}
              customClass="create-goal-button"
            />
          </div>
        )}
        {loadingGoals && <LoadingAnimation />}
      </div>

      <AddFloatingButon handleOnclick={handleToggleCreateGoalModal} />

      {showCreateGoalModal && (
        <CreateGoalModal
          handleBackButton={handleToggleCreateGoalModal}
          handleCloseButton={() => setShowCreateGoalModal(false)}
          fromList={true}
        />
      )}
    </div>
  );
};

export default Goals;

import React, { useEffect, useState } from "react";
import GoalsCard from "./GoalsCard";
import goalsIcon from "../../assets/goalsIcon.svg";
import FeaturesHeader from "../FeaturesHeader";
import addIcon from "../../assets/addIcon.svg";
import CreateFeatureButton from "../CreateFeatureButton";

import LoadingAnimation2 from "../LoadingAnimation2";
import CreateNewGoal from "./CreateNewGoal";
import CreateGoalModal from "./CreateGoalModal";

const GoalList = ({
  loadingGoals,
  allGoals,
  handleToggleGoalModal,
  handleToggleCloseModal,
  dontShowHeader,
  attachedClient,
  uniqueId,
}) => {
  const [showCreateGoalModal, setShowCreateGoalModal] = useState(false);

  const handleCreateGoalModal = () => {
    setShowCreateGoalModal(!showCreateGoalModal);
  };

  useEffect(() => {
    if (!allGoals) {
    }
  }, []);

  return (
    <>
      <div
        className={`md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start pt-6  rounded-t-3xl md:rounded-none overflow-y-scroll`}
      >
        {/* <div className="w-full h-full mx-auto flex flex-col justify-between  px-10 py-12 rounded-3xl "> */}
        <div className="w-full h-full mx-auto flex flex-col justify-between  bg-white px-10 py-12 rounded-3xl overflow-y-scroll">
          <div className="">
            <FeaturesHeader
              dontShowHeader={dontShowHeader}
              title={"Goals"}
              handleBackButton={handleToggleGoalModal}
              handleCloseButton={handleToggleCloseModal}
            />
            {!loadingGoals &&
              allGoals &&
              allGoals?.map((item, index) => (
                <GoalsCard
                  key={index}
                  loadingGoals={loadingGoals}
                  item={item}
                  index={index}
                  lastIndex={allGoals.length - 1}
                  handleToggleCloseModal={handleToggleCloseModal}
                />
              ))}
            {!loadingGoals && !allGoals && (
              <div className="h-full w-full flex flex-col justify-center items-center ">
                <img src={goalsIcon} alt="goals icon" />
                <p className="text-[24px] text-[#A8A8A8] mt-6">
                  No goals is set
                </p>
              </div>
            )}

            {loadingGoals && <LoadingAnimation2 />}
          </div>

          <CreateFeatureButton
            title={"Create goal"}
            handleClick={handleCreateGoalModal}
            isIcon={true}
            icon={addIcon}
            isValidForm={false}
          />
        </div>
      </div>
      {showCreateGoalModal && (
        <CreateGoalModal
          handleBackButton={handleCreateGoalModal}
          handleCloseButton={handleToggleCloseModal}
          attachedClientAccountName={attachedClient}
          uniqueId={uniqueId}
          fromMap={true}
        />
      )}
    </>
  );
};

export default GoalList;

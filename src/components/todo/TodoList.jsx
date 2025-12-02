import React, { useEffect, useState } from "react";
import FeaturesHeader from "../FeaturesHeader";
import LoadingAnimation2 from "../LoadingAnimation2";
import TodoComponent from "./TodoComponent";
import todoIcon from "../../assets/todo.svg";
import CreateFeatureButton from "../CreateFeatureButton";
import addIcon from "../../assets/addIcon.svg";
import CreateTodo from "./CreateTodo";

const TodoList = ({
  loadingTodos,
  userTodos,
  handleToggleTodoModal,
  handleToggleCloseModal,
  dontShowHeader,
  refetch,
  attachedClient,
  uniqueId,
}) => {
  const [showCreateTodoModal, setShowCreateTodoModal] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleCreateTodolModal = () => {
    setShowCreateTodoModal(!showCreateTodoModal);
  };
  const handleTabSwitch = (index) => {
    setActiveTabIndex(index);
  };
  const pendingTodoData =
    userTodos && userTodos.filter((item) => item.status === false);

  const completedTodoData =
    userTodos && userTodos.filter((item) => item.status === true);

  console.log("userTodos ==> ", userTodos);
  return (
    <>
      <div
        className={`w-full md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start pt-6  rounded-t-3xl md:rounded-none overflow-y-scroll`}
      >
        {/* <div className="w-full h-full mx-auto flex flex-col justify-between  px-10 py-12 rounded-3xl "> */}
        <div className="w-full h-full mx-auto flex flex-col justify-between bg-white px-10 py-12 rounded-3xl overflow-y-scroll">
          <div className="">
            <FeaturesHeader
              dontShowHeader={dontShowHeader}
              title={"To-do list"}
              handleBackButton={handleToggleTodoModal}
              handleCloseButton={handleToggleCloseModal}
            />

            <div className="w-[90%] mx-auto">
              {/* tab indicators */}
              {/*<div className="flex flex-row items-center justify-between">
                <button
                  className={`w-1/2 text-center text-xl ${
                    activeTabIndex === 0 ? "text-black" : "text-[#A8A8A8]"
                  }`}
                  onClick={() => handleTabSwitch(0)}
                >
                  <p>Pending</p>
                  <div
                    className={`w-[80%] h-1 mt-1 bg-primary-color mx-auto rounded-full`}
                  ></div>
                </button>
                <button
                  className={`w-1/2 text-center text-xl ${
                    activeTabIndex === 1 ? "text-black" : "text-[#A8A8A8]"
                  }`}
                  onClick={() => handleTabSwitch(1)}
                >
                  <p>Completed</p>
                  <div
                    className={`w-[80%] h-1 mt-1 bg-primary-color mx-auto rounded-full`}
                  ></div>
                </button>
              </div>*/}


             

<div className="flex flex-row items-center justify-between">
  <button
    className={`w-1/2 text-center text-xl ${
      activeTabIndex === 0 ? "text-black" : "text-[#A8A8A8]"
    }`}
    onClick={() => handleTabSwitch(0)}
  >
    <p>Pending</p>
    {/*{activeTabIndex === 0 && (
      <div
        className={`w-[80%] h-1 mt-1 bg-primary-color mx-auto rounded-full`}
      ></div>
    )}*/}
    <div
                    className={`w-[80%] h-1 mt-1 mx-auto rounded-full ${
                      activeTabIndex === 0 ? "bg-primary-color" : "bg-gray-300"
                    }`}> </div>
  </button>
  <button
    className={`w-1/2 text-center text-xl ${
      activeTabIndex === 1 ? "text-black" : "text-[#A8A8A8]"
    }`}
    onClick={() => handleTabSwitch(1)}
  >
    <p>Completed</p>
   {/*} {activeTabIndex === 1 && (
      <div
        className={`w-[80%] h-1 mt-1 bg-primary-color mx-auto rounded-full`}
      ></div>
    )}*/}

    <div
                    className={`w-[80%] h-1 mt-1 mx-auto rounded-full ${
                      activeTabIndex === 1 ? "bg-primary-color" : "bg-gray-300"
                    }`}
                  ></div>
  </button>
</div>





              {/* tab content */}
              <div className="">
                {activeTabIndex === 0 && (
                  <TodoComponent
                    todoData={pendingTodoData}
                    loading={loadingTodos}
                    refetch={refetch}
                  />
                )}
                {activeTabIndex === 1 && (
                  <TodoComponent
  todoData={completedTodoData}
  loadingTodos={loadingTodos}
  refetch={refetch}
/>
                )}
              </div>
            </div>
          </div>
          {/* no todo image */}
          {!loadingTodos && !userTodos && (
            <div className="h-fit  w-full flex flex-col justify-center items-center">
              <img src={todoIcon} alt="todo icon" />
              <p className="text-[24px] text-[#A8A8A8] mt-6">
                No to-do for account
              </p>
            </div>
          )}
          <CreateFeatureButton
            title={"Create todo"}
            handleClick={handleCreateTodolModal}
            isIcon={true}
            icon={addIcon}
            isValidForm={false}
          />
        </div>
      </div>
      {loadingTodos && <LoadingAnimation2 />}

      {showCreateTodoModal && (
        <CreateTodo
          handleBackButton={handleCreateTodolModal}
          handleCloseButton={handleToggleCloseModal}
          fromMap={true}
          attachedClientAccountName={attachedClient}
          uniqueId={uniqueId}
        />
      )}
    </>
  );
};

export default TodoList;

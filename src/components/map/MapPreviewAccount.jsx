import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetTodoListByIdQuery,
  useGetUserTodosQuery,
} from "../../store/todoApiSlice";
import { useGetAllGoalsQuery, useGetGoalQuery } from "../../store/goalApiSlice";
import { useGetAllNotesByUniqueIdQuery } from "../../store/noteApiSlice";
import Loading from "../Loading";
import closeButton from "../../assets/closeIcon.svg";
import GoalIcon from "../../icons/GoalIcon";
import AngleRightIcon from "../../icons/AngleRightIcon";
import ContactIcon from "../../icons/ContactIcon";
import TodoListIcon from "../../icons/TodoListIcon";
import Modal from "../Modal";
import MapContactInformationModal from "./MapContactInformationModal";
import GoalList from "../goals/GoalList";
import TodoList from "../todo/TodoList";
import EditComponent from "../../icons/EditComponent";
import NoteList from "../notes/NoteList";
import InteractionModal from "../interaction/InteractionModal";
import AutomationModal from "../automation/AutomationModal";
import LastInteractionIcon from "../../icons/LastInteractionIcon";
import AutomatedEmailIcon from "../../icons/AutomatedEmailIcon";
import axios from "axios";
import { BASE_URL } from "../../utils/Endpoints";

const MapPreviewAccount = ({
  handelToggleAccountPreview,
  currentItem,
  uniqueId,
  mediaRecorder,
}) => {
  const { accountsGoalUser } = useSelector((state) => state.auth);

  // get todolist by uniqueid ==> getTodoListById
  const {
    data: userTodos,
    refetch: refetchTodos,
    isLoading: loadingTodos,
    error: todoError,
  } = useGetTodoListByIdQuery({ uniqueId: uniqueId });

  // const {
  //   data: allGoals,
  //   refetch: refetchGoals,
  //   isLoading: loadingGoals,
  //   error: goalError,
  // } = useGetAllGoalsQuery({ user: accountsGoalUser._id });
  //updatae color status
  const updateColorStatus = () => {
    fetch(`${BASE_URL}update-color-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uniqueId: uniqueId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("update color status", data);
        // refetchExcelData();
      })
      .catch((err) => {
        console.log("get color error ==> ", err);
      });
  };

  useEffect(() => {
    updateColorStatus();
  });

  const {
    data: allGoals,
    refetch: refetchGoals,
    isLoading: loadingGoals,
    error: goalError,
  } = useGetGoalQuery({ uniqueId });

  const {
    data: notesData,
    isLoading: loadingNotesData,
    isError: isGetError,
    error: getNoteError,
  } = useGetAllNotesByUniqueIdQuery({ uniqueId });

  // get last interaction from note
  const lastInteraction =
    notesData &&
    notesData.data.noteUniqueId[notesData?.data.noteUniqueId.length - 1];

  // get last text from note
  const allTextsInNotes =
    notesData && notesData?.data?.noteUniqueId.filter((note) => note.textName);

  const pendingTodoData =
    userTodos && userTodos.filter((item) => item.status === false);

  const [filterPriority, setFilterPriority] = useState("");
  const [toggleSearchModal, setToggleSearchModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [toggleInteractionModal, setToggleInteractionModal] = useState(false);
  const [toggleAutomationModal, setToggleAutomationModal] = useState(false);
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
  const handleToggleTodoList = () => {
    setShowTodoModal(!showTodoModal);
  };
  const handleToggleGoalList = () => {
    setShowGoalModal(!showGoalModal);
  };

  const handleToggleNoteList = () => {
    setShowNoteModal(!showNoteModal);
  };
  const handleToggleSearchModal = () => {
    setToggleSearchModal(!toggleSearchModal);
  };

  const handleToggleContactInformation = () => {
    setShowContactModal(!showContactModal);
  };
  const handleToggleInteractionModal = () => {
    setToggleInteractionModal(!toggleInteractionModal);
  };
  const handleToggleAutomationModal = () => {
    setToggleAutomationModal(!toggleAutomationModal);
  };

  const windowHeight = window.innerHeight;
  const windowHeightSm = windowHeight / 2;

  console.log("allGoals ==> ", allGoals);
  console.log("allGoals error ==> ", goalError);

  console.log("userTodos ==> ", userTodos);
  console.log("todo error ==> ", todoError);
  console.log("uniqued id ==> ", uniqueId);

  return (
    <div
      className={`md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start p-6 rounded-t-3xl md:rounded-none overflow-y-scroll`}
    >
      <div className="py-6 ">
        <div className=" relative flex flex-row items-center justify-between">
          <p className="text-[24px] md:text-[28px] lg:text-[32px] font-black">
            Client Information
          </p>
          <button
            className="absolute right-0 -top-10 w-12 h-12 flex self-end items-center justify-center  p-2"
            onClick={handelToggleAccountPreview}
          >
            <div className="w-15 h-15">
              <img src={closeButton} alt="close button" />
            </div>
          </button>
        </div>
        <p className="font-black leading-6 text-base text-black mb-6 mt-10">
          {currentItem.ACCOUNT_NAME}
        </p>

        {/* tags */}
        <div className="flex flex-row justify-between">
          {/* left view */}
          <div>
            {loadingNotesData ? (
              <Loading />
            ) : (
              <>
                <p className="text-xs ">Last Interaction:</p>
                <div className="flex flex-row items-center">
                  {currentItem?.clickedAt ? (
                    <p className="text-sm font-black mt-2">
                      {new Date(currentItem?.clickedAt).toDateString()}
                    </p>
                  ) : (
                    <p className="text-sm text-secondary-accent-color italic mt-2">
                      none
                    </p>
                  )}
                  {currentItem?.meetingSummary ? (
                    <div className="rounded-full w-fit bg-orange px-2 py-1 ml-2 mt-2">
                      <p className="text-[10px] font-bold text-white ">
                        {currentItem?.meetingSummary?.meetingType ===
                        "Video call"
                          ? "Video call"
                          : currentItem?.meetingSummary?.meetingType ===
                            "Audio call"
                          ? "Audio call"
                          : currentItem?.meetingSummary?.meetingType ===
                            "In-person"
                          ? "In-person"
                          : ""}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </>
            )}
          </div>
          {/* right view */}
          <div className="md:mr-[30%] lg:mr-[30%]">
            <p className="text-xs ">Revenue</p>
            <p className="text-sm font-black mt-2 lg:leading-6">
              {currentItem.REVENUE}
            </p>
          </div>
        </div>

        {/* note */}
        <p className="text-xs text-primary-accent-color leading-5 mt-7">
          {/* {allTextsInNotes &&
            allTextsInNotes[allTextsInNotes?.length - 1]?.textName} */}
          {currentItem?.meetingSummary?.meetingContent}
        </p>

        {/* edit note button */}
        <button
          onClick={handleToggleNoteList}
          className="w-full flex flex-row justify-end my-6"
        >
          <EditComponent onClickEdit={null} title={"Edit note"} />
        </button>

        {/* Contact information card */}
        <button
          className="w-full relative flex flex-row items-top  mt-12"
          onClick={handleToggleContactInformation}
        >
          {/* Contact information icon */}
          <div className="w-11 h-11 rounded-full bg-[#ECF0FC] flex flex-col items-center justify-center ">
            <ContactIcon color={"#4169E1"} />
          </div>
          {/* Contact information title and text */}
          <div className="w-[75%] ml-4 flex flex-col items-start">
            <p>Contact information</p>
            <p className="text-xs text-start text-primary-accent-color mt-1">
              {currentItem?.ACCOUNT_NAME},{" "}
              {new Date(currentItem?.CELEBRATIONS).toDateString()}
            </p>
          </div>
          {/* Contact information angle right icon */}
          <div className="absolute right-0 top-0">
            <AngleRightIcon />
          </div>
        </button>

        {/* goal card */}
        <div
          className="w-full relative flex flex-row items-top  mt-8"
          onClick={handleToggleGoalList}
        >
          {/* goal icon */}
          <div className="w-11 h-11 rounded-full bg-[#ECF0FC] flex flex-col items-center justify-center ">
            <GoalIcon color={"#4169E1"} />
          </div>
          {/* goal title and text */}
          <div className="w-[75%] ml-4 flex flex-col items-start">
            <p>Goals</p>
            <p className="text-xs text-start text-primary-accent-color mt-1">
              Set goals to stay focused and drive performance. Achieving your
              goals can lead in increased productivity.
            </p>
          </div>
          {/* goal angle right icon */}
          <div className="absolute right-0 top-0">
            <AngleRightIcon />
          </div>
        </div>

        {/* todo list card */}
        <div
          className="w-full relative flex flex-row items-top  mt-8"
          onClick={handleToggleTodoList}
        >
          {/* goal icon */}
          <div className="w-11 h-11 rounded-full bg-[#ECF0FC] flex items-center justify-center ">
            <TodoListIcon color={"#4169E1"} />
          </div>
          {/* todo title and text */}
          <div className="w-[75%] ml-4 flex flex-col items-start ">
            <p>To do list</p>
            <p className="text-xs text-start text-primary-accent-color mt-1">
              Track and prioritize activities effectively by listing your tasks,
              setting deadlines, and marking priorities.
            </p>
          </div>
          {/* todo angle right icon */}
          <div className="absolute right-0 top-0">
            <AngleRightIcon />
          </div>
        </div>

        {/* note card */}
        <div
          className="w-full relative flex flex-row items-top  mt-8"
          onClick={handleToggleNoteList}
        >
          {/* note icon */}
          <div className="w-11 h-11 rounded-full bg-[#ECF0FC] flex flex-col items-center justify-center ">
            <GoalIcon color={"#4169E1"} />
          </div>
          {/* note title and text */}
          <div className="w-[75%] ml-4 flex flex-col items-start">
            <p>Note</p>
            <p className="text-xs text-start text-primary-accent-color mt-1">
              Update details quickly and easily by clicking the "Edit" button
              above. Don't forget to save your changes!
            </p>
          </div>
          {/* note angle right icon */}
          <div className="absolute right-0 top-0">
            <AngleRightIcon />
          </div>
        </div>

        {/* interaction card */}
        <div
          className="w-full relative flex flex-row items-top  mt-8"
          onClick={handleToggleInteractionModal}
        >
          {/* last interaction icon */}
          <div
            className={`w-11 h-11 rounded-full bg-[#ECF0FC] flex items-center justify-center ${
              getInvitedUserData && "hidden"
            }`}
          >
            <LastInteractionIcon color={"#4169E1"} />
          </div>
          {/* last interaction title and text */}
          <div
            className={`w-[75%] ml-4 flex flex-col items-start ${
              getInvitedUserData && "hidden"
            }`}
          >
            <p>Last interaction</p>
            <p className="text-xs text-primary-accent-color">
              Add a summary of the last interaction, including key points
              discussed, decisions made and items assigned.
            </p>
          </div>
          {/* angle right icon */}
          <button
            className={`absolute right-0 top-0 ${
              getInvitedUserData && "hidden"
            }`}
          >
            <AngleRightIcon />
          </button>
        </div>
        {/* automated email card */}
        <button
          className={`w-full relative flex flex-row items-top ${
            getInvitedUserData ? "mt-0" : "mt-8"
          }`}
          onClick={handleToggleAutomationModal}
        >
          {/* automated email icon */}
          <div className="w-11 h-11 rounded-full bg-[#ECF0FC] flex items-center justify-center">
            <AutomatedEmailIcon color={"#4169E1"} />
          </div>
          {/* automated email and text */}
          <div className="w-[75%] ml-4 flex flex-col items-start">
            <p>Automated email</p>
            <p className="text-xs text-primary-accent-color ">
              Edit and auto-generated emails for clients.
            </p>
          </div>
          {/* angle right icon */}
          <button className="absolute right-0 top-0">
            <AngleRightIcon />
          </button>
        </button>
      </div>

      {/********** map contact info modal **********/}
      {showContactModal && (
        <MapContactInformationModal
          currentItem={currentItem}
          handleToggleContactModal={handleToggleContactInformation}
        />
      )}

      {/********** goal modal **********/}
      {showGoalModal && (
        <GoalList
          loadingGoals={loadingGoals}
          allGoals={allGoals}
          handleToggleGoalModal={handleToggleGoalList}
          handleToggleCloseModal={handelToggleAccountPreview}
          attachedClient={currentItem?.ACCOUNT_NAME}
          uniqueId={uniqueId}
        />
      )}

      {/********** todo modal **********/}
      {showTodoModal && (
        <TodoList
          loadingTodos={loadingTodos}
          userTodos={userTodos && userTodos}
          handleToggleTodoModal={handleToggleTodoList}
          handleToggleCloseModal={handelToggleAccountPreview}
          refetch={refetchTodos}
          attachedClient={currentItem?.ACCOUNT_NAME}
          uniqueId={uniqueId}
        />
      )}

      {/********** note modal **********/}
      {showNoteModal && (
        <NoteList
          uniqueId={uniqueId}
          handleToggleNoteModal={handleToggleNoteList}
          handleToggleCloseModal={handelToggleAccountPreview}
          refetch={refetchTodos}
          mediaRecorder={mediaRecorder}
        />
      )}

      {/********** interaction modal **********/}
      {toggleInteractionModal && (
        <InteractionModal
          handleToggleInteractionModal={handleToggleInteractionModal}
          handleToggleCloseModal={handelToggleAccountPreview}
          uniqueId={uniqueId}
        />
      )}

      {/********** automation modal **********/}
      {toggleAutomationModal && (
        <AutomationModal
          uniqueId={uniqueId}
          handleToggleAutomationModal={handleToggleAutomationModal}
          handleToggleCloseModal={handelToggleAccountPreview}
        />
      )}
    </div>
  );
};

export default React.memo(MapPreviewAccount);

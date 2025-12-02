import { useSelector } from "react-redux";
import { useGetExcelDataQuery } from "../../store/accountApiSlice";
import { useState } from "react";
import {
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../../store/todoApiSlice";
import DeleteComponent from "../../icons/DeleteComponent";
import LoadingAnimation from "../LoadingAnimation";
import DropDownAlert from "../DropDownAlert";
import TextInputField from "../forms/TextInputField";
import LabelField from "../forms/LabelField";
import { priorityData } from "../../utils/dummyData";
import { windowWidth } from "../../utils/Dimensions";
import editIcon from "../../assets/editIcon.svg";
import { CiEdit } from "react-icons/ci";
//import deleteIcon from "../../assets/deleteIcon.svg";

const PendingTodoCard = ({ item, refetch }) => {
  const { accountsGoalUser, onboarding } = useSelector(
    (state) => state.acgUser
  );

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
  // const filteredClientData =
  //   attachClientInput &&
  //   excelData &&
  //   excelData.filter((user) =>
  //     user?.data?.some((data) =>
  //       data.ACCOUNT_NAME.toLowerCase().includes(
  //         attachClientInput.toLocaleLowerCase()
  //       )
  //     )
  //   );

  const [toggleModal, setToggleModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [togglePriority, setTogglePriority] = useState(false);
  const [toggleReminder, setToggleReminder] = useState(item?.setReminder);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [dateTimePickerMode, setDateTimePickerMode] = useState("date");
  const [dateTimePickerField, setDateTimePickerField] = useState("");
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [eventName, setEventName] = useState(item.todoName);
  // const [date, setDate] = useState(new Date())
  const [date, setDate] = useState(new Date(item?.endDate));
  const [priority, setPriority] = useState(item?.setPriority);
  const [startTime, setStartTime] = useState(new Date(item?.startTime));
  const [endTime, setEndTime] = useState(new Date(item?.endTime));
  const [note, setNote] = useState(item?.note);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [toggleAttachClients, settoggleAttachClients] = useState(false);
  const [attachClientInput, setAttaChClientInput] = useState("");
  const [attachedClient, setAttachedClient] = useState(item?.attachClient);
  const [attachedClientUniqueId, setAttachedClientUniqueId] = useState(
    item?.excelRow.uniqueId
  );


  const [toggleNoEndDate, setToggleNoEndDate] = useState(false);


  const [showEditModal, setShowEditModal] = useState(false);

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
      user?.ACCOUNT_NAME?.toLowerCase().includes(
        attachClientInput.toLowerCase()
      )
    );

  const [deleteTodo, { isLoading: loadingDelete, error: deleteError }] =
    useDeleteTodoMutation();
  const [editTodo, { isLoading: loadingEdit, error: editError }] =
    useEditTodoMutation();
  const [
    completeTodo,
    { isLoading: loadingCompleteTodo, error: completeError },
  ] = useCompleteTodoMutation();

  const handleSelectTodo = (id) => {
    setSelectedItem((prevId) => {
      if (!prevId.includes(id)) {
        return [...prevId, id];
      } else {
        return prevId.filter((item) => item !== id);
      }
    });
  };

  const handleCompleteTodo = async (id) => {
    setCompletedTodos((prevId) => {
      if (!prevId.includes(id)) {
        return [...prevId, id];
      } else {
        return prevId.filter((item) => item !== id);
      }
    });
    alert("Mark as Completed", "Are you sure you want to mark as completed?", [
      {
        text: "Cancel",
        onPress: () => {
          setCompletedTodos((prevId) => {
            if (!prevId.includes(id)) {
              return [...prevId, id];
            } else {
              return prevId.filter((item) => item !== id);
            }
          });
        },
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const response = await completeTodo({
            uniqueId: item.excelRow.uniqueId,
            id: id,
          });
          console.log("complete todo response  ==> ", response);
          refetch();
        },
      },
    ]);
  };

  const handleSelectClients = (todoItem) => {
    setAttachedClient(todoItem.ACCOUNT_NAME);
    setAttachedClientUniqueId(todoItem.uniqueId);
    // setAttaChClientInput("");
    handleToggleAttachClient();
  };

  const handleDeleteItem = async () => {
    // const response = await deleteTodo({ id: item._id });
    // console.log("delete response ==> ", response);

    alert("Delete Todo", "Are you sure you want to delete todo?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const response = await deleteTodo({
            uniqueId: item.excelRow.uniqueId,
            id: item._id,
          });
          console.log("delete todo response  ==> ", response);
          if (response.data) {
            refetch();
          }
        },
      },
    ]);
  };

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };
  const handleToggleEditTodoModal = () => {
    setToggleEditModal(!toggleEditModal);
  };
  const handleTogglePriority = () => {
    setTogglePriority(!togglePriority);
  };
  const handleSelectPriority = (value) => {
    setPriority(value);
    handleTogglePriority();
  };
  const handleToggleReminder = () => {
    setToggleReminder((previousState) => !previousState);
  };
  const handleDateTimePicker = (event, selectedDate) => {
    if (dateTimePickerMode === "date") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    } else if (dateTimePickerMode === "time") {
      const currentDate = selectedDate || date;
      if (dateTimePickerField === "startTime") {
        setStartTime(currentDate);
      } else if (dateTimePickerField === "endTime") {
        setEndTime(currentDate);
      }
    }
    setShowDateTimePicker(false);
  };

  const handelToggleDateTimePickerMode = (field, mode) => {
    setShowDateTimePicker(true);
    setDateTimePickerMode(mode);
    setDateTimePickerField(field);
  };
  const handleToggleAttachClient = () => {
    settoggleAttachClients(!toggleAttachClients);
  };
  const handleToggleNoEndDate = () => {
    setToggleNoEndDate((previousState) => !previousState);
  };

  // Function to open the edit modal
  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

   // Function to close the edit modal
   const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditTodo = async () => {
    // const body = {
    //   uniqueId: attachedClientUniqueId,
    //   user: accountsGoalUser._id,
    //   todoName: eventName,
    //   attachClient: attachedClient,
    //   endDate: date.toString(),
    //   setPriority: priority,
    //   noEndDate: toggleNoEndDate,
    //   setReminder: toggleReminder,
    //   status: false,
    //   note: note,
    // };
    const body = {
      id: item._id,
      uniqueId: attachedClientUniqueId,
      user: accountsGoalUser._id,
      todoName: eventName,
      attachClient: attachedClient,
      endDate: date.toString(),
      setPriority: priority,
      noEndDate: toggleNoEndDate,
      setReminder: toggleReminder,
      status: item.status,
      note: note,
    };
    try {
      const response = await editTodo(body);
      console.log("todo body ==>", body);
      console.log("todo response ===> ", response);

      if (response.data) {
        refetch();
        setShowAlertModal(true);
        setShowEditModal(true);
        handleToggleEditTodoModal();
        handleSelectTodo(item._id);

        // alert("", response.data?.message);
      }

      if (response.error) {
        alert("", response.error.data?.message);
      }
    } catch (error) {
      alert("", error.message);
    }
  };

  useEffect(() => {
    if (showAlertModal === true) {
      setTimeout(() => {
        setShowAlertModal(false);
      }, 3000);
    }
  });

  return (
    <div className="flex flex-row items-center justify-between  bg-white shadow-lg rounded-lg p-4 mb-4">
      <button
        onClick={handleToggleModal}
        className={`w-full relative bg-white border-[#B9B9B9] border rounded-lg p-3 mb-4 `}
      >
   
<CiEdit 
  size={30} // Increase the size as needed
  color="blue" // Change the color to blue
  style={{ marginLeft: 'auto' }} // Move it to the right
  onClick={handleToggleEditTodoModal} // Make it clickable to toggle the edit component
/>


{item?.setPriority && (
  <p
    style={{
      backgroundColor:
        item?.setPriority === "High priority"
          ? "red" // Change this to the desired color for High priority
          : item?.setPriority === "Medium priority"
          ? "orange" // Change this to the desired color for Medium priority
          : item?.setPriority === "Low priority"
          ? "lightcoral" // Change this to the desired color for Low priority
          : "",
      color: "white", // Change text color to white for better visibility
      padding: "2px 5px", // Reduce padding
      borderRadius: "5px", // Reduce border radius
      display: "inline", // Set display to inline
    }}
    className={`text-screen-bg text-[10px] font-semibold text-center`}
  >
    {item.setPriority}
  </p>
)}




        {/*{item?.setPriority && (
          <p
            className={` ${
              windowWidth < -230 ? "w-1/3" : "w-1/3"
            } text-screen-bg text-[10px] font-semibold text-center rounded-2xl px-2  py-1  ${
              item?.setPriority === "High priority"
                ? "bg-high-priority"
                : item?.setPriority === "Medium priority"
                ? "bg-medium-priority"
                : item?.setPriority === "Low priority"
                ? "bg-low-priority"
                : ""
            }`}
          >
            {item?.setPriority}
          </p>
        )}*/}

        <p
          className={`font-semibold text-base my-1 ${
            item.status === true && "line-through"
          }`}
        >
          {item?.todoName}
        </p>
        {item?.note && (
          <p className="text-[8px] text-primary-accent-color">{item?.note}</p>
        )}
        {/* select cirlce */}
        {item.status === false && (
          <button
            className="absolute right-5 top-[50%] flex flex-row justify-center items-center w-6 h-6 rounded-full border border-border-color"
            // onClick={() => handleCompleteTodo(item._id)}
          >
            {completedTodos.includes(item._id) ? <TickIcon /> : ""}
            {/* <TickIcon /> */}
          </button>
        )}

        {item.status === true && (
          <button className="absolute right-5 top-[50%] flex flex-row justify-center items-center w-6 h-6 rounded-full border border-border-color">
            <TickIcon />
          </button>
        )}
      </button>
      <div className="flex flex-row justify-center items-center w-6 h-6 rounded-full border border-border-color mr-8">
  <img src={editIcon} alt="Edit" onClick={handleToggleEditTodoModal} />
  
</div>
      {/*********************** view todo modal *************************/}

      {toggleModal && (
        <Modal transparent visible={toggleModal} animationType="slide">
          <div className="h-full w-full bg-transparent">
            <button
              className="h-[45%] bg-black/50"
              onClick={handleToggleModal}
            />
          </div>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
            }}
            className="absolute bottom-0 w-full h-[60%] flex flex-col  rounded-t-3xl  bg-screen-bg px-5"
          >
            <div>
              {/* close button */}
              <button
                className=" w-6 h-6 flex self-end mt-7 items-center justify-center rounded-full  border border-[#A8A8A8] p-2"
                onClick={handleToggleModal}
              >
                <CloseButton color={"#A8A8A8"} />
              </button>
              <p
                className={`font-bold text-base ${
                  item.status === true && "line-through"
                }`}
              >
                {item?.todoName}
              </p>

              <p className=" text-sm text-[#777777] mt-8 text-left ">
                {item?.note}
              </p>
            </div>

            {/* mark as done button and edit button*/}
            <div className="flex flex-row items-center">
              {/* mark as done */}
              <button
                className={`bg-primary-color w-2/3
              rounded-full mt-10 h-12 py-3 flx justify-center items-center mb-10`}
                onClick={() => handleCompleteTodo(item._id)}
              >
                <p className="text-center font-semibold text-white text-base">
                  Mark as done
                </p>
              </button>
              {/* edit button */}
              {/* edit goal button */}
              <button
                className="absolute bottom-10 right-0 w-12 h-12 rounded-full bg-primary-color flex items-center justify-center"
                onClick={handleToggleEditTodoModal}
              >
                <EditTodoIcon color={"#fff"} />
              </button>
            </div>
          </ScrollView>
        </Modal>
      )}

      {/******************** edit todo modal *************************/}
      <div>
      <p>{item.todoName}</p>
      <button onClick={handleOpenEditModal}>
        <EditIcon />
      </button>

      {showEditModal && (
        <EditTodoModal
          initialData={item}
          onSubmit={handleEditTodo}
          onClose={handleCloseEditModal}
        />
      )}

      {/* Existing JSX... */}
    </div>
      {toggleEditModal && (
        <Modal
          transparent={true}
          visible={toggleEditModal}
          animationType="slide"
        >
          <div className="h-full w-full bg-transparent">
            <button
              className="h-[17%] bg-black/50 "
              onClick={handleToggleEditTodoModal}
            />
          </div>
          <KeyboardAvoidingView
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="absolute bottom-0 w-full h-[93%] rounded-t-3xl  bg-screen-bg"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              className="px-5"
            >
              {/* todo */}
              <LabelField labelTitle={"Todo"} required={true} />
              <TextInputField
                placeholder="Todo name"
                labelColor={"#B9B9B9"}
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              {/* attachedClients */}
              <LabelField
                labelTitle={"Attach client to goals"}
                required={true}
              />
              <button
                className={customButtonWithIcon + " justify-between"}
                onClick={handleToggleAttachClient}
              >
                <p className=" text-sm text-form-text-color">
                  {attachedClient}
                </p>
                <IconCaretDropdown />
              </button>
              {/* attachedClients drop down */}
              {toggleAttachClients && (
                <div className="w-full bg-white rounded-lg my-2 p-3 ">
                  {/* filter clients */}
                  <CustomTextInputField
                    placeholder="filter user"
                    placeholderTextColor={"#B9B9B9"}
                    cursorColor={"#B9B9B9"}
                    value={attachClientInput}
                    className="h-12 border-b border-b-border-color px-2 text-primary-accent-color "
                    onChange={(e) => setAttaChClientInput(e.target.value)}
                  />

                  <div>
                    {filteredClientData &&
                      attachClientInput &&
                      filteredClientData.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectClients(item)}
                          //   className={`${
                          //     i === user?.data?.length - 1
                          //       ? "border-none"
                          //       : "border-b-[0.7px] border-b-form-text-color"
                          //   }`}
                        >
                          <p
                            className={` py-3 ${
                              attachedClient === item?.ACCOUNT_NAME ||
                              attachedClientUniqueId === item.uniqueId
                                ? "text-black"
                                : "text-form-text-color"
                            }`}
                          >
                            {item?.ACCOUNT_NAME}
                          </p>
                        </button>
                      ))}
                  </div>
                </div>
              )}
              {/* end date */}
              <LabelField labelTitle={"Date"} required={true} />
              <button
                className={customButtonWithIcon}
                onClick={() => handelToggleDateTimePickerMode("date", "date")}
              >
                {/*<CalendarIcon color={"#B9B9B9"} />*/}
                <p className="ml-3 text-sm text-form-text-color">
                  {date.toDateString()}
                </p>
              </button>

              {/* no end date */}
              <div className="mt-10 items-center flex-row justify-between  ">
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
                />
              </div>

              {/* priority */}
              <LabelField labelTitle={"Set Priority"} required={true} />
              <div className="w-full flex flex-row  mt-4  gap-x-[3%] ">
                {priorityData.slice(1, 4).map((item, index) => (
                  <button
                    onClick={() => handleSelectPriority(item.title)}
                    className={`w-[30%] flex items-center justify-center rounded-lg ${
                      index === 0
                        ? "bg-[#6787E7]"
                        : index === 1
                        ? "bg-[#809BEB]"
                        : "bg-[#C4D1F6]"
                    }  ${priority === item.title ? "border border-black" : ""}`}
                    key={index}
                  >
                    <p
                      className={` text-white text-xs text-center py-1 px-2 ${
                        priority === item.title ? "" : ""
                      }`}
                    >
                      {item.title}
                    </p>
                  </button>
                ))}
              </div>
              {/* start and end time */}
              {/* <div className="flex flex-row items-center justify-between">
                start time
                <div className="w-[48%]">
                  <LabelField labelTitle={"Start Time"} required={true} />
                  <button
                    className={customButtonWithIcon}
                    onClick={() =>
                      handelToggleDateTimePickerMode("startTime", "time")
                    }
                  >
                    <ClockIcon color={"#B9B9B9"} />
                    <p className="ml-3 text-xs text-form-text-color">
                      {startTime
                        .toLocaleTimeString()
                        .replace(/:\d{2}\s/, " ") || "12:00 am"}
                    </p>
                  </button>
                </div>

                end time
                <div className="w-[48%]">
                  <LabelField labelTitle={"End Time"} required={true} />
                  <button
                    className={customButtonWithIcon}
                    onClick={() =>
                      handelToggleDateTimePickerMode("endTime", "time")
                    }
                  >
                    <ClockIcon color={"#B9B9B9"} />
                    <p className="ml-3 text-xs text-form-text-color">
                      {endTime.toLocaleTimeString().replace(/:\d{2}\s/, " ") ||
                        "12:00 am"}
                    </p>
                  </button>
                </div>
              </div> */}

              {/* reminder */}
              <div className="mt-10 items-center flex-row justify-between  ">
                <p>Set Reminder</p>
                <Switch
                  trackColor={{
                    false: "rgba(103, 135, 231, 1)",
                    true: "#4169E1",
                  }}
                  thumbColor={toggleReminder ? "#fff" : "#fff"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleToggleReminder}
                  value={toggleReminder}
                />
              </div>

              {/* note */}
              <LabelField labelTitle={"Note"} required={false} />
              <TextInputField
                multiline={true}
                maxLength={250}
                labelColor={"#B9B9B9"}
                value={note}
                // labelColor={"#C5C5C5"}
                heightC={75}
                onChange={(e) => setNote(e.target.value)}
              />

              {/* edit to-do button */}
              <button
                className={`
                  bg-primary-color
                 rounded-full mt-10 h-12 py-3 flx justify-center items-center mb-10`}
                disabled={false}
                onClick={handleEditTodo}
              >
                <p className="text-center font-semibold text-white text-base">
                  {loadingEdit ? (
                    <ActivityIndicator size="small" color={"#fff"} />
                  ) : (
                    "Save To-do"
                  )}
                </p>
              </button>
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      )}

      {/* alert */}
      {showAlertModal && (
        <DropDownAlert
          showAlertModal={showAlertModal}
          message={"Todo updated"}
          type={"success"}
        />
      )}

      {/* loading complete todo */}
      {loadingCompleteTodo && <LoadingAnimation />}

      {/*********************** looading todo modal *************************/}
      {(loadingDelete || loadingEdit) && <LoadingAnimation />}
    </div>
  );
};

export default PendingTodoCard;

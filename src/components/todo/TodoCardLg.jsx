import React, { useState } from "react";
import TickIcon from "../../icons/TickIcon";
import { windowWidth } from "../../utils/Dimensions";
import {
  useCompleteTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} from "../../store/todoApiSlice";
//import { useEditTodoMutation } from "../../store/todoApiSlice";
import CompleteTodoModalDialog from "./CompleteTodoModalDialog";
import DeleteTodoModalDialog from "./DeleteTodoModalDialog";
import LoadingAnimation from "../LoadingAnimation";
import editIcon from "../../assets/editIcon.svg";
import { CiEdit } from "react-icons/ci";
import EditTodoComponent from "./editTodoComponent";
//import DeleteTodoComponent from "./deleteTodoComponent";
import { RiDeleteBin6Line } from "react-icons/ri";
//import emptyTodo from "../../assets/emptyTodo.svg"
// import DropDownAlert from "../DropDownAlert";
import DeleteDropDown from "../DeleteDropdown";

const TodoCardLg = ({ item, refetch }) => {
  console.log(item);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [showCompleteTodoDialog, setShowCompleteTodoDialog] = useState(false);

  const [showEditTodoDialog, setShowEditTodoDialog] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [todo, setTodo] = useState([]);

  //const [todo, setTodo] = useState([]);
  const [deleteTodo, { isLoading: loadingDeleteTodo, error: deleteTodoError }] =
    useDeleteTodoMutation();

  const handleOpenDeleteModal = () => {
    //console.log('item._id:', item._id);
    //console.log('uniqueId:', item.excelRow.uniqueId)
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const fetchTodos = async () => {
    // Fetch the latest goals from the server
  };

  const handleDeleteTodo = async () => {
    const response = await deleteTodo({
      uniqueId: item.excelRow.uniqueId,
      id: item?._id,
    });
    if (response?.data?.message === "Todo deleted successfully") {
      handleCloseDeleteModal();
      // Update the todos state to remove the deleted todo
      setTodo((prevTodos) => prevTodos.filter((todo) => todo._id !== item._id));
      //setCompletedTodos(completedTodos.filter(todo => todo._id !== item._id)); // Update the state variable
      fetchTodos();
      setShowDeleteAlert(true); // Show the delete alert
      setTimeout(() => setShowDeleteAlert(false), 3000);
      return true;
    } else {
      console.error("Error deleting todo: ", response);
      return false;
    }
  };

  const [
    completeTodo,
    { isLoading: loadingCompleteTodo, error: completeError },
  ] = useCompleteTodoMutation();

  const [editTodo, { isLoading: loadingEditTodo, error: editTodoError }] =
    useEditTodoMutation();

  const handleTogggleEditTodoDialog = () => {
    // alert("edit");

    setShowEditTodoDialog(!showEditTodoDialog);
  };

  const handleTogggleCompleteTodoDialog = () => {
    // alert("edit");
    setShowCompleteTodoDialog(!showCompleteTodoDialog);
  };

  //const [editTodo, { isLoading: loadingEditTodo, error: editTodoError }] = useEditTodoMutation();
  const handleCompleteTodo = async () => {
    setCompletedTodos((prevId) => {
      let updatedIds;
      if (!prevId.includes(item._id)) {
        updatedIds = [...prevId, item._id];
      } else {
        updatedIds = prevId.filter((id) => id !== item._id);
      }
      return updatedIds;
    });

    // Make API call after state is updated
    const response = await completeTodo({
      uniqueId: item.excelRow.uniqueId,
      id: item?._id,
    });
    if (response?.data?.message === "Todo marked as completed successfully") {
      handleTogggleCompleteTodoDialog();
    }
    console.log("complete todo response  ==> ", response);
  };
  /*const handleCompleteTodo = async () => {
    setCompletedTodos((prevId) => {
      if (!prevId.includes(item._id)) {
        return [...prevId, item._id];
      } else {
        return prevId.filter((item) => item !== item._id);
      }
    });
    const response = await completeTodo({
      uniqueId: item.excelRow.uniqueId,
      id: item?._id,
    });
    if (response?.data?.message === "Todo marked as completed successfully") {
      handleTogggleCompleteTodoDialog();
    }
    console.log("complete todo response  ==> ", response);
  };*/

  const handleEditTodo = async () => {
    try {
      const response = await editTodo({
        uniqueId: item.excelRow.uniqueId,
        id: item?._id,
      });
      if (response?.data?.message === "Todo edited successfully") {
        handleTogggleEditTodoDialog();
        refetch(); // Refetch the todos to get the updated list
      } else {
        console.error("Error editing todo: ", response);
      }
    } catch (error) {
      console.error("Error editing todo: ", error);
    }
  };

  return (
    <>
      <div
        className={`w-full  max-w-full md:w-[48%] md:max-w-[48%] h-[150px] max-h-[150px]  relative bg-white border-[#B9B9B9] flex flow-row items-center justify-between border rounded-lg p-4 mb-4`}
      >
        {/* <div className="w-[14%] flex flex-col items-center justify-center h-full"> */}
        <button
          className="flex flex-row justify-center items-center w-6 h-6 rounded-full border border-border-color"
          onClick={handleTogggleCompleteTodoDialog}
        >
          {(item.status === true || completedTodos.includes(item._id)) && (
            <TickIcon />
          )}
        </button>
        {/* </div> */}

        <div className="w-[86%] flex flex-col items-center">
          {/* todo title and priority */}

          {/* first div */}
          <div className="w-full flex flex-row items-center">
            {/* title */}
            <p
              className={`font-semibold text-xl mr-4 ${
                item.status === true && "line-through"
              }`}
            >
              {item?.todoName}
            </p>
            {/* priority */}
            {item?.setPriority && (
              <p
                style={{
                  backgroundColor:
                    item?.setPriority === "High priority"
                      ? "red"
                      : item?.setPriority === "Medium priority"
                      ? "orange"
                      : item?.setPriority === "Low priority"
                      ? "lightcoral"
                      : "",
                  color: "white",
                  padding: "2px 5px",
                  // borderRadius: "5px",
                  display: "inline",
                }}
                className={`text-screen-bg text-[10px] font-semibold text-center rounded-3xl`}
              >
                {item.setPriority}
              </p>
            )}
          </div>

          {/* second div */}
          <div className="w-full flex flex-row items-top mt-2 gap-2 ">
            {item?.note && (
              <p
                className="w-[73%] text-primary-accent-color text-start text-sm "
                // style={{
                //   overflow: "hidden",
                //   textOverflow: "ellipsis",
                //   // whiteSpace: "nowrap",
                //   wordWrap: "break-word",
                //   fontSize: "0.875rem",
                // }}
              >
                {item?.note.length > 50
                  ? item?.note.substring(0, 50) + "..."
                  : item?.note}
              </p>
            )}
            <div className="w-[25%] flex flex-row items-center justify-between gap-x-2">
              {item.status === false && (
                <button
                  className="flex flex-col justify-center items-center"
                  onClick={
                    item.status === false ? handleTogggleEditTodoDialog : null
                  }
                >
                  <CiEdit size={20} color="#4169E1" />
                  <p className="text-primary-color">Edit</p>
                </button>
              )}

              <button
                className="flex flex-col items-center"
                onClick={handleOpenDeleteModal}
              >
                <RiDeleteBin6Line text="delete" size={20} color="red" />
                <p className="text-red-500">Delete</p>
              </button>
            </div>
          </div>

          {/* {item?.note && (
            <p className="text-lg text-primary-accent-color text-start mt-2">
              {item?.note}
            </p>
          )} */}
        </div>
      </div>
      {showCompleteTodoDialog && (
        <CompleteTodoModalDialog
          title="Mark as Completed"
          subTitle="Are you sure you want to mark as completed?"
          handleConfirm={handleCompleteTodo}
          handleCancel={handleTogggleCompleteTodoDialog}
        />
      )}

      {showEditTodoDialog && (
        <EditTodoComponent
          title="Mark as Completed"
          subTitle="Are you sure you want to mark as completed?"
          handleBackButton={handleTogggleEditTodoDialog}
          handleCloseButton={handleTogggleEditTodoDialog}
          handleEditData={item}
        />
      )}

      {/*<button onClick={handleOpenDeleteModal}><RiDeleteBin6Line /> </button>*/}
      {showDeleteModal && (
        <DeleteTodoModalDialog
          todoId={item._id} // Ensure that item._id is the correct todoId
          uniqueId={item.excelRow.uniqueId} // Ensure that item.excelRow.uniqueId is the correct uniqueId
          title="Delete Todo"
          subTitle="Are you sure you want to delete this todo?"
          handleDeleteData={item}
          handleConfirm={handleDeleteTodo}
          handleCancel={handleCloseDeleteModal}
        />
      )}

      {showDeleteAlert && (
        <DeleteDropDown
          showAlertModal={showDeleteAlert}
          message={"Todo deleted successfully "}
          type={"success"}
          customClass="delete-todo-dropdown"
        />
      )}

      {/*loadingEditGoal || (loadingCompleteGoal && <LoadingAnimation2 />)*/}
      {loadingEditTodo || (loadingCompleteTodo && <LoadingAnimation />)}
    </>
  );
};

export default TodoCardLg;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetExcelDataQuery } from "../../store/accountApiSlice";
import { windowWidth } from "../../utils/Dimensions";
import TickIcon from "../../icons/TickIcon";
import { useCompleteTodoMutation, useEditTodoMutation, useDeleteTodoMutation} from "../../store/todoApiSlice";
import CompleteTodoModalDialog from "./CompleteTodoModalDialog";
import LoadingAnimation from "../LoadingAnimation";
import DeleteTodoModalDialog from "./DeleteTodoModalDialog";
import EditTodoComponent from "./editTodoComponent";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
//import editIcon from "../../assets/editIcon.svg";
import DropDownAlert from "../DropDownAlert";

const TodoCard = ({ item, refetch }) => {
  const { accountsGoalUser, onboarding } = useSelector((state) => state.auth);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [showCompleteTodoDialog, setShowCompleteTodoDialog] = useState(false);
  const [showEditTodoDialog, setShowEditTodoDialog] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showCompletedTodoAlert, setShowCompletedTodoAlert] = useState(false);

  const [
    deleteTodo,
    { isLoading: loadingDeleteTodo, error: deleteTodoError },
  ] = useDeleteTodoMutation();

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
    editTodo,
    { isLoading: loadingEditTodo, error: editTodoError },
  ] = useEditTodoMutation();
  
  const handleTogggleEditTodoDialog = () => {
    // alert("edit");
   
    setShowEditTodoDialog(!showEditTodoDialog);
  };
  const [
    completeTodo,
    { isLoading: loadingCompleteTodo, error: completeError },
  ] = useCompleteTodoMutation();

  const handleTogggleCompleteTodoDialog = () => {
    // alert("edit");
    setShowCompleteTodoDialog(!showCompleteTodoDialog);
  };

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
  

  const handleCompleteTodo = async () => {
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
      setShowCompletedTodoAlert(true);
      setTimeout(() => {
        setShowCompletedTodoAlert(false);
      }, 3000);
      refetch(); // Refetch the todos to get the updated list
    }
    console.log("complete todo response  ==> ", response);
  };

  return (
    <>
      <div
        className={`  bg-white border-[#B9B9B9] flex flow-row items-center justify-between border rounded-lg   p-5 mb-4 `}
      >
        <div className="w-full">
         {/* {item?.setPriority && (
            <p
              className={`w-fit
            text-screen-bg text-[10px] font-semibold text-center rounded-2xl px-2  py-1  ${
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
          )} */}

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
      padding: "5px 10px", // Add padding
      borderRadius: "20px", // Add border radius
    }}
    className={` ${
      windowWidth < -230 ? "w-1/3" : "w-1/3"
    } text-screen-bg text-[10px] font-semibold text-center`}
  >
    {item.setPriority}
  </p>
)}


          <p
            className={`font-semibold text-base mt-2 ${
              item.status === true && "line-through"
            }`}
          >
            {item?.todoName}
          </p>
          {item?.note && (
            <p className="text-[8px] text-primary-accent-color mt-2">
              {item?.note}
            </p>
          )}
        </div>
        {/* select cirlce */}

        <button
          className="flex flex-row justify-center items-center w-6 h-6 rounded-full border border-border-color"
          onClick={handleTogggleCompleteTodoDialog}
        >
          {(item.status === true || completedTodos.includes(item._id)) && (
            <TickIcon />
          )}
        </button>
       {/* <div className="absolute right-0  mr-5 flex flex-col items-center">
    <div className="mb-2" onClick={handleTogggleEditTodoDialog}>
      <CiEdit
        size={25} 
        color="blue" 
      />
      <p className="text-blue-500">Edit</p>
    </div>

    <div onClick={handleOpenDeleteModal}>
      <RiDeleteBin6Line 
        text = "delete"
        size={25} 
        color="red" 
      />
      <p className="text-red-500">Delete</p>
    </div>
  </div>*/}

  {item.status === false && (
  <div className="ml-5 mr-5 flex flex-col items-center" onClick={handleTogggleEditTodoDialog}>
  <CiEdit
    size={20} 
    color="blue" 
  />
  <p className="text-blue-500">Edit</p>
</div>
  )}

<div className="ml-auto flex flex-col items-center" onClick={handleOpenDeleteModal}>
  <RiDeleteBin6Line 
    text = "delete"
    size={20} 
    color="red" 
  />
  <p className="text-red-500">Delete</p>
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
      <DropDownAlert
        showAlertModal={showDeleteAlert}
        message={"Todo deleted successfully"}
        type={"success"}
      />
    )}
      {showCompletedTodoAlert && (
      <DropDownAlert
        showAlertModal={showCompletedTodoAlert}
        message={"Todo marked Completed"}
        type={"success"}
      />
    )}
    
      {loadingCompleteTodo && <LoadingAnimation />}
    </>
  );
};

export default TodoCard;
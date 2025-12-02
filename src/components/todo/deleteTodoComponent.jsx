import React from "react";
import { useDeleteTodoMutation } from "../../store/todoApiSlice";

const DeleteTodoComponent = ({
  uniqueId,
  todoId,
  handleCloseButton,
}) => {
  const [deleteTodo, { isLoading: loadingDeleteTodo, error: deleteTodoError }] =
    useDeleteTodoMutation();

  const handleDeleteTodo = async () => {
    const response = await deleteTodo({ uniqueId: uniqueId, id: todoId });
    if (response?.data?.message === "Todo deleted successfully") {
      handleCloseButton();
    } else {
      console.error("Error deleting todo: ", response);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteTodo}>Delete Todo</button>
    </div>
  );
};

export default DeleteTodoComponent;
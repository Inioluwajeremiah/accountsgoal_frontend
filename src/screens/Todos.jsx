import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FeaturesMainHeader from "../components/FeaturesMainHeader";
import AddFloatingButon from "../components/AddFloatingButon";
import { useGetUserTodosQuery } from "../store/todoApiSlice";
import TodoComponentLg from "../components/todo/TodoComponentLg";
import CreateFeatureButton from "../components/CreateFeatureButton";
import CreateTodo from "../components/todo/CreateTodo";
import { useGetUserQuery } from "../store/authApi";
import emptyTodo from "../assets/emptyTodo.svg";
import filterIcon from "../assets/filterIcon.svg";
import axios from "axios";
import { BASE_URL } from "../utils/Endpoints";
import LoadingAnimation from "../components/LoadingAnimation";

const Todos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateTodoModal, setShowCreateTodoModal] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
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
  // const {data: userInfo, isLoading, isError, error} = useGetUserQuery();

  // const accountsGoalUser = isLoading ? 'Loading..' : userInfo;
  const { data: accountsGoalUser, isError, error } = useGetUserQuery();

  const [toggleModal, setToggleModal] = useState(false);
  const [toggleSearchModal, setToggleSearchModal] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [todoSearchResult, setTodoSearchResult] = useState([]);
  const [filterPriority, setFilterPriority] = useState("");

  const [showFilterModal, setShowFilterModal] = useState(false);

  const [value, setValue] = useState(new Date());

  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const [todo, setTodo] = useState([]);

  function onChange(nextValue) {
    setValue(nextValue);
  }

  const {
    data: todos,
    refetch,
    isLoading: loadingTodos,
    error: todoError,
  } = useGetUserTodosQuery(
    accountsGoalUser
      ? accountsGoalUser?._id
      : inviteLoad
      ? "loading"
      : getInvitedUserData && getInvitedUserData?.userId?._id
  );
  //console.log(todos);

  // When todos data is fetched, update filteredTodos to match
  useEffect(() => {
    if (todos) {
      setFilteredTodos(todos);
    }
  }, [todos]);

  const userTodos = useMemo(() => {
    return todos?.filter((item) => {
      return (
        typeof item?.todoName === "string" &&
        item?.todoName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterPriority ? item?.setPriority === filterPriority : true)
      );
    });
  }, [todos, searchTerm, filterPriority]);

  // Update the useMemo hook
  /*const userTodos = useMemo(() => {
  return todos?.filter((item) => {
    if (item && item.todoName && item.setPriority) {
      console.log(item.todoName, item.setPriority);
    }
    return (
      typeof item?.todoName === 'string' &&
      item?.todoName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterPriority ? item?.setPriority === filterPriority : true)
    );
  });
}, [todos, searchTerm, filterPriority]);
console.log(todos, filterPriority);*/

  // const pendingTodoData = userTodos && userTodos.filter((item) => item.status === false);

  // const completedTodoData = userTodos && userTodos.filter((item) => item.status === true);

  const pendingTodoData = filteredTodos.filter((item) => item.status === false);
  const completedTodoData = filteredTodos.filter(
    (item) => item.status === true
  );

  const handleToggleAddTodoModal = () => {
    setToggleModal(!toggleModal);
  };

  const handleToggleSearchModal = () => {
    setToggleSearchModal(!toggleSearchModal);
  };
  const handleToggleFilter = () => {
    setToggleFilter(!toggleFilter);
  };

  const handleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleFilterPriority = (priority) => {
    console.log(
      "Todos priorities: ",
      todos.map((todo) => todo.setPriority)
    );
    console.log("Selected priority: ", priority);
    const newFilteredTodos = todos.filter(
      (todo) =>
        todo.setPriority &&
        todo.setPriority.toLowerCase().includes(priority.toLowerCase()) &&
        todo.todoName.toLowerCase().includes(searchTerm.toLowerCase()) // Add this line
    );
    console.log("Filtered todos: ", newFilteredTodos);
    setFilteredTodos(newFilteredTodos); // Update the state variable
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const newFilteredTodos = todos.filter((todo) =>
      todo.todoName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTodos(newFilteredTodos); // Update the state variable
  };

  const handleToggleCreateTodoModal = () => {
    setShowCreateTodoModal(!showCreateTodoModal);
  };

  const handleToggleTabIndex = (index) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="flex flex-row items-center bg-screen-bg full-screen overflow-y-scroll">
      {/* </div> calendar div  */}
      {/* <div className="w-[25%] full-screen pt-10 px-6 overflow-y-scroll border-r border-[#DADCE0]"> */}

      {/* todo content div */}
      <div className="relative w-full h-screen pt-10 px-6 ">
        <FeaturesMainHeader
          placeHolderText={"Search by name"}
          handleSearch={handleSearch}
          //handleSearch={setSearchTerm}
          onFilterClick={handleFilterModal}
          showFilterIcon={true}
          //handleToggleFilter={handleFilterModal}
          handleFilterPriority={handleFilterPriority}
        />
        {showFilterModal && <FilterModal />}
        {/* tabs */}
        <div className="absolute right-6 mt-10 flex flex-row items-center">
          <button
            className={`rounded-xl px-4 py-2 w-28 text-center ${
              activeTabIndex === 0
                ? "bg-primary-color text-white border border-primary-color"
                : "bg-white text-[#A8A8A8] border border-[#A8A8A8]"
            }`}
            onClick={() => handleToggleTabIndex(0)}
          >
            Pending
          </button>
          <button
            className={`rounded-xl px-4 py-2 w-28 ml-4 text-center ${
              activeTabIndex === 1
                ? "bg-primary-color text-white"
                : "bg-white text-[#A8A8A8] border border-[#A8A8A8]"
            }`}
            onClick={() => handleToggleTabIndex(1)}
          >
            Completed
          </button>
        </div>

        {/* tab contents  */}
        {/* <div className="mt-10">
          {activeTabIndex === 0 && (
            <TodoComponentLg
              todoData={pendingTodoData}
              filterPriority={filterPriority}
              loadingTodos={loadingTodos}
              refetch={refetch}
            />
          )}
          {activeTabIndex === 1 && (
            <TodoComponentLg
              todoData={completedTodoData}
              completedTodoData={completedTodoData}
              filterPriority={filterPriority}
              loadingTodos={loadingTodos}
              refetch={refetch}
            />
          )}
        </div>*/}

        <div className=" w-[90%] mx-auto mt-20 pb-20">
          {activeTabIndex === 0 &&
            (pendingTodoData?.length > 0 && !loadingTodos ? (
              <TodoComponentLg
                todoData={
                  (filterPriority &&
                    pendingTodoData.filter(
                      (item) => item.setPriority === filterPriority
                    )) ||
                  pendingTodoData
                }
                loadingTodos={loadingTodos}
                refetch={refetch}
              />
            ) : loadingTodos ? (
              <LoadingAnimation />
            ) : (
              <div className="h-screen flex items-center justify-center flex-col">
                <img src={emptyTodo} alt="EmptyTodo" />
                <CreateFeatureButton
                  title={"Create To-do"}
                  handleClick={handleToggleCreateTodoModal}
                  isIcon={false}
                  customClass="create-todo-button"
                />
              </div>
            ))}
          {activeTabIndex === 1 &&
            (completedTodoData?.length > 0 && !loadingTodos ? (
              <TodoComponentLg
                todoData={
                  (filterPriority &&
                    completedTodoData.filter(
                      (item) => item.setPriority === filterPriority
                    )) ||
                  completedTodoData
                }
                filterPriority={filterPriority}
                loadingTodos={loadingTodos}
                refetch={refetch}
              />
            ) : loadingTodos ? (
              <LoadingAnimation />
            ) : (
              <div className="h-screen flex items-center justify-center flex-col">
                <img src={emptyTodo} alt="EmptyTodo" />
                <CreateFeatureButton
                  title={"Create To-do"}
                  handleClick={handleToggleCreateTodoModal}
                  isIcon={false}
                  customClass="create-todo-button"
                />
              </div>
            ))}
        </div>

        <AddFloatingButon handleOnclick={handleToggleCreateTodoModal} />
      </div>

      {showCreateTodoModal && (
        <CreateTodo
          handleBackButton={handleToggleCreateTodoModal}
          //setTodo={setTodo}

          handleCloseButton={() => {
            setShowCreateTodoModal(false);
            refetch(); // Refetch the todos after closing the CreateTodo modal
          }}
          fromList={true}
        />
      )}
    </div>
  );
};

export default Todos;

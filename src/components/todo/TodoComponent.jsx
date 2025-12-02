import PendingTodoCard from "./PendingTodoCard";
import LoadingAnimation from "../LoadingAnimation";
import TodoCard from "./TodoCard";

const TodoComponent = ({ todoData, loading, refetch }) => {
 

  const TodoSections = () => {
    const sections = {};
    todoData &&
      todoData.forEach((item) => {
        const date = item.endDate;
        if (sections[date]) {
          sections[date].push(item);
        } else {
          sections[date] = [item];
        }
      });
    return Object.entries(sections).map(([date, items]) => ({
      title: new Date(date).toDateString(),
      data: items,
    }));
  };

  const sections = TodoSections();

  console.log("sections ==> ", sections);
  console.log("todoData ==> ", todoData);

  return (
    <>
      <div className=" w-full flex flex-col justify-start items-start ">
        {sections.map((item, index) => (
          <div key={index} className="w-full">
            <p className="text-lg text-primary-accent-color font-semibold mt-10 mb-4">
              {item.title}
            </p>
            {item.data.map((todo, key) => (
              <TodoCard key={key} item={todo} refetch={refetch} />
            ))}
          </div>
        ))}
      </div>

      {loading && <LoadingAnimation />}
    </>
  );
};

export default TodoComponent;

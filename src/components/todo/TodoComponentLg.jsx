import LoadingAnimation from "../LoadingAnimation";
import TodoCardLg from "./TodoCardLg";

const TodoComponentLg = ({ todoData, loading, refetch }) => {
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
      {sections.map((item, index) => (
        <div key={index}>
          <p className="text-lg text-primary-accent-color font-semibold mt-10 mb-4">
            {item.title}
          </p>
          {/*{item.data.map((todo, key) => (
              <TodoCardLg key={key} item={todo} refetch={refetch} />
            ))}*/}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-"> */}
          <div className="w-full flex flex-row flex-grow flex-wrap gap-6">
            {item.data.map((todo, key) => (
              <TodoCardLg item={todo} refetch={refetch} />
            ))}
          </div>
        </div>
      ))}

      {/* {loading && <LoadingAnimation />} */}
    </>
  );
};

export default TodoComponentLg;

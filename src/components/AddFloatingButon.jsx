import addIcon from "../assets/addIcon.svg";

const AddFloatingButon = ({ handleOnclick }) => {
  return (
    <button
      className="fixed right-20 bottom-20  h-14 w-14 rounded-full bg-primary-color flex flex-col items-center justify-center"
      onClick={handleOnclick}
    >
      <img src={addIcon} alt="Add icon" />
    </button>
  );
};

export default AddFloatingButon;

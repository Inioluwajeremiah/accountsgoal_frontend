const CreateFeatureButton = ({
  handleClick,
  title,
  isIcon,
  icon,
  isValidForm,
  customClass
}) => {
  return (
    <button
      className={`w-[80%] mx-auto ${
        !isValidForm ? "bg-primary-color" : "bg-[#6787e7]"
      } rounded-full mt-10 h-12 py-3 flex justify-center items-center ${customClass}`}
      disabled={isValidForm ? true : false}
      onClick={handleClick}
    >
      {isIcon && (
        <img src={icon} alt={`${title} icon`} className="w-6 h-6 mr-6" />
      )}
      <p className="text-white">{title}</p>
    </button>
  );
};

export default CreateFeatureButton;

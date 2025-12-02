const TextInputField = ({ ...props }) => {
  return (
    <input
      {...props}
      type="text"
      className="w-full max-h-12 h-12 border border-border-color rounded-full px-6 mt-4 focus:outline-none "
    />
  );
};

export default TextInputField;

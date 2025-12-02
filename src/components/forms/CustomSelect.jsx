const CustomSelect = ({ data, handleSelectData, value }) => {
  return (
    <div className="relative w-full mt-4">
      <input
        list="data"
        name="client"
        id="client"
        value={value}
        className="h-12 w-full border border-border-color rounded-full px-6 py-2 focus:outline-none"
        onChange={handleSelectData}
      />
      <datalist id="data" className="">
        {data.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default CustomSelect;

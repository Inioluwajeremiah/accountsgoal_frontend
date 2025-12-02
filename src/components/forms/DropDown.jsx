import React, { useRef } from "react";
import angleDown from "../../assets/angleDown.svg";

const DropDown = ({
  filteredClientData,
  handleSelectClients,
  handleSearchTerm,
  attachedClient,
  toggleAttachClient,
  handleToggleAttachClient,
  searchTerm,
}) => {
  const inputRef = useRef(null);

  const handleInputClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="mt-4">
      <button
        className="w-full h-12 flex flex-row items-center justify-between  rounded-full px-6  py-2 border border-border-color"
        onClick={handleToggleAttachClient}
      >
        <p className="text-sm">{attachedClient}</p>
        <img src={angleDown} alt="drop down icon" />
      </button>

      {/* toggle client data drop down */}
      {toggleAttachClient && (
        <div className="flex flex-col justify-start">
          <input
            placeholder="Search client by name"
            value={searchTerm}
            className="w-full h-12 mt-4 mb-2 text-sm border-b border-border-color appearance-none focus:outline-none"
            onChange={handleSearchTerm}
            ref={inputRef}
          />

          {filteredClientData.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSelectClients(item)}
              className={`mt-2 text-start text-sm ${
                attachedClient === item.ACCOUNT_NAME
                  ? "text-black"
                  : "text-[#A8A8A8]"
              } `}
            >
              {item.ACCOUNT_NAME}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;

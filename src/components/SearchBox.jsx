import React, { useState, useRef, useEffect  } from "react";
import searchIcon from "../assets/searchIcon.svg";
import filterIcon from "../assets/filterIcon.svg";

const SearchBox = ({
  map,
  placeHolderText,
  showFilter,
  handleFilterPriority,
  ...props
}) => {
  const [showPriorityList, setShowPriorityList] = useState(false);
  const filterRef = useRef();

  const handleFilterIconClick = () => {
    setShowPriorityList(!showPriorityList);
    // handleToggleFilter();
  };

  
  // Function to check if the clicked area is outside of the filter dropdown
  const handleFilterClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowPriorityList(false);
    }
  };

  // Add the event listener when the component is mounted
  useEffect(() => {
    document.addEventListener("mousedown", handleFilterClickOutside);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleFilterClickOutside);
    };
  }, []);

  return (
    <div
      className={`${
        map ? "bg-white" : ""
      } h-12 flex flex-row items-center justify-between px-6 py-2 border rounded-full`}
    >
      <div className="flex flex-row items-center">
        <img src={searchIcon} alt="Search icon" className="mr-4" />
        <input
          {...props}
          type="text"
          placeholder={placeHolderText}
          className="focus:outline-none mr-4 bg-transparent"
        />
      </div>
      {showFilter && (
        <div ref={filterRef}>
          <button onClick={handleFilterIconClick}>
            <img src={filterIcon} alt="Filter icon" />
          </button>
          {showPriorityList && (
            <div className="absolute top-0 left-80 bg-white shadow-lg rounded-lg p-4">
              <button
                onClick={() => handleFilterPriority("High")}
                className="block p-2 text-red-500"
              >
                High priority
              </button>
              <button
                onClick={() => handleFilterPriority("Medium")}
                className="block p-2 text-orange-500"
              >
                Medium priority
              </button>
              <button
                onClick={() => handleFilterPriority("Low")}
                className="block p-2 text-green-500"
              >
                Low priority
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchBox;

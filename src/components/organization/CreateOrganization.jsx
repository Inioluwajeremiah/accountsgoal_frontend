import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import logopic from '../image/logopic.png';
import backArrow from "../../assets/backArrow.svg";
import orgimage from "../image/orgimage.png";
import LabelField from "../forms/LabelField";
import TextInputField from "../forms/TextInputField";
import DropDown from "../forms/DropDown";
import { companySizeData, companyTypeData } from "../../utils/dummyData";
import CreateFeatureButton from "../CreateFeatureButton";
import CustomSelect from "../forms/CustomSelect";
import { windowWidth } from "../../utils/Dimensions";
import InviteOthersScreen from "./InviteOthersScreen";

const CreateOrganization = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companySize, setCompanySize] = useState("");
  const scrollRef = useRef(null);

  const isValidForm = !companyName || !companyType || !companySize;

  const handleSwitchTab = (index) => {
    setTabIndex(index);
  };

  const handleSelectCompanyType = (value) => {
    setCompanyType(value);
  };

  const handleSelectCompanySize = (value) => {
    setCompanySize(value);
  };

  const handleNextButton = async () => {
    const targetObject = document.getElementById("inviteOthers");
    const body = {
      companyName,
      companyType,
      companySize,
    };
    setTabIndex(1);

    // Scroll to the target object
    targetObject.scrollIntoView({ behavior: "smooth" });
  };
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyType: "",
    companySize: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const objectWidth = windowWidth / 2;

  const handleHorizontalScroll = (e) => {
    const scrollWidth = e.target.scrollLeft;
    const objectIndex = Math.round(scrollWidth / (0.5 * windowWidth));
    setTabIndex(objectIndex);
  };

  localStorage.setItem("companyDetails", JSON.stringify(companyData));
  const navigate = useNavigate();

  // invite others tab

  return (
    <div className="w-full fixed h-screen top-0 left-0 overflow-y-scroll flex flex-row items-center ">
      {/* org and invite div - left div */}
      <div className="w-1/2 bg-white flex flex-col gap-y-10 px-10  py-7 justify-start items-start h-full overflow-y-scroll ">
        {/* header */}
        <div className=" pt-4 flex flex-row gap-x-5 justify-center">
          <button onClick={() => navigate(-1)}>
            <img src={backArrow} alt="back arrow icon" />
          </button>
          <h1 className=" text-center text-black text-2xl font-bold font-inter">
            Organization
          </h1>
        </div>

        {/*  tab indicator */}
        <div className="w-1/2 flex flex-row items-center justify-start ml-[7%]">
          <div className={`w-1/2 h-[7px] rounded-full bg-primary-color`} />

          <div
            className={`w-1/2 h-[7px] rounded-full ${
              tabIndex === 1 ? "bg-primary-color" : "bg-[#C5C5C5]"
            }  ml-6`}
          />
        </div>

        {/* tab contents */}

        <div
          ref={scrollRef}
          className={`w-full flex flex-row items-center overflow-x-scroll snap-x snap-mandatory `}
          onScroll={handleHorizontalScroll}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* create organisation div */}
          <div
            style={{ minWidth: objectWidth, width: objectWidth }}
            className=" h-full  flex flex-col pl-[7%]  snap-start  "
          >
            <h1 className="text-xl text-black text-left font-bold font-inter">
              Create Organization
            </h1>
            <p className="w-[60%] mt-4 text-sm text-[#5C5C5C]">
              It's your first step towards streamlined management and enhanced
              productivity
            </p>

            {/* form fileds */}
            <div className="w-[60%]  mx-auto md:mx-0 md:pl-[7%]  ">
              <LabelField required={true} labelTitle={"Company Name"} />
              <TextInputField
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <LabelField required={true} labelTitle={"Organization Size"} />

              <div className="flex flex-row flex-wrap gap-4 mt-2 ">
                {companySizeData.map((item, index) => (
                  <button
                    key={index}
                    className={`border ${
                      companySize === item
                        ? "border-black"
                        : "border-form-text-color"
                    } rounded-3xl p-3`}
                    onClick={() => handleSelectCompanySize(item)}
                  >
                    <p className=" text-center text-xs ">{item}</p>
                  </button>
                ))}
              </div>

              <LabelField required={true} labelTitle={"Company Type"} />

              <CustomSelect
                data={companyTypeData}
                handleSelectData={(e) => setCompanyType(e.target.value)}
                value={companyType}
              />
            </div>

            <div className="w-[69%]  mx-auto md:mx-0  mb-10  ">
              <CreateFeatureButton
                title={"Next"}
                handleClick={handleNextButton}
                isIcon={false}
                isValidForm={isValidForm}
              />
            </div>

            {/* <form className="bg-white  rounded pt-6 pb-8 mb-4 w-full">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 text-left"
                    htmlFor="fullname"
                  >
                    Company Name
                  </label>
                  <input
                    onChange={handleChange}
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-blacl leading-tight focus:outline-none focus:shadow-outline"
                    id="fullname"
                    type="text"
                    value={companyData.companyName}
                    name="companyName"
                    placeholder="company name"
                  />
                </div>

                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb- text-left"
                    htmlFor="password"
                  >
                    Organization Size
                  </label>
                  <div className="flex flex-row justify-between bg-white shadow-md rounded px-4 py-">
                    <div className="flex items-center justify-center bg-white rounded-full p-2">
                      <input
                        onChange={handleChange}
                        type="radio"
                        id="size1-20"
                        value={"1-20"}
                        name="companySize"
                        className="form-radio h-5 w-5 text-blue-500 mr-2"
                      />
                      <label htmlFor="size1-20" className="text-gray-700">
                        1-20
                      </label>
                    </div>
                    <div className="flex items-center justify-center bg-white rounded-full p-2">
                      <input
                        onChange={handleChange}
                        type="radio"
                        id="size20-50"
                        value={"20-50"}
                        name="companySize"
                        className="form-radio h-5 w-5 text-blue-500 mr-2"
                      />
                      <label htmlFor="size20-50" className="text-gray-700">
                        20-50
                      </label>
                    </div>
                    <div className="flex items-center justify-center bg-white rounded-full p-2">
                      <input
                        onChange={handleChange}
                        type="radio"
                        id="size50-100"
                        value={"50-100"}
                        name="companySize"
                        className="form-radio h-5 w-5 text-blue-500 mr-2"
                      />
                      <label htmlFor="size50-100" className="text-gray-700">
                        50-100
                      </label>
                    </div>
                    <div className="flex items-center justify-center bg-white rounded-full p-2">
                      <input
                        onChange={handleChange}
                        type="radio"
                        id="size100+"
                        value={"100 Above"}
                        name="companySize"
                        className="form-radio h-5 w-5 text-blue-500 mr-2"
                      />
                      <label htmlFor="size100+" className="text-gray-700">
                        100 Above
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 text-left"
                    htmlFor="fullname"
                  >
                    Company Type
                  </label>
                  <select
                    onChange={handleChange}
                    name="companyType"
                    value={companyData.companyType}
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="companyType"
                  >
                    <option value="">Select Company Type</option>
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="">
                  <button
                    onClick={() => navigate("/invite-others")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded-full focus:outline-none focus:shadow-outline w-full"
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </form> */}
          </div>

          {/* send invite */}
          <div
            id="inviteOthers"
            style={{ minWidth: objectWidth, width: objectWidth }}
            className="h-full flex flex-col ml-[7%] snap-start "
          >
            <InviteOthersScreen
              organizatioParams={{ companyName, companyType, companySize }}
            />
          </div>
        </div>
      </div>

      {/* image div  - right div*/}
      <div className="w-1/2 py-10  bg-blue-500 h-screen flex flex-col gap-y-6 justify- items-center">
        <div className="w-[300px]">
          <img
            src={orgimage}
            alt="accounts goal organization image"
            className=" text-blue-500 w-full h-full object-cover object-center"
          />
        </div>
        <div></div>
        <div>
          <h1 className="text-2xl font-bold text-white text-center">
            Build, Grow, Thrive: Launch your Organization and <br />
            Unite Visionaries
          </h1>

          <p className="text-[#f6f6f6] mb-8">
            Transforming your ideas into impact: Forge your Team and Amplify
            your Mission
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateOrganization;

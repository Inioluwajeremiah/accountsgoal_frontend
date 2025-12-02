import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logopic from "../image/logopic.png";
import orgimage from "../image/orgimage.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useCreateOrganizationMutation } from "../../store/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/userSlice";
import Loading from "../Loading";
const InviteOthers = () => {
  const [inputFields, setInputFields] = useState([]);
  const [email, setEmail] = useState("");
  const [getCompanyData, setGetCompanyData] = useState();
  const [emptyField, setEmptyField] = useState(null);
  const [err, setErr] = useState(null);
  const [createOrganization, { isLoading, isError }] =
    useCreateOrganizationMutation();
  const [succeed, setSucceed] = useState(null);

  const addInputField = () => {
    setInputFields([...inputFields, { id: Math.random() }]);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("companyDetails")) {
      setGetCompanyData(JSON.parse(localStorage.getItem("companyDetails")));
    }
  }, []);

  const handleChange = (id, value) => {
    setInputFields(
      inputFields.map((input) =>
        input.id === id ? { ...input, value } : input
      )
    );
  };

  const handleSubmit1 = () => {
    const inputData = inputFields.map((input) => input.value);
    console.log(inputData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!companyName || !companySize || !companyType || !members) {
    //   setEmptyField("Please fill all fields");
    //   // console.log("please fill all fields");
    //   return;
    // }

    const inputData = inputFields.map((input) => input.value);
    console.log(inputData);
    const credentials = {
      companyName: getCompanyData && getCompanyData.companyName,
      companySize: getCompanyData && getCompanyData.companySize,
      companyType: getCompanyData && getCompanyData.companyType,
      members: [...inputData, email],
    };
    console.log("all", credentials);

    try {
      const res = await createOrganization(credentials).unwrap();
      dispatch(setCredentials({ ...res }));
      if (res) {
        setSucceed("Organization created successfully");
        console.log("success");
        localStorage.removeItem("companyDetails");
        setTimeout(() => {
          navigate("/invitation-sent");
        }, 3000);
      }
    } catch (error) {
      console.log(error.data.msg);
      // console.log(error.data.msg);
      setErr(error?.data?.msg);
    }
  };
  // console.log(getCompanyData && getCompanyData.companyName);
  return (
    <div className=" flex h-screen">
      <div className=" bg-white flex flex-col gap-y-10 py-7 justify-start items-start overflow-y-auto w-full h-full">
        <div className="pl-4 pt-4 flex flex-row gap-x-5 justify-center">
          <svg
            onClick={() => navigate("/create-organization")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-black cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className=" text-center text-black text-2xl font-bold font-inter">
            Organization
          </h1>
        </div>

        <div className="text- px-16 ">
          <h1 className="text-xl text-black text-bold text-left font-bold font-inter">
            Invite Others
          </h1>
          <p className="text-justify w-full whitespace-normal">
            Use email or generate a unique link to easily bring new members
            onboard and collaborate effectively
          </p>
          <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-full">
            {isError && (
              <p className="bg-[#B20000] mt-3 text-white font-dmSans py-2 px-3">
                {err || "Please check your internet connection and try again"}
              </p>
            )}
            {emptyField && (
              <p className="bg-[#B20000] mt-3 text-white font-dmSans py-2 px-3">
                {emptyField}
              </p>
            )}
            {succeed && (
              <p className="bg-[#36A74A] mt-3 text-white font-dmSans py-2 px-3">
                {succeed}
              </p>
            )}{" "}
            <div className="mb-4">
              <h2 className="block text-gray-700 text-sm font-bold mb-2 text-left">
                Add Members
              </h2>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                placeholder=""
              />
            </div>
            {inputFields?.map((field) => (
              <div key={field.id}>
                <input
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  value={field.value}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                  id="fullname"
                  type="text"
                  placeholder=""
                />
              </div>
            ))}
            <div className="flex items-center gap-x-1 justify-end mb-4">
              <Link
                onClick={addInputField}
                className="text-[#FFA500] flex items-center gap-x-1 font-medium font-inter"
              >
                {" "}
                <CiCirclePlus color="#FFA500" />
                Add more members
              </Link>
            </div>
            <div className="flex items-center justify-center flex-col">
              <button
                onClick={handleSubmit}
                className={`${
                  isLoading
                    ? "bg-blue-200 flex items-center justify-center w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6"
                    : "bg-[#4169e1] w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6"
                }   text-center text-xl py-3`}
              >
                {isLoading ? <Loading /> : "Send Invitation"}
              </button>
              <Link className="font-inter font-normal text-[#777777] flex items-center gap-x-1 justify-center mt-3">
                Skip{" "}
                <span className="flex">
                  <MdKeyboardArrowRight /> <MdKeyboardArrowRight />{" "}
                  <MdKeyboardArrowRight />
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full h-full py-10  bg-blue-500  flex flex-col gap-y-6 justify- items-center">
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

export default InviteOthers;

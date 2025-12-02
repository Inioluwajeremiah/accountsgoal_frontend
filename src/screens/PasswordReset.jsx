import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logopic.png";
import CircleImg from "../assets/circleimg.png";
import Globe from "../assets/globe.png";
import Loading from "../components/Loading";
import { useStateContext } from "../context/contextProvider";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyResetPasswordMutation } from "../store/authApi";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordReset = () => {
  const [data, setData] = useState([]);
  const [emptyField, setEmptyField] = useState(null);
  const [succeed, setSucceed] = useState(null);
  const [err, setErr] = useState(null);
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");
  // const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState("");
  // const [isError, setIsError] = useState(null)
  const { formData, setFormData } = useStateContext();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (localStorage.getItem("usersparameter")) {
      setData(JSON.parse(localStorage.getItem("usersparameter")));
    }
  }, []);

  const [verifyResetPassword, { isLoading, isError }] =
    useVerifyResetPasswordMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPwd || !confirmNewPwd) {
      setEmptyField("Please fill all fields");
      // console.log("please fill all fields");
      return;
    }

    try {
      const res = await verifyResetPassword({
        password: newPwd,
        confirmPassword: confirmNewPwd,
        userId: data.userId,
      }).unwrap();

      if (res) {
        setSucceed("Password Reset Successfully");
        localStorage.removeItem("usersparameter");
        navigate("/password-changed");
      }
    } catch (error) {
      console.log(error);
      // console.log(error.data.msg);
      setErr(error?.data?.msg);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen ">
      <div className="h-full w-full md:overflow-y-auto -mt-12">
        <div className="md:w-44 w-52 mx-auto md:mx-0">
          <img src={Logo} alt="logo" className="w-full h-full" />
        </div>
        <form onSubmit={handleSubmit} className="px-8 md:px-10 lg:px-20  ">
          <div>
            <h2 className="font-inter font-bold text-center -mt-16 md:-mt-0 md:text-left text-xl">
              Password Reset
            </h2>
            <p className="font-inter text-[#5C5C5C] text-[12px] md:text-[14px] text-center md:text-left">
              We’ve sent an otp to the mail you provided us
            </p>
          </div>
          <input
            type="hidden"
            onChange={(e) => setOtp(e.target.value)}
            value={formData.otpValues}
            name="otp"
          />
          <input
            type="hidden"
            onChange={(e) => setUserId(e.target.value)}
            value={data.userId}
            name="userId"
          />
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
          <div className="relative flex flex-col gap-y-1 mt-7">
            <label className="font-inter" htmlFor="password">
              New Password <span className="text-[#ed0202]">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setNewPwd(e.target.value)}
              value={newPwd}
              name="newPwd"
              placeholder="********"
              className="border-2 rounded-2xl placeholder:text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-full"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2/3  transform -translate-y-1/2   "
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="relative flex flex-col gap-y-1 mt-7">
            <label className="font-inter" htmlFor="password">
              Confirm Password <span className="text-[#ed0202]">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setConfirmNewPwd(e.target.value)}
              value={confirmNewPwd}
              name="confirmNewPwd"
              placeholder="********"
              className="border-2 rounded-2xl placeholder:text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-full"
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2/3  transform -translate-y-1/2   "
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <button
            type="submit"
            className={`${
              isLoading
                ? "bg-blue-200 flex items-center justify-center w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6"
                : "bg-[#4169e1] w-full py-2 rounded-2xl text-white font-inter font-semibold mt-6"
            }`}
          >
            {isLoading ? <Loading /> : "Reset Password"}
          </button>
        </form>
      </div>
      <div className="hidden md:flex bg-blue-500 h-full  flex-col items-center">
        <div className="relative h-[400px] w-full pt-10 flex flex-col items-center">
          <div className="circleImg w-[400px] h-[400px] rounded-full flex flex-col justify-center items-center"></div>
          <img src={Globe} alt="" className="absolute top-28 w-[600px]" />
        </div>
        <div>
          <h2 className="font-bold text-center text-2xl font-inter text-white mt-4">
            Geo-Client Mapping Interface
          </h2>
          <p className="font-inter text-[#f3f3f3f3] text-center text-[16px] font-normal">
            Navigate your sales territory with ease! Our Map View helps you
            locate <br /> clients,
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;

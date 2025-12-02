import React, { useEffect, useState } from "react";
import Layer_1 from "../assets/Layer_1.svg";
import { sideBarLinks } from "../data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice";
import { useLogoutUserMutation } from "../store/authApi";

const SideBar = () => {
  const { pathname } = useLocation();
  const { accountsGoalUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser, { isLoading, isError, error }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      const res = await logoutUser().unwrap();
      if (res) {
        console.log(res);
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
      localStorage.removeItem("accountsGoalUser");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-primary-color w-[6%]  h-screen fixed left-0 top-0 bottom-0 flex flex-col items-center overflow-x-scroll">
      {/* accountsgoal logo */}
      <div className="w-[26.11px] h-[42px] mt-8">
        <Link to={"/"}>
          <img
            src={Layer_1}
            alt="Layer1 Image"
            className="w-full h-full object-cover object-center"
          />
        </Link>
      </div>

      {/* sidebar links */}
      <div className="w-[90%] mx-auto flex flex-col items-center gap-y-6 mt-10 ">
        {sideBarLinks?.map((links, i) => {
          const { label, path, icon } = links;
          const activeLink = pathname === path;
          return (
            <Link
              to={path}
              key={i}
              className={`  ${
                activeLink
                  ? "flex flex-col items-center font-inter text-[#FFFFFF] font-bold"
                  : "flex flex-col items-center font-inter text-[#C5C5C5]"
              }`}
            >
              <span className="">{icon}</span>
              <span className="mt-2 text-center text-sm">{label}</span>
            </Link>
          );
        })}

        <div>
          <Link
            onClick={logoutHandler}
            className={` text-sm ${
              pathname === "/logout"
                ? "flex flex-col items-center font-inter text-[#FFFFFF] font-bold"
                : "flex flex-col items-center font-inter text-[#C5C5C5]"
            }`}
          >
            <span>
              <HiOutlineLogout />
            </span>
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

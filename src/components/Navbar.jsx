<<<<<<< HEAD

import React, { useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> f4e0f422fa6baf01fecb8bee6aa3e34c0358f2d2
import accountgoalimg from "../assets/accountgoalimg.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { useGetUserQuery, useLoginStatusQuery } from "../store/authApi";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/Endpoints";
import axios from "axios";

const Navbar = ({ isPrivacyPolicy }) => {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const { data: loginStatus } = useLoginStatusQuery();

  // const { accountsGoalUser } = useSelector((state) => state.auth);
  const [inviteLoad, setInviteLoad] = useState(false);
  const [getInvitedUserData, setGetInvitedUserData] = useState();
  const { accountsGoalUser: invitedUserfromLocalStorage } = useSelector(
    (state) => state.auth
  );

  const getInvitedUser = async () => {
    try {
      if (invitedUserfromLocalStorage) {
        setInviteLoad(true);
        const res = await axios.get(
          `${BASE_URL}getuser-under-organization/${invitedUserfromLocalStorage?.organizationId}/${invitedUserfromLocalStorage?.userId}/${invitedUserfromLocalStorage?._id}`
        );
        if (res) {
          // console.log(res.data, "innnnnnvvvv");
          setGetInvitedUserData(res?.data[0]);
        }
        setInviteLoad(false);
      }
    } catch (error) {
      setInviteLoad(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (invitedUserfromLocalStorage) {
      getInvitedUser();
    }
  }, []);

  // console.log("innnnnnvvvv", getInvitedUserData);

  const {
    data: accountsGoalUser,
    isLoading,
    isError,
    error,
  } = useGetUserQuery();
  const isLoggedIn = isLoading
    ? "loading.."
    : accountsGoalUser || (inviteLoad ? "loading" : getInvitedUserData);

  console.log("sta", loginStatus);

  const handleToggleNavBar = () => {
    setToggleNavbar(!toggleNavbar);
    // alert(JSON.stringify(toggleNavbar));
  };
  const navLinkStyle = {
    // margin: "0 50px",
    fontSize: "16px",
    fontWeight: "normal",
    color: "#5C5C5C",
    textDecoration: "none",
  };

  // function that takes you to the top when triggered
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigate = useNavigate();

  /*const handleNavigation = (section) => {
    if (isPrivacyPolicy) {
      navigate(`/#${section}`);
    }
  };*/
  const handleNavigation = (section) => {
    console.log(`Navigating to section: ${section}`);
    if (isPrivacyPolicy) {
      navigate(`/#${section}`);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ${
  //   // !toggleNavbar ? "hidden" : "top-32 left-52 bg-red-600"
  //   ""
  // }
  //     <header className="container w-full h-20 fixed z-50 top-0 left-0 flex flex-row justify-between  items-center shadow-md  bg-white-color overflow-hidden">

  //         className={`w-full  border border-red-500 md:relative flex flex-col mt-52 md:mt-0 md:flex-row md:justify-between md:items-center

  return (
    // <header className=" w-full h-20 fixed z-50 top-0 left-0 shadow-md flex justify-center bg-white-color">
    <header className=" fixed z-50  top-0 left-0 right-0 h-20  bg-white flex flex-row items-center md:px-10 lg:px-16 ">
      {/* Logo */}
      <div className="container w-full mx-auto md:px-10 px-[5%]  flex flex-row justify-between items-center ">
        <Link
          activeClass="active"
          to={"/"}
          onClick={goToTop}
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          // onSetActive={handleSetActive}
          className="cursor-pointer"
        >
          <img
            loading="lazy"
            src={accountgoalimg}
            alt="Logo"
            className="w-40 h-10 overflow-hidden"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className={`absolute top-20 w-[100%] h-[100vh] bg-white px-8 py-14 
            md:p-0 md:h-fit text-black md:w-full md:shadow-none md:text-black  
           md:relative md:top-0 md:right-0 transition-all duration-500 ease-in 
            ${toggleNavbar ? "right-0" : "-right-[100%]"}`}
        >
          <div className=" w-full flex flex-col gap-y-12 justify-start items-start md:flex-row md:justify-between md:items-center">
            <div
              className={`flex w-full flex-col gap-y-12 md:gap-x-16 lg:gap-x-20 md:flex-row justify-center h-full md:h-fit items-left md:items-center mx-auto`}
            >
              {/* <NavLink
                to={"#features"}
                style={navLinkStyle}
                className={({ isActive, isPending }) =>
                  isActive ? "text-primary-color" : "text-primary-accent-color"
                }
              >
                Features
              </NavLink> */}
              {/*<Link
                activeClass="active"
                to="features"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                // onSetActive={handleSetActive}
                className="cursor-pointer"
              >
                Features
              </Link>
              <Link
                activeClass="active"
                to="pricing"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                // onSetActive={handleSetActive}
                className="cursor-pointer"
              >
                Pricing
              </Link>
              <Link
                activeClass="active"
                to="aboutus"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                // onSetActive={handleSetActive}
                className="cursor-pointer"
              >
                About us
              </Link>
              <Link
                activeClass="active"
                to="faq"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                // onSetActive={handleSetActive}
                className="cursor-pointer"
              >
                FAQ
              </Link>*/}

              {/*{isPrivacyPolicy ? (
                <>
                  <a
                    onClick={() => handleNavigation("features")}
                    className="cursor-pointer"
                  >
                    Features
                  </a>
                  <a
                    onClick={() => handleNavigation("pricing")}
                    className="cursor-pointer"
                  >
                    Pricing
                  </a>
                  <a
                    onClick={() => handleNavigation("aboutus")}
                    className="cursor-pointer"
                  >
                    About us
                  </a>
                  <a
                    onClick={() => handleNavigation("faq")}
                    className="cursor-pointer"
                  >
                    FAQ
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="features"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="cursor-pointer"
                  >
                    Features
                  </Link>
                  <Link
                    to="pricing"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="cursor-pointer"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="aboutus"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="cursor-pointer"
                  >
                    About us
                  </Link>
                  <Link
                    to="faq"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="cursor-pointer"
                  >
                    FAQ
                  </Link>
                </>
              )}*/}

              {isPrivacyPolicy ? (
                <>
                  <a
                    onClick={() => handleNavigation("features")}
                    className="cursor-pointer"
                  >
                    Features
                  </a>
                  <a
                    onClick={() => handleNavigation("pricing")}
                    className="cursor-pointer"
                  >
                    Pricing
                  </a>
                  <a
                    onClick={() => handleNavigation("aboutus")}
                    className="cursor-pointer"
                  >
                    About us
                  </a>
                  <a
                    onClick={() => handleNavigation("faq")}
                    className="cursor-pointer"
                  >
                    FAQ
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="features"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="cursor-pointer"
                  >
                    Features
                  </Link>
                  <Link
                    to="pricing"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="cursor-pointer"
                  >
                    {" "}
                    Pricing{" "}
                  </Link>

                  <Link
                    to="aboutus"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="cursor-pointer"
                  >
                    About us
                  </Link>
                  <Link
                    to="faq"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="cursor-pointer"
                  >
                    FAQ
                  </Link>
                </>
              )}
            </div>
            {/* Login/SignUp */}
            {accountsGoalUser || getInvitedUserData ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="h-10 w-44 bg-blue-500 rounded-full shadow flex items-center justify-center p-3 text-white"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="h-10 w-44 bg-blue-500 rounded-full shadow flex items-center justify-center p-3 text-white"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </nav>

        {/* nav icon */}
        <button className=" md:hidden " onClick={handleToggleNavBar}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 5H20"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 12H20"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 19H20"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

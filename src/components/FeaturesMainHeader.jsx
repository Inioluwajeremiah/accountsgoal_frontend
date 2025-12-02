import React, { useState, useEffect, useRef } from "react";
import profilePicture from "../assets/profilePicture.svg";
import angleDown from "../assets/angleDown.svg";
import { useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import editUserIcon from "../assets/edituser.svg";
import calendarIcon from "../assets/calendar.svg";
import { useGetAnOrganizationQuery } from "../store/organizationApiSlice";
import AngleRightIcon from "../icons/AngleRightIcon";
import AttachIcon from "../icons/AttachIcon";
import CreateOrganizationIcon from "../icons/CreateOrganizationIcon";
import { useNavigate } from "react-router-dom";
import InviteOthersModal from "./organization/InviteOthersModal";
import OrganisationProfileModal from "./organization/OrganisationProfileModal";
//import AiButton from "./calender/AiButton";
import EditOrganizationModal from "./organization/EditOrganizationModal";

import CalendarScreen from "../screens/Calendar";
import EditProfileModal from "./profile/EditProfileModal";
import { useGetUserQuery } from "../store/authApi";
import axios from "axios";
import { BASE_URL } from "../utils/Endpoints";

const FeaturesMainHeader = ({
  handleSearch,
  ai,
  map,
  placeHolderText,
  showFilter,
  showFilterIcon,
  handleFilterPriority,
}) => {
  const navigate = useNavigate();
  const [inviteLoad, setInviteLoad] = useState(false);
  const [getInvitedUserData, setGetInvitedUserData] = useState(null);
  const { accountsGoalUser: invitedUserfromLocalStorage } = useSelector(
    (state) => state.auth
  );

  const getInvitedUser = async () => {
    try {
      setInviteLoad(true);
      const res = await axios.get(
        `${BASE_URL}getuser-under-organization/${invitedUserfromLocalStorage.organizationId}/${invitedUserfromLocalStorage.userId}/${invitedUserfromLocalStorage._id}`
      );
      if (res) {
        console.log(res.data, "innnnnnvvvv");
        setGetInvitedUserData(res?.data[0]);
      }
      setInviteLoad(false);
    } catch (error) {
      setInviteLoad(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getInvitedUser();
  }, []);

  const {
    data: accountsGoalUser,
    isLoading,
    isError,
    error,
  } = useGetUserQuery();
  const [toggleMenuModal, setToggleMenuModal] = useState(false);
  const [toggleCalenderModal, setToggleCalenderModal] = useState(false);
  const [toggleSendInviteModal, setToggleSendInviteModal] = useState(false);
  const [toggleOrgProfileModal, setToggleOrgProfileModal] = useState(false);
  const [toggleEditOrgProfileModal, setToggleEditOrgProfileModal] =
    useState(false);
  const [toggleEditProfileModal, setToggleEditProfileModal] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);

  const handleScheduleMeeting = () => {
    setShowCalendar(!showCalendar);
  };

  const onFilterClick = () => {
    console.log("Filter button clicked");
  };

  const handleToggleMenu = () => {
    setToggleMenuModal(!toggleMenuModal);
  };
  const {
    data: accountsGoalOrganisation,
    isLoading: loadingGetOrganisation,
    isError: isGetOrganisationError,
    error: getOrganisationError,
  } = useGetAnOrganizationQuery({
    userId: accountsGoalUser
      ? accountsGoalUser?._id
      : inviteLoad
      ? "loading"
      : getInvitedUserData && getInvitedUserData?.userId?._id,
  });

  // console.log("accountsGoalOrganisation ==> ", accountsGoalUser?._id);

  const handleToggleSendInviteModal = () => {
    setToggleSendInviteModal(!toggleSendInviteModal);
  };

  const handleToggleOrgProfileModal = () => {
    setToggleOrgProfileModal(!toggleOrgProfileModal);
  };

  const handleToggleEditProfile = () => {
    setToggleEditOrgProfileModal(!toggleEditOrgProfileModal);
  };

  const handleToggleEditUserProfile = () => {
    setToggleEditProfileModal(!toggleEditProfileModal);
  };

  const handleCloseOrganisationProfileButton = () => {
    // handleToggleEditProfile();
    setToggleMenuModal(false);
  };
  // ai and map are boolean types
  const handleFilterClick = () => {
    handleToggleEditProfile();
    // handleToggleFilter();
  };

  const menuRef = useRef();
  // Function to check if the clicked area is outside of the component
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setToggleMenuModal(false);
    }
  };

  // Add the event listener when the component is mounted
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log("my picturweeeeeee", getInvitedUserData);

  const calendarRef = useRef();

  // Function to check if the clicked area is outside of the calendar component
  const handleCalendarClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
      //setToggleCalenderModal(false)
    }
  };

  // Add the event listener when the component is mounted
  useEffect(() => {
    document.addEventListener("mousedown", handleCalendarClickOutside);
    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleCalendarClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        ref={menuRef}
        
        // style={{ backgroundColor: "transparent", background: "none" }}
        className={` relative h-[50px] flex flex-row justify-between items-center`}
      >
        <SearchBox
          map={map}
          placeHolderText={placeHolderText}
          onChange={(e) => handleSearch(e.target.value)}
          //onFilterClick={handleToggleEditProfile}
          onFilterClick={handleFilterClick}
          handleFilterPriority={handleFilterPriority}
          showFilter={showFilterIcon}
        />

        <div ref={calendarRef}
          className={` h-[50px] flex flex-row rounded-full justify-between items-center`}
        >
          {/* {showCalendar && <CalendarScreen />} */}
          {showCalendar && (
            <div >
              <CalendarScreen />
            </div>
          )}
          <div className="flex flex-row items-center bg-none">
            <button
              className=" text-white font-inter rounded-full px-6 py-2 my-4 text-lg"
              onClick={handleScheduleMeeting}
              style={{ backgroundColor: "#6787E7", color: "white" }}
            >
              Schedule Meeting
            </button>
          </div>
          {ai && <AiButton />}
          <img
            src={
              accountsGoalUser
                ? accountsGoalUser?.profileImage
                : getInvitedUserData && getInvitedUserData?.profileImage
            }
            alt="user picture"
            className="w-14 h-14 rounded-full mr-1 ml-6"
          />
          <button onClick={handleToggleMenu} className="py-3 pl-4">
            <img src={angleDown} alt="drop down icon" />
          </button>
        </div>

        {toggleMenuModal && (
          <div className="w-[70%] sm:w-[60%] md:w-[50%] lg:w-[30%] absolute z-10 flex flex-col items-start justify-start right-10 top-16 bg-white rounded-xl py-6 shadow-md">
            <button
              className="flex flex-row items-center mx-6 "
              onClick={handleToggleEditUserProfile}
            >
              <img src={editUserIcon} alt="Edit profile icon" />
              <p className="text-lg text-[#777777] ml-4">Edit profile</p>
            </button>

            <p className="font-black text-lg mt-10 mx-6">Connect your mail</p>

            <button className="flex flex-row items-center mt-4 mx-6">
              <img src={calendarIcon} alt="calendar icon" />
              <p className="text-lg ml-4 text-start overflow-x-auto">
                {accountsGoalUser
                  ? accountsGoalUser?.email
                  : getInvitedUserData && getInvitedUserData?.email}
              </p>
            </button>
            {/* create organisation || organisation name  */}
            {!loadingGetOrganisation &&
            accountsGoalOrganisation &&
            accountsGoalOrganisation?.organization.length > 0 ? (
              <button
                className="w-full flex flex-row items-center justify-between mt-12 mx-6"
                onClick={handleToggleOrgProfileModal}
              >
                <p className="font-bold text-lg text-start">
                  {accountsGoalOrganisation &&
                    accountsGoalOrganisation?.organization &&
                    accountsGoalOrganisation?.organization[0]?.companyName}

                  <small className="text-xs text-start rounded-2xl ml-2  px-2 py-1 bg-[#FFA500] text-white">
                    Organisation
                  </small>
                </p>

                <AngleRightIcon />
              </button>
            ) : (
              <button
                className="w-full flex flex-row bg-[#ECF0FC] mt-12 h-14 items-center px-5"
                onClick={() => navigate("/dashboard/create-organization")}
              >
                <CreateOrganizationIcon isActive={true} />
                <p className=" text-black text-lg ml-4">Create Organisation</p>
              </button>
            )}
            {/* attach invite - toggles sendInvite modal   */}
            <button
              className={`w-full flex flex-row bg-[#ECF0FC] mt-4 h-14 items-center px-5 ${
                getInvitedUserData && "hidden"
              }`}
              onClick={handleToggleSendInviteModal}
            >
              <AttachIcon color={"#000"} />
              <p className="text-black text-lg ml-4">Invite members</p>
            </button>
          </div>
        )}

        {/* show invite others modal */}
        {toggleSendInviteModal && (
          <InviteOthersModal
            handleBackButton={handleToggleSendInviteModal}
            handleCloseButton={handleToggleMenu}
          />
        )}

        {/* show org profile modal */}
        {toggleOrgProfileModal && (
          <OrganisationProfileModal
            handleBackButton={handleToggleOrgProfileModal}
            handleCloseButton={() => setToggleMenuModal(false)}
          />
        )}

        {/* show Edit Profile  */}
        {toggleEditOrgProfileModal && (
          <EditOrganizationModal
            handleBackButton={handleToggleEditProfile}
            handleCloseButton={handleCloseOrganisationProfileButton}
            accountsGoalOrganisation={accountsGoalOrganisation}
          />
        )}
      </div>
      {/* show Edit org Profile */}
      {toggleEditOrgProfileModal && (
        <EditOrganizationModal
          handleBackButton={handleToggleEditProfile}
          handleCloseButton={handleCloseOrganisationProfileButton}
          accountsGoalOrganisation={accountsGoalOrganisation}
        />
      )}

      {/* show Edit org Profile */}
      {toggleEditProfileModal && (
        <EditProfileModal
          handleBackButton={handleToggleEditUserProfile}
          handleCloseButton={handleCloseOrganisationProfileButton}
          accountsGoalOrganisation={accountsGoalOrganisation}
          getInvitedUserData={getInvitedUserData}
        />
      )}
    </div>
  );
};

export default FeaturesMainHeader;

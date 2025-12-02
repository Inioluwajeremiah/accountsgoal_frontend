import React, { useEffect, useState } from "react";
import FeaturesHeader from "../FeaturesHeader";
import LoadingAnimation2 from "../LoadingAnimation2";
import LoadingAnimation from "../LoadingAnimation";
import DropDownAlert from "../DropDownAlert";
import EditOrganizationModal from "./EditOrganizationModal";
import {
  useDeactivateOrganizationMutation,
  useGetAnOrganizationQuery,
  useLeaveOrganizationMutation,
  useRemindUserMutation,
  useRemoveUserFromOrganizationMutation,
} from "../../store/organizationApiSlice";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../store/authApi";
import DeactivateOrganizationModalDialog from "./DeactivateOrganizationModalDialog";
import RemindOrganizationModalDialog from "./RemindOrganizationModalDialog";
import RemoveOrganizationModalDialog from "./RemoveOrganizationModalDialog";
import LeaveOrganizationModalDialog from "./LeaveOrganizationModalDialog";
//import DropDownAlert from "../DropDownAlert";
import { BASE_URL, BaseUrl } from "../../utils/Endpoints";
import axios from "axios";

const OrganisationProfileModal = ({ handleBackButton, handleCloseButton }) => {
  const [getInvitedUserData, setGetInvitedUserData] = useState(null);
  const { accountsGoalUser: invitedUserfromLocalStorage } = useSelector(
    (state) => state.auth
  );

  const getInvitedUser = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}getuser-under-organization/${invitedUserfromLocalStorage.organizationId}/${invitedUserfromLocalStorage.userId}/${invitedUserfromLocalStorage._id}`
      );
      if (res) {
        console.log(res.data, "innnnnnvvvv");
        setGetInvitedUserData(res?.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvitedUser();
  }, []);

  // console.log("goallll", getInvitedUserData);
  const {
    data: accountsGoalUser,
    isLoading,
    isError,
    error,
  } = useGetUserQuery();

  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeactivateAlert, setShowDeactivateAlert] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const [showRemindModal, setShowRemindModal] = useState(false);
  const [showRemindAlert, setShowRemindAlert] = useState(false);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showLeaveAlert, setShowLeaveAlert] = useState(false);

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [toggleEditOrgProfileModal, setToggleEditOrgProfileModal] =
    useState(false);
  const {
    data: accountsGoalOrganisation,
    isLoading: loadingGetOrganisation,
    isError: isGetOrganisationError,
    error: getOrganisationError,
  } = useGetAnOrganizationQuery({
    userId: accountsGoalUser
      ? accountsGoalUser?._id
      : getInvitedUserData && getInvitedUserData?.userId?._id,
  });

  // console.log("lllllllllllll22", accountsGoalOrganisation);

  const [
    deactivateOrganization,
    { isLoading: loadingDeactivate, error: deactivateError },
  ] = useDeactivateOrganizationMutation();

  const [
    leaveOrganization,
    {
      isLoading: loadingleaveOrganization,
      error: leaveOrganizationError,
      isError: isleaveOrganizationError,
      isSuccess: isLeaveOrganisationSuccess,
      success: leaveOrganizationSucess,
    },
  ] = useLeaveOrganizationMutation();

  const [
    remindUser,
    {
      isLoading: loadingRemindUser,
      error: remindUserError,
      isError: isRemindUserError,
      isSuccess: isRemindUserSuccess,
      success: remindUserSucess,
    },
  ] = useRemindUserMutation();

  const [
    removeUserFromOrganization,
    {
      isLoading: loadingRemoveUser,
      error: removeUserError,
      isError: isRemoveUserError,
      isSuccess: isRemoveUserSuccess,
      success: removeUserSucess,
    },
  ] = useRemoveUserFromOrganizationMutation();

  const accountsgoalUserId = accountsGoalUser && accountsGoalUser?._id;
  const accountsgoalInvitedUserId =
    getInvitedUserData && getInvitedUserData?.userId?._id;

  const isAdmin =
    accountsGoalUser &&
    accountsGoalOrganisation?.organization[0]?.userId === accountsgoalUserId
      ? true
      : false;
  // const isAdmin =
  //   accountsGoalOrganisation &&
  //   accountsGoalOrganisation?.organization[0]?.userId === accountsgoalUserId
  //     ? true
  //     : accountsGoalOrganisation?.organization[0]?.userId ===
  //       accountsgoalInvitedUserId
  //     ? true
  //     : false;

  // const isAdmin = false;

  console.log("isAdmin ==> ", isAdmin);

  // console.log("accountsGoalusr ==> ", typeof accountsGoalUser._id);

  const isInvitedUser =
    !isAdmin &&
    accountsGoalOrganisation?.organization[0]?.invitedUsers.some((user) =>
      user.email === accountsGoalUser
        ? accountsGoalUser?.email && user.status === "Accepted"
        : getInvitedUserData &&
          getInvitedUserData?.email &&
          user.status === "Accepted"
    );

  console.log("isInvitedUser", accountsGoalUser);

  const handleToggleEditOrgProfileModal = () => {
    setToggleEditOrgProfileModal(!toggleEditOrgProfileModal);
  };

  const handleCloseOrganisationProfileButton = () => {
    handleCloseButton();
    handleBackButton();
  };

  const handleSaveChanges = () => {
    handleCloseOrganisationProfileButton();
  };

  /*const handleDeactivateOrganisation = async () => {
    const response = await deactivateOrganization({
      userId: accountsGoalOrganisation?.organization[0]?._id,
    });
    console.log(response);
  };*/

  const handleDeactivateOrganisation = () => {
    if (!isAdmin) {
      console.log("Only an admin can deactivate an organization.");
      return;
    }

    // Check that accountsGoalOrganisation and accountsGoalOrganisation.organization[0] are defined
    if (
      !accountsGoalOrganisation ||
      !accountsGoalOrganisation.organization[0]
    ) {
      console.log("Organization data is not loaded yet");
      return;
    }

    setShowDeactivateModal(true);
  };

  const confirmDeactivateOrganisation = async () => {
    if (!accountsGoalOrganisation?.organization[0]) {
      console.log("Organization is not defined");
      return;
    }

    const response = await deactivateOrganization({
      userId: accountsGoalOrganisation.organization[0]._id,
    });
    console.log(response);

    setShowDeactivateModal(false);
    setShowDeactivateAlert(true);
    setTimeout(() => setShowDeactivateAlert(false), 2000);
  };

  /*const handleLeaveOrganisation = async (email) => {
    const response = await leaveOrganization({ userEmail: email });
    console.log("leave organisation response ==> ", response);
  };*/

  const handleLeaveOrganisation = async () => {
    try {
      const response = await leaveOrganization({
        userEmail: accountsGoalUser?.email || getInvitedUserData?.email,
        organizationId: accountsGoalOrganisation?.organization[0]?._id,
      });
      console.log("leave organisation response ==> ", response);
      setShowLeaveModal(false);
      setShowLeaveAlert(true);
      setTimeout(() => {
        setShowLeaveAlert(false);
        handleCloseOrganisationProfileButton();
        localStorage.clear();
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error leaving organization:", error);
      // Handle error (e.g., show an error alert)
    }
  };

  // const handleRemindUser = async (email) =>
  //   {
  //   const organizationId = accountsGoalOrganisation?.organization[0]?._id;
  //   console.log("Organization ID: ", organizationId); // Add this line
  //   if (!organizationId) {
  //     console.log("Organization ID is not defined");
  //     return;
  //   }
  //   const response = await remindUser({
  //     organizationId,
  //     userEmail: email,
  //     userId: accountsGoalUser?._id,
  //   });
  //   console.log("remind user response ==> ", response);
  // };

  const handleRemindUser = async (email) => {
    try {
      const organizationId = accountsGoalOrganisation?.organization[0]?._id;
      const userId = accountsGoalUser?._id;
      const response = await axios.post(
        `${BASE_URL}remindUser/${organizationId}/${userId}`,
        {
          userEmail: email,
        }
      );
      if (response) {
        console.log("remind user response ==> ", response);
        setShowRemindModal(false);
        setShowRemindAlert(true);
        setTimeout(() => setShowRemindAlert(false), 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //

  const handleRemoveUser = async (email) => {
    const organizationId = accountsGoalOrganisation?.organization[0]?._id;
    if (!organizationId) {
      console.log("Organization ID is not defined");
      return;
    }
    const response = await removeUserFromOrganization({
      userId: organizationId,
      userEmail: email,
    });
    console.log("remove user from organisation response ==> ", response);
    setShowRemoveModal(false);
    setShowRemoveAlert(true);
    setTimeout(() => setShowRemoveAlert(false), 2000);
  };

  /*const handleRemoveUser = async (email) => {
    const response = await removeUserFromOrganization({
      organizationId: accountsGoalOrganisation?.organization[0]?._id,
      userEmail: email,
    });
    console.log("remove user from organisation response ==> ", response);
    setShowRemoveModal(false);
      setShowRemoveAlert(true);
      setTimeout(() => setShowRemoveAlert(false), 2000);
      
  };*/

  useEffect(() => {
    if (showAlertModal === true) {
      setTimeout(() => {
        setShowAlertModal(false);
      }, 3000);
    }
  });

  return (
    <>
      <div
        className={`md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start pt-6 rounded-t-3xl md:rounded-none  overflow-scroll`}
      >
        <div className="w-full h-full mx-auto flex flex-col justify-between  bg-white px-10 py-12 rounded-3xl ">
          <div className="flex flex-col justify-start mb-20 ">
            <FeaturesHeader
              title="Organisation Profile"
              handleBackButton={handleBackButton}
              handleCloseButton={handleCloseOrganisationProfileButton}
              dontShowHeader={false}
            />
            {isAdmin && (
              <div
                className={`flex flex-row items-center self-end mt-8 ${
                  getInvitedUserData && "hidden"
                }`}
              >
                {/* edit profile */}
                <button onClick={handleToggleEditOrgProfileModal}>
                  <p className="text-x text-[#A8A8A8] border-r border-r-[#A8A8A8] pr-4">
                    Edit profile
                  </p>
                </button>
                {/*<button>
                  {/* generate link 
                  <p className="text-primary-color text-xs ml-4">
                    Generate link
                  </p>
                </button>*/}
              </div>
            )}

            {/* view 1 */}
            <div>
              <p className="text-base font-bold text-black  mt-12">
                {accountsGoalOrganisation?.organization[0]?.companyName}
              </p>
              <p className="text-xs text-[#5C5C5C] mt-2">Organisation name</p>
              <p className="text-base font-bold text-black mt-10 ">
                {accountsGoalOrganisation?.organization[0]?.companySize}
              </p>
              <p className="text-xs text-[#5C5C5C] mt-2">Company Size</p>
              <p className="text-base font-bold text-black mt-10">
                {accountsGoalOrganisation?.organization[0]?.companyType}
              </p>
              <p className="text-xs text-[#5C5C5C] mt-2">Company Type</p>
            </div>
            {/* view 2 */}
            <div>
              <p className="text-base font-bold mt-16 mb-4">
                Organisation members
              </p>
              {accountsGoalOrganisation?.organization[0]?.invitedUsers?.map(
                (item, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-row items-center mb-4 "
                  >
                    <p className="mr-2 w-[5%] text-primary-accent-color text-sm">
                      {index + 1}.
                    </p>
                    <div className=" w-[70%] flex flex-row items-center ">
                      <p className="text-primary-accent-color text-sm">
                        {item.email}
                      </p>
                      <p
                        className={`ml-2 text-[10px] px-2 py-1 text-white rounded-2xl ${
                          item.status === "Pending"
                            ? "bg-primary-accent-color"
                            : item.status === "Accepted"
                            ? "bg-[#89CB69]"
                            : item.status === "Admin"
                            ? "bg-[#FFA500]"
                            : ""
                        } ${getInvitedUserData && "hidden"}`}
                      >
                        {item.status}
                      </p>
                    </div>

                    {/* perform action on members */}
                    <button
                      className="ml-4 w-[15%] flex items-end"
                      onClick={
                        item.status === "Accepted" && !isAdmin
                          ? () => setShowLeaveModal(true)
                          : //? () => handleLeaveOrganisation(item.email)
                          item.status === "Accepted" && isAdmin
                          ? // ? () => handleRemoveUser(item.email)
                            () => {
                              setSelectedEmail(item.email);
                              setShowRemoveModal(true);
                            }
                          : item.status === "Pending" && isAdmin
                          ? // ? () => handleRemindUser(item.email)
                            () => {
                              setSelectedEmail(item.email);
                              setShowRemindModal(true);
                            }
                          : null
                      }
                    >
                      <p
                        className={`text-xs ${
                          item.status === "Accepted" && !isAdmin
                            ? "text-[#F13535]"
                            : item.status === "Accepted" && isAdmin
                            ? "text-[#F13535] "
                            : item.status === "Pending" && isAdmin
                            ? "text-primary-accent-color "
                            : ""
                        } ${getInvitedUserData && "hidden"}`}
                      >
                        {item.status === "Accepted" && !isAdmin
                          ? "Leave"
                          : item.status === "Accepted" && isAdmin
                          ? "Remove "
                          : item.status === "Pending" && isAdmin
                          ? "Remind "
                          : ""}
                      </p>
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
          {/* deactivate organisation button*/}

          {isAdmin ? (
            <button
              className={`${
                isAdmin ? "bg-red-500" : "bg-blue-500"
              } rounded-full mt-16 h-12 py-3 flx justify-center items-center mb-10 ${
                getInvitedUserData && "hidden"
              }`}
              onClick={
                isAdmin ? handleDeactivateOrganisation : handleSaveChanges
              }
            >
              <p className="text-center font-semibold text-white text-base">
                {isAdmin ? "Deactivate organization" : "Save changes"}
              </p>
            </button>
          ) : isInvitedUser ? (
            <button
              className="bg-blue-500 rounded-full mt-16 h-12 py-3 flex justify-center items-center mb-10"
              onClick={() => setShowLeaveModal(true)}
            >
              <p className="text-center font-semibold text-white text-base">
                Leave organization
              </p>
            </button>
          ) : null}

          {/*<button
            className={`
           
          ${
            isAdmin ? "bg-primary-color" : "bg-tomato-red"
          } rounded-full mt-16 h-12 py-3 flx justify-center items-center mb-10`}
            onClick={isAdmin ? handleSaveChanges : handleDeactivateOrganisation}
          >
            <p className="text-center font-semibold text-white text-base">
              {isAdmin ? "Save changes" : "Deactivate organization"}
            </p>
          </button> */}
        </div>
        {loadingDeactivate && <LoadingAnimation loading={loadingDeactivate} />}
        {/* alert */}
        {showAlertModal && (
          <DropDownAlert
            showAlertModal={showAlertModal}
            message={"Organization updated"}
            type={"success"}
          />
        )}
      </div>
      {/* show edit org profile modal*/}
      {toggleEditOrgProfileModal && (
        <EditOrganizationModal
          handleBackButton={handleToggleEditOrgProfileModal}
          handleCloseButton={handleCloseOrganisationProfileButton}
          accountsGoalOrganisation={accountsGoalOrganisation}
        />
      )}

      {showRemindModal && (
        <RemindOrganizationModalDialog
          title="Remind Organization User"
          subTitle="Are you sure you want to send reminder to this user?"
          // handleConfirm={handleRemindUser}
          handleConfirm={() => handleRemindUser(selectedEmail)}
          handleCancel={() => setShowRemindModal(false)}
        />
      )}
      {showRemindAlert && (
        <DropDownAlert
          showAlertModal={showRemindAlert}
          message={"Reminder Sent Succesfully "}
          type={"success"}
        />
      )}

      {showRemoveModal && (
        <RemoveOrganizationModalDialog
          title="Remove Organization User"
          subTitle="Are you sure you want to remove this user?"
          // handleConfirm={handleRemindUser}
          handleConfirm={() => handleRemoveUser(selectedEmail)}
          handleCancel={() => setShowRemoveModal(false)}
        />
      )}
      {showRemoveAlert && (
        <DropDownAlert
          showAlertModal={showRemoveAlert}
          message={"User Removed Succesfully "}
          type={"success"}
        />
      )}

      {showDeactivateModal && (
        <DeactivateOrganizationModalDialog
          title="Deactivate Organization"
          subTitle="Are you sure you want to deactivate this organization?"
          handleConfirm={confirmDeactivateOrganisation}
          handleCancel={() => setShowDeactivateModal(false)}
        />
      )}
      {showDeactivateAlert && (
        <DropDownAlert
          showAlertModal={showDeactivateAlert}
          message={"Organization deactivated successfully "}
          type={"success"}
        />
      )}

      {showLeaveModal && (
        <LeaveOrganizationModalDialog
          title="Leave Organization"
          subTitle="Are you sure you want to leave this organization?"
          handleConfirm={handleLeaveOrganisation}
          handleCancel={() => setShowLeaveModal(false)}
        />
      )}
      {showLeaveAlert && (
        <DropDownAlert
          showAlertModal={showLeaveAlert}
          message={"Organization left successfully "}
          type={"success"}
        />
      )}
    </>
  );
};

export default OrganisationProfileModal;

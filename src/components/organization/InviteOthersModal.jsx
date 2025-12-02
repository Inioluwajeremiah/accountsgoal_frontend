import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import LabelField from "../forms/LabelField";
import TextInputField from "../forms/TextInputField";
import Loading from "../Loading";
import {
  useAddMemberMutation,
  useCreateAnOrganizationMutation,
  useCreateOrganizationAndSkipInviteMutationMutation,
  useGetAnOrganizationQuery,
} from "../../store/organizationApiSlice";
import CreateFeatureButton from "../CreateFeatureButton";
import LoadingAnimation from "../LoadingAnimation";
import FeaturesHeader from "../FeaturesHeader";
import { useGetUserQuery } from "../../store/authApi";
import DropDownAlert from "../DropDownAlert";
import axios from "axios";
import { BASE_URL } from "../../utils/Endpoints";
import isValidEmail from "../../utils/validateEmail";

const InviteOthersModal = ({
  organizatioParams,
  handleBackButton,
  handleCloseButton,
}) => {
  // const { accountsGoalUser } = useSelector((state) => state.auth);
  const {
    data: accountsGoalUser,
    isLoading,
    isError,
    error,
  } = useGetUserQuery();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [members, addMembers] = useState([{}]);
  const [showInviteCreatedAlert, setShowInviteCreatedAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  // console.log("handleSendInvite ==> ", organizatioParams);

  const handleCloseInviteMemberButton = () => {
    handleBackButton();
    handleCloseButton();
  };

  const [
    createAnOrganization,
    { isLoading: laodingCreateOrganization, error: errorCreatingOrganization },
  ] = useCreateAnOrganizationMutation();
  const [
    createOrganizationAndSkipInviteMutation,
    { isLoading: laodingSkipInvite, error: errorSkippingInvite },
  ] = useCreateOrganizationAndSkipInviteMutationMutation();

  const {
    data: accountsGoalOrganisation,
    isLoading: loadingGetOrganisation,
    isError: isGetOrganisationError,
    error: getOrganisationError,
  } = useGetAnOrganizationQuery({ userId: accountsGoalUser._id });

  const [
    addMember,
    {
      isLoading: loadingAddMember,
      error: addMemberError,
      isError: isAddMemberError,
      isSuccess: isAdmemberSuccess,
      success: addMemberSucess,
    },
  ] = useAddMemberMutation();

  console.log("members  ===> ", members?.length);
  // console.log("acg user data   ===> ", accountsGoalOrganisation);

  const handleAddMembersButton = () => {
    addMembers((preVItem) => [...preVItem, {}]);
  };

  const handleAddMembers = (evt, index) => {
    const item = evt.target.value;
    addMembers((prevMembers) => {
      prevMembers[index] = item;
      // prevMembers[index] = "pending";
      return [...prevMembers];
    });
  };

  // const handleInvite = async()=>{
  //   try {
  //     const res = await axios.patch(`${BASE_URL}create-invite/${}`)
  //   } catch (error) {

  //   }
  // }

  const handleSendInvite = async () => {
    console.log("handleSendInvite called");
    try {
      const body = organizatioParams
        ? {
            user: accountsGoalUser._id,
            members: members,
            token: accountsGoalUser.token,
            ...organizatioParams,
          }
        : {
            user: accountsGoalUser._id,
            companyName: accountsGoalOrganisation?.organization[0]?.companyName,
            companyType: accountsGoalOrganisation?.organization[0]?.companyType,
            companySize: accountsGoalOrganisation?.organization[0]?.companySize,
            members: members,
            token: accountsGoalUser.token,
          };

      console.log("send organization body ===> ", body);

      const response = await createAnOrganization(body);
      console.log("send organization invite response ===> ", response);

      if (response.error) {
        setAlertType("danger");

        setAlertMessage(response?.error?.data?.msg);
        setShowInviteCreatedAlert(true);
      }

      if (response?.data) {
        setAlertType("success");
        setAlertMessage("Invite created successfully");
        setShowInviteCreatedAlert(true);

        setTimeout(() => setShowInviteCreatedAlert(false), 2000);
        console.log(data);
      }

      handleCloseInviteMemberButton();

      if (errorSkippingInvite) {
        alert(errorSkippingInvite.data.msg);
      }

      // if (response.error) {
      //   alert(response.error.data.msg);
      // }
    } catch (error) {
      console.log("catch error ===> ", error);
    }
  };

  // handle skip button
  const handleSkipInvite = async () => {
    try {
      const body = {
        user: accountsGoalUser._id,
        ...organizatioParams,
        members: [],
        token: accountsGoalUser.token,
      };
      const response = await createOrganizationAndSkipInviteMutation(body);

      if (response.error) {
        alert(response.error.data.msg);
      }
      if (response?.data) {
        console.log(
          "create organization response at skip invite ===> ",
          response
        );
        // dispatch(setAcgOrganisationData(response.data.organization));
        navigate("/createOrganizationSuccessAlert");
      }
    } catch (error) {
      console.log("catch error ===> ", error);
    }
  };

  // send invite to new members
  const handleAddNewMembers = async () => {
    try {
      // const new_members = members.map((item, index) => item.email);
      const response = await addMember({
        userId: accountsGoalUser._id,
        members: members,
        organizationId: accountsGoalOrganisation?.organization[0]?._id,
      });

      console.log("add new members response ==> ", response);

      // if (response.data.status === "SUCCESS") {
      //   alert(response.data.message);
      // }

      if (response?.data) {
        setAlertType("success");
        setAlertMessage("Invite created successfully");
        setShowInviteCreatedAlert(true);

        setTimeout(() => {
          handleCloseInviteMemberButton();
        }, 1000);
        console.log("add new members response ==> ", response);
      }
      if (response?.error) {
        setAlertType("danger");
        setAlertMessage(response?.error?.data?.msg);
        setShowInviteCreatedAlert(true);
      }
    } catch (error) {
      setShowInviteCreatedAlert(false);

      console.log(error);
    }
  };

  useEffect(() => {
    if (showInviteCreatedAlert) {
      setTimeout(() => {
        setShowInviteCreatedAlert(false);
      }, 2000);
    }
  }, [showInviteCreatedAlert]);

  return (
    <div
      className={`md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start pt-6 rounded-t-3xl md:rounded-none  overflow-scroll`}
    >
      <div className="w-full h-full mx-auto flex flex-col justify-between  bg-white px-10 py-12 rounded-3xl ">
        <div className="flex flex-col justify-start mb-20 ">
          <FeaturesHeader
            title="Invite Members"
            handleBackButton={handleBackButton}
            handleCloseButton={handleCloseInviteMemberButton}
            dontShowHeader={false}
          />

          {/* generate link */}
          {/*<button className="w-full">
            <p className="text-base text-primary-color mt-10 text-end">
              Generate link
            </p>
          </button>*/}

          <div className="w-[80%] mx-auto">
            {/* form fields */}
            <div className="relative">
              <LabelField labelTitle={"Add members"} required={false} />
              {members.map((item, index) => (
                <TextInputField
                  key={index}
                  placeholder="example@useremail.com"
                  value={item.title}
                  // cursorColor={"#B9B9B9"}
                  // placeholderTextColor={"#B9B9B9"}
                  className={` w-full h-12 text-black 
                border border-border-color 
                rounded-3xl px-6 py-3 mt-4 text-sm `}
                  onChange={(e) => handleAddMembers(e, index)}
                />
              ))}

              {/*  add members */}
              <div className="w-full flex flex-row items-center justify-end mt-10 ">
                {/* add members */}
                <button
                  className="flex flex-row items-center "
                  onClick={handleAddMembersButton}
                >
                  <div className="h-4 w-4 rounded-full border border-[#FFA500]">
                    <p className="text-[10px] font-bold text-[#FFA500] text-center">
                      +
                    </p>
                  </div>
                  <p className="text-sm font-medium text-[#FFA500] ml-2">
                    Add more members
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <CreateFeatureButton
          title={"Send Invitation"}
          handleClick={
            organizatioParams ? handleSendInvite : handleAddNewMembers
          }
          isIcon={false}
          // if email is not valid set disable button to true : false
          isValidForm={isValidEmail(members[0]) === false ? true : false}
        />

        {/* skip button */}
        {organizatioParams && (
          <button
            className="w-full flex justify-center items-center mt-10"
            onClick={handleSkipInvite}
          >
            <p className="text-center text-base text-[#777777]">
              {laodingSkipInvite ? <Loading /> : "Skip >>>"}
            </p>
          </button>
        )}

        {showInviteCreatedAlert && (
          <DropDownAlert
            showAlertModal={showInviteCreatedAlert}
            message={alertMessage}
            type={alertType}
          />
        )}
      </div>
      {/* {isAddMemberError && alert(JSON.stringify(addMemberError))} */}
      {laodingCreateOrganization && <LoadingAnimation />}
      {/* {errorCreatingOrganization &&
        alert(errorCreatingOrganization.data.msg)} */}
      {(laodingSkipInvite || laodingSkipInvite) && <LoadingAnimation />}
      {laodingCreateOrganization || (loadingAddMember && <LoadingAnimation />)}
      {/* {errorSkippingInvite && alert(errorSkippingInvite.data.msg)} */}
    </div>
  );
};

export default InviteOthersModal;

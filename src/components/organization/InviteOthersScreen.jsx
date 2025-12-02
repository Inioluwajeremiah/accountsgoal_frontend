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
import { useNavigate } from "react-router-dom";
import OrganizationSuccess from "./OrganizationSuccess";
import InvitationSent from "./InvitationSent";
import SkipOrganizationSuccess from "./SkipOrganizationSuccess";

const InviteOthersScreen = ({ organizatioParams }) => {
  const { accountsGoalUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [organizationSuccess, setOrganizationSuccess] = useState(false);
  const [skipOrganizationSuccess, setSkipOrganizationSuccess] = useState(false);
  const [invitationSuccess, setInvitationSuccess] = useState(false);
  const [skipInvitationSuccess, setSkipInvitationSuccess] = useState(false);

  const [members, addMembers] = useState([{}]);

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

  // console.log("errorCreatingOrganization   ===> ", errorCreatingOrganization);

  const handleAddMembersButton = () => {
    addMembers((preVItem) => [...preVItem, {}]);
  };

  const handleAddMembers = (evt, index) => {
    const item = evt.target.value;
    addMembers((prevMembers) => {
      prevMembers[index] = item;

      return [...prevMembers];
    });
  };

  console.log(accountsGoalUser._id);
  // send invite from  reate organisation or send invite directly from invite screen
  const handleSendInvite = async () => {
    console.log(
      "handleSendInvite clicked ===> ",
      members.slice(0, members.length - 1)
    );
    try {
      // proprties passed from create organisation
      const bodyFromorg = {
        user: accountsGoalUser?._id,
        ...organizatioParams,
        members: members,
        token: accountsGoalUser?.token,
      };
      console.log("send organization bodyFromorg ===> ", bodyFromorg);

      // properties fetched in invite screen
      const fromInviteScreen = {
        user: accountsGoalUser?._id,
        companyName: accountsGoalOrganisation?.organization[0]?.companyName,
        companyType: accountsGoalOrganisation?.organization[0]?.companyType,
        companySize: accountsGoalOrganisation?.organization[0]?.companySize,
        members: members,
        token: accountsGoalUser?.token,
      };
      const body = organizatioParams ? bodyFromorg : fromInviteScreen;

      console.log("send organization body ===> ", body);

      const response = await createAnOrganization(body);

      if (response.error) {
        alert(response.error?.data?.msg);
      }
      if (response?.data) {
        console.log("send organization invite response ===> ", response);

        if (organizatioParams) {
          setOrganizationSuccess(true);
          console.log("setOrganizationSuccess called");
        } else {
          setInvitationSuccess(true);
          console.log("setInvitationSuccess called");
        }
      }

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
        user: accountsGoalUser?._id,
        ...organizatioParams,
        // members: [],
        token: accountsGoalUser?.token,
      };
      const response = await createOrganizationAndSkipInviteMutation(body);

      if (response.error) {
        alert(response.error.data.msg);
      }
      /*if (response?.data) {
        // dispatch(setAcgOrganisationData(response.data.organization));
        // navigate("/dashboard/createOrganizationSuccessAlert");
        setOrganizationSuccess(true);
        navigate('/dashboard');
      }*/
      if (response?.data) {
        console.log(
          "create organization response at skip invite ===> ",
          response
        );
        if (organizatioParams) {
          setSkipInvitationSuccess(true);
          setSkipOrganizationSuccess(true);
          console.log("setSkipOrganizationSuccess called");
        } else {
          setSkipInvitationSuccess(true);
          console.log("setInvitationSuccess called");
        }
        // navigate("/dashboard");
      }
    } catch (error) {
      console.log("catch error ===> ", error);
    }
  };

  // send invite to new members
  const handleAddNewMembers = async () => {
    // const new_members = members.map((item, index) => item.email);
    const response = await addMember({
      userId: accountsGoalUser._id,
      members: members,
      organizationId: accountsGoalOrganisation?.organization[0]?._id,
    });

    if (response.data.status === "SUCCESS") {
      alert(response.data.message);
      setInvitationSuccess(true);
    }

    console.log("add new members response ==> ", response);
  };

  useEffect(() => {
    if (organizationSuccess === true) {
      setTimeout(() => {
        setOrganizationSuccess(false);
      }, 5000);
    }
    if (invitationSuccess === true) {
      setTimeout(() => {
        setInvitationSuccess(false);
      }, 5000);
    }

    if (skipInvitationSuccess === true) {
      setTimeout(() => {
        setSkipInvitationSuccess(false);
      }, 5000);
    }
  }, [organizationSuccess, invitationSuccess, skipInvitationSuccess]);

  return (
    <>
      {/* header */}
      <h1 className="text-xl text-black text-left font-bold font-inter">
        Invite others
      </h1>
      <p className="w-[60%] mt-4 text-sm text-[#5C5C5C]">
        Use email or generate a unique link to easily bring new members onboard
        and collaborate effectively.
      </p>
      {/* form fields */}
      <div className="w-[60%]  mx-auto md:mx-0 md:ml-[7%] mt-6  ">
        {/* generate link */}
        {/*<button className="w-full">
          <p className="text-base text-primary-color mt-10 text-end">
            Generate link
          </p>
        </button>*/}
        <div className="relative">
          <LabelField labelTitle={"Add members"} required={false} />
          {members.map((item, index) => (
            <TextInputField
              key={index}
              placeholder="example@useremail.com"
              value={item.title}
              className={` w-full h-12 text-black 
                border border-border-color 
                rounded-3xl px-6 py-3 mt-4 text-sm `}
              onChange={(e) => handleAddMembers(e, index)}
            />
          ))}

          {/* generate link and add members */}
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
      <br/>
      <div className="w-[76%]  mx-auto md:mx-0 mb-10 mt-10   ">
        <CreateFeatureButton
          title={"Send Invitation"}
          handleClick={
            organizatioParams ? handleSendInvite : handleAddNewMembers
          }
          isIcon={false}
          isValidForm={members.length > 0 ? false : true}
        />

        {/* skip button */}
        {organizatioParams && (
          <button
            className="w-full flex justify-center items-center mt-10"
            onClick={handleSkipInvite}
          >
            <div className="text-center text-base text-[#777777]">
              {laodingSkipInvite ? <Loading /> : "Skip >>>"}
            </div>
          </button>
        )}
      </div>
      {isAddMemberError && alert(JSON.stringify(addMemberError))}
      {laodingCreateOrganization && <LoadingAnimation />}
      {/* {errorCreatingOrganization &&
        alert(errorCreatingOrganization.data.msg)} */}
      {(laodingSkipInvite || laodingSkipInvite) && <LoadingAnimation />}
      {laodingCreateOrganization || (loadingAddMember && <LoadingAnimation />)}
      {/* {errorSkippingInvite && alert(errorSkippingInvite.data.msg)} */}
      {organizationSuccess && <OrganizationSuccess />}
      {invitationSuccess && <InvitationSent />}
      {skipInvitationSuccess && <SkipOrganizationSuccess />}
    </>
  );
};

export default InviteOthersScreen;

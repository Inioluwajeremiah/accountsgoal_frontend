import React, { useEffect, useState } from "react";
import FeaturesHeader from "../FeaturesHeader";
import CreateFeatureButton from "../CreateFeatureButton";
import LabelField from "../forms/LabelField";
import TextInputField from "../forms/TextInputField";
import { companySizeData, companyTypeData } from "../../utils/dummyData";
import CustomSelect from "../forms/CustomSelect";
import { useUpdateOrganizationMutation } from "../../store/organizationApiSlice";
import { useSelector } from "react-redux";
import DropDownAlert from "../DropDownAlert";
import { FiEye, FiEyeOff } from "react-icons/fi";

import LoadingAnimation2 from "../LoadingAnimation2";
import {
  useGetUserQuery,
  useUpdateUserPasswordMutation,
} from "../../store/authApi";
import UploadIcon from "../../../public/upload.png";
import { Link } from "react-router-dom";

const ChangePasswordModal = ({
  handleBackButton,
  handleCloseButton,
  accountsGoalOrganisation,
}) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const {
    data: accountsGoalUser,
    isLoading,
    isError,
    error,
  } = useGetUserQuery();
  console.log("accountsGoalOrganisation1 ==> ", accountsGoalOrganisation);
  // const [
  //   updateOrganization,
  //   { isSuccess, isLoading: loadingUpdate, error: updateError },
  // ] = useUpdateOrganizationMutation();

  const [
    updateUserPassword,
    {
      isSuccess,
      isLoading: loadingUpdate,
      isError: UpdatedErr,
      error: updateError,
    },
  ] = useUpdateUserPasswordMutation();

  const [toggleCompanyType, setToggleCompanyType] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdErr, setPwdErr] = useState(null);
  // const isValidForm = !fullName || !companyType;
  const [pwdSuccess, setPwdSucess] = useState(false);
  const handleCloseEditProfileButton = () => {
    handleCloseButton();
    handleBackButton();
  };
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [showPass3, setShowPass3] = useState(false);
  const handleToggleCompanyType = () => {
    setToggleCompanyType(!toggleCompanyType);
  };

  const handleSelectCompanyType = (value) => {
    setCompanyType(value);
    handleToggleCompanyType();
  };

  const handleSelectCompanySize = (value) => {
    setCompanySize(value);
  };

  const handleNextButton = async () => {
    try {
      if (password && oldPassword && !confirmPassword) {
        setPwdErr("Confirm password is required");
        console.log("errrr22222");
        return;
      }
      if (password !== confirmPassword) {
        setPwdErr("Password does not match");
        console.log("errrr");
        return;
      }
      const body = {
        password,
        oldPassword,
      };
      const response = await updateUserPassword(body);
      console.log("User response ===> ", response?.data);
      // setShowAlertModal(true);
      if (response && response?.data) {
        console.log("ddddddd", response?.data);
        if (isSuccess) {
          setShowAlertModal(true);
        }
        setPwdSucess("Password Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      if (error && UpdatedErr) {
        setPwdErr(updateError?.data?.msg);
      }
    }
  };
  console.log("isSuccess ==> ", updateError && pwdErr);
  console.log("isError ==> ", updateError?.data?.msg);

  useEffect(() => {
    if (showAlertModal === true) {
      setTimeout(() => {
        setShowAlertModal(false);
      }, 3000);
    }
  });
  useEffect(() => {
    setTimeout(() => {
      if (pwdSuccess) {
        handleCloseEditProfileButton();
      }
    }, 1000);
  }, [pwdSuccess]);
  return (
    <>
      <div
        className={`md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start pt- rounded-t-3xl md:rounded-none  overflow-scroll`}
      >
        <div className="w-full h-full mx-auto flex flex-col justify-between  bg-white px-10 py-4 rounded-3xl overflow-y-scroll">
          <div className="flex flex-col justify-start mb-1 ">
            <FeaturesHeader
              title=" Password Change "
              handleBackButton={handleBackButton}
              handleCloseButton={handleCloseEditProfileButton}
              dontShowHeader={false}
            />
            {pwdErr && (
              <p className="bg-[#B20000] mt-3 text-white font-dmSans py-2 px-3">
                {pwdErr}
              </p>
            )}
            {UpdatedErr && (
              <p className="bg-[#B20000] mt-3 text-white font-dmSans py-2 px-3">
                {`${updateError?.data?.msg}` ||
                  "Something went wrong and try again"}
              </p>
            )}
            {pwdSuccess && (
              <p className="bg-[#36A74A] mt-3 text-white font-dmSans py-2 px-3">
                {pwdSuccess}
              </p>
            )}
            {/* form fields */}
            <LabelField required={true} labelTitle={"Old Password"} />
            <div className="w-full flex items-center justify-between gap-x-2 max-h-12 h-12 border border-border-color rounded-full px-6 mt-4 focus:outline-none ">
              <input
                value={oldPassword}
                type={showPass ? "text" : "password"}
                onChange={(e) => setOldPassword(e.target.value)}
                className="bg-transparent outline-none border-none w-full"
              />
              {showPass ? (
                <FiEye
                  className="cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                />
              ) : (
                <FiEyeOff
                  className="cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                />
              )}
            </div>
            <LabelField required={true} labelTitle={"New Password"} />
            <div className="w-full flex items-center justify-between gap-x-2 max-h-12 h-12 border border-border-color rounded-full px-6 mt-4 focus:outline-none ">
              <input
                value={password}
                type={showPass2 ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none border-none w-full"
              />
              {showPass2 ? (
                <FiEye
                  className="cursor-pointer"
                  onClick={() => setShowPass2(!showPass2)}
                />
              ) : (
                <FiEyeOff
                  className="cursor-pointer"
                  onClick={() => setShowPass2(!showPass2)}
                />
              )}
            </div>
            <LabelField required={true} labelTitle={"Confirm New Password"} />
            <div className="w-full flex items-center justify-between gap-x-2 max-h-12 h-12 border border-border-color rounded-full px-6 mt-4 focus:outline-none ">
              <input
                value={confirmPassword}
                type={showPass3 ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-transparent outline-none border-none w-full"
              />
              {showPass3 ? (
                <FiEye
                  className="cursor-pointer"
                  onClick={() => setShowPass3(!showPass3)}
                />
              ) : (
                <FiEyeOff
                  className="cursor-pointer"
                  onClick={() => setShowPass3(!showPass3)}
                />
              )}
            </div>
          </div>

          <CreateFeatureButton
            title={"Next"}
            handleClick={handleNextButton}
            isIcon={false}
            // isValidForm={isValidForm}
          />
        </div>
      </div>
      {loadingUpdate && <LoadingAnimation2 loading={loadingUpdate} />}
      {/* alert */}
      {showAlertModal && (
        <DropDownAlert
          showAlertModal={showAlertModal}
          message={"User updated"}
          type={"success"}
        />
      )}
    </>
  );
};

export default ChangePasswordModal;

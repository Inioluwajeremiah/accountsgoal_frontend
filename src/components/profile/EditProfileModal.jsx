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
import LoadingAnimation2 from "../LoadingAnimation2";
import { useGetUserQuery, useUpdateUserMutation } from "../../store/authApi";
import UploadIcon from "../../../public/upload.png";
import { Link } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";
import axios from "axios";
import { BASE_URL } from "../../utils/Endpoints";

const EditProfileModal = ({
  handleBackButton,
  handleCloseButton,
  accountsGoalOrganisation,
  getInvitedUserData,
}) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showEditProfileAlert, setShowEditProfileAlert] = useState(false);
  const {
    data: accountsGoalUser,
    isLoading,
    isError,
    error,
  } = useGetUserQuery();

  // const [
  //   updateOrganization,
  //   { isSuccess, isLoading: loadingUpdate, error: updateError },
  // ] = useUpdateOrganizationMutation();

  const [
    updateUser,
    { isSuccess, isLoading: loadingUpdate, error: updateError },
  ] = useUpdateUserMutation();

  const [toggleCompanyType, setToggleCompanyType] = useState(false);
  const [email, setEmail] = useState(
    isLoading
      ? "loading"
      : accountsGoalUser
      ? accountsGoalUser?.email
      : loadingUpdate
      ? "loading"
      : getInvitedUserData
      ? getInvitedUserData?.email
      : ""
  );
  const [fullName, setFullName] = useState(
    isLoading
      ? "loading"
      : accountsGoalUser
      ? accountsGoalUser?.fullName
      : loadingUpdate
      ? "loading"
      : getInvitedUserData
      ? getInvitedUserData?.fullName
      : ""
  );
  const [mobile, setMobile] = useState(
    isLoading
      ? "loading"
      : accountsGoalUser
      ? accountsGoalUser?.mobile
      : loadingUpdate
      ? "loading"
      : getInvitedUserData
      ? getInvitedUserData?.mobile
      : ""
  );
  const [togglePasswordModal, setTogglePasswordModal] = useState(false);
  // const isValidForm = !fullName || !companyType;
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleCloseEditProfileButton = () => {
    handleCloseButton();
    handleBackButton();
  };

  const handleTogglePasswordModal = () => {
    setTogglePasswordModal(!togglePasswordModal);
  };
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
      const body = {
        fullName,
        mobile,
      };
      const response = await updateUser(body);
      // setShowAlertModal(true);
      if (response?.data) {
        // setShowAlertModal(true);
        // setFullName(response?.data?.fullName);
        // setMobile(response?.data?.mobile);

        setShowEditProfileAlert(true); // Show the edit alert
        setTimeout(() => setShowEditProfileAlert(false), 2000);
        console.log("User response ===> ", response?.data);
        if (getInvitedUserData) {
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
        // if (isSuccess) {
        //   setShowAlertModal(true);
        //   setFullName(response?.data?.fullName);
        //   setMobile(response?.data?.mobile);

        //   setShowEditProfileAlert(true); // Show the edit alert
        //   setTimeout(() => setShowEditProfileAlert(false), 2000);
        // }
      }
    } catch (error) {
      console.log("newerrr", error);
    }
  };

  const handleUpdateProfile = async (imageUrl) => {
    const body = {
      profileImage: imageUrl,
    };
    const response = await updateUser(body);
    // setShowAlertModal(true);
    if (response && response?.data) {
      // console.log("User response ===> ", response?.data);
      if (getInvitedUserData) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      if (isSuccess) {
        setShowAlertModal(true);
        setFullName(response?.data?.fullName);
        setMobile(response?.data?.mobile);
      }
    }
  };

  useEffect(() => {
    if (showEditProfileAlert === true) {
      setTimeout(() => {
        setShowEditProfileAlert(false);
        handleBackButton();
      }, 3000);
    }
  });

  // useEffect(() => {
  //   if (getInvitedUserData) {
  //     setEmail(getInvitedUserData?.email);
  //     setFullName(getInvitedUserData?.fullName);
  //     setMobile(getInvitedUserData?.mobile);
  //   }
  // }, [showAlertModal]);
  // console.log("isSuccess ==> ", isSuccess);
  // console.log("isError ==> ", updateError);

  useEffect(() => {
    if (showAlertModal === true) {
      setTimeout(() => {
        setShowAlertModal(false);
      }, 3000);
    }
  });

  // upload image to cloudinary
  // console.log("mmm", import.meta.env.VITE_cloudinary_upload_preset);
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append(
        "upload_preset",
        import.meta.env.VITE_cloudinary_upload_preset
      );
      data.append("cloud_name", import.meta.env.VITE_cloudinary_cloud_name);
      fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_cloudinary_cloud_name
        }/image/upload`,
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          handleUpdateProfile(data.secure_url);
          console.log("cloudddd", data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);
  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <>
      <div
        className={`md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start pt- rounded-t-3xl md:rounded-none  overflow-scroll`}
      >
        <div className="w-full h-full mx-auto flex flex-col justify-between  bg-white px-10 py-4 rounded-3xl ">
          <div className="flex flex-col justify-start mb-1 ">
            <FeaturesHeader
              title=" Profile Info"
              handleBackButton={handleBackButton}
              handleCloseButton={handleCloseEditProfileButton}
              dontShowHeader={false}
            />
            <div className="flex items-center gap-x-7">
              <div className="relative">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="w-16 h-24 rounded-full overflow-hidden">
                    <img
                      src={
                        accountsGoalUser
                          ? accountsGoalUser?.profileImage
                          : getInvitedUserData &&
                            getInvitedUserData?.profileImage
                      }
                      alt=""
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex items-center justify-center h-5 w-5 rounded-full absolute left-12 top-16 bg-[#FF5A00]">
                    <img src={UploadIcon} alt="" />
                  </div>
                </label>
                {/* Hidden file input */}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => updatePhoto(e.target.files[0])}
                  className="hidden"
                />
              </div>
              <div>
                <h3 className="font-inter font-semibold text-[16px]">
                  Update your Picture
                </h3>
                <h5 className="font-inter font-medium text-[#F35555] text-[16px]">
                  Upload a picture under 2 MB
                </h5>
                {/* <button
                  // onClick={handleUpload}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Upload
                </button> */}
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                onClick={handleTogglePasswordModal}
                className="text-[#4169E1] font-inter text-[14px]"
              >
                Change Password
              </Link>
            </div>
            {/* form fields */}
            <LabelField required={true} labelTitle={"Email"} />
            <input
              value={email}
              disabled
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full max-h-12 h-12 border border-border-color rounded-full px-6 mt-4 focus:outline-none "
            />

            <LabelField required={true} labelTitle={"Full Name"} />
            <TextInputField
              value={loadingUpdate ? "loading..." : fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <LabelField required={true} labelTitle={"Phone Number"} />
            <TextInputField
              value={loadingUpdate ? "loading..." : mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <CreateFeatureButton
            title={"Save"}
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

      {showEditProfileAlert && (
        <DropDownAlert
          showAlertModal={showEditProfileAlert}
          message={"Profile Updated Succesfully"}
          type={"success"}
        />
      )}

      {/* change password modal  */}
      {togglePasswordModal && (
        <ChangePasswordModal
          handleBackButton={handleTogglePasswordModal}
          handleCloseButton={handleCloseButton}
        />
      )}
    </>
  );
};

export default EditProfileModal;

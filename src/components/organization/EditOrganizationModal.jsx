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
//import DropDownAlert from "../DropDownAlert";

const EditOrganizationModal = ({
  handleBackButton,
  handleCloseButton,
  accountsGoalOrganisation,
}) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const { accountsGoalUser } = useSelector((state) => state.auth);
  const [showEditOrganizationAlert, setShowEditOrganizationAlert] =
    useState(false);
  console.log("accountsGoalOrganisation ==> ", accountsGoalOrganisation);
  const [
    updateOrganization,
    { isSuccess, isLoading: loadingUpdate, error: updateError },
  ] = useUpdateOrganizationMutation();

  const [toggleCompanyType, setToggleCompanyType] = useState(false);
  const [companyName, setCompanyName] = useState(
    accountsGoalOrganisation?.organization[0]?.companyName
  );
  const [companyType, setCompanyType] = useState(
    accountsGoalOrganisation?.organization[0]?.companyType
  );
  const [companySize, setCompanySize] = useState(
    accountsGoalOrganisation?.organization[0]?.companySize
  );

  const isValidForm = !companyName || !companyType;

  const handleCloseEditProfileButton = () => {
    handleCloseButton();
    handleBackButton();
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
        orgId: accountsGoalOrganisation?.organization[0]?._id,
        companyName,
        companyType,
        companySize,
      };
      const response = await updateOrganization(body);
      if (response?.data) {
        console.log("updated organization response ===> ", response);
        // setShowAlertModal(true);
        console.log("isSuccess ==> ", isSuccess);
        console.log("isError ==> ", updateError);
        // if (isSuccess) {
        //setShowAlertModal(true);
        setShowEditOrganizationAlert(true); // Show the edit alert
        setTimeout(() => setShowEditOrganizationAlert(false), 2000);
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showEditOrganizationAlert === true) {
      setTimeout(() => {
        setShowEditOrganizationAlert(false);
        handleBackButton();
      }, 3000);
    }
  });

  /*useEffect(() => {
    if (showAlertModal === true) {
      setTimeout(() => {
        setShowAlertModal(false);
      }, 3000);
    }
  });*/
  return (
    <>
      <div
        className={`md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start overflow-y-auto pt-6 rounded-t-3xl md:rounded-none  `}
      >
        <div className="w-full h-full mx-auto flex flex-col justify-between  bg-white px-10 py-12 rounded-3xl ">
          <div className="flex flex-col justify-start mb-2 ">
            <FeaturesHeader
              title="Edit Profile"
              handleBackButton={handleBackButton}
              handleCloseButton={handleCloseEditProfileButton}
              dontShowHeader={false}
            />
            {/* form fields */}

            <LabelField required={true} labelTitle={"Company Name"} />
            <TextInputField
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <LabelField required={true} labelTitle={"Organization Size"} />
            <div className="flex flex-row flex-wrap gap-4 mt-2 ">
              {companySizeData.map((item, index) => (
                <button
                  key={index}
                  className={`border ${
                    companySize === item
                      ? "border-black"
                      : "border-form-text-color"
                  } rounded-3xl p-3`}
                  onClick={() => handleSelectCompanySize(item)}
                >
                  <p className=" text-center text-xs ">{item}</p>
                </button>
              ))}
            </div>

            <LabelField required={true} labelTitle={"Company Type"} />

            <CustomSelect
              data={companyTypeData}
              handleSelectData={(e) => setCompanyType(e.target.value)}
              value={companyType}
            />
          </div>

          <CreateFeatureButton
            title={"Save"}
            handleClick={handleNextButton}
            isIcon={false}
            isValidForm={isValidForm}
          />
        </div>
      </div>

      {showEditOrganizationAlert && (
        <DropDownAlert
          showAlertModal={showEditOrganizationAlert}
          message={"Organization Profile Updated"}
          type={"success"}
        />
      )}
      {loadingUpdate && <LoadingAnimation2 loading={loadingUpdate} />}
      {/* alert */}

      {showEditOrganizationAlert && (
        <DropDownAlert
          showAlertModal={showEditOrganizationAlert}
          message={"Organization Profile Updated"}
          type={"success"}
        />
      )}

      {showAlertModal && (
        <DropDownAlert
          showAlertModal={showAlertModal}
          message={"Organization updated"}
          type={"success"}
        />
      )}
    </>
  );
};

export default EditOrganizationModal;

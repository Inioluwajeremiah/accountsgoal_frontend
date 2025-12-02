import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateSummaryMutation,
  useRemindMeLaterMutation,
  useUpdateColorMutation,
} from "../../store/summaryApiSlice";
import { BASE_URL } from "../../utils/Endpoints";
import DropDownAlert from "../DropDownAlert";
import LabelField from "../forms/LabelField";
import CaretDown from "../../icons/CaretDown";
import TextArea from "../forms/TextArea";
import Loading from "../Loading";
import FeaturesHeader from "../FeaturesHeader";
const summaryType = [
  { type: "Video call" },
  { type: "Audio call" },
  { type: "In-person" },
];

const InteractionModal = ({
  dontShowHeader,
  handleToggleInteractionModal,
  handleToggleCloseModal,
  uniqueId,
}) => {
  const { accountsGoalUser } = useSelector((state) => state.auth);
  const [summaryTitle, setSummaryTitle] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [toggleSummaryTypeModal, setToggleSummaryTypeModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const isValidForm = !summaryTitle || !summaryValue;

  const [
    createSummary,
    { isLoading: loadingCreateSummary, error: createSummaryError },
  ] = useCreateSummaryMutation();
  const [
    remindMeLater,
    { isLoading: loadingRemindmeLater, error: remindmeLaterError },
  ] = useRemindMeLaterMutation();
  const [
    updateColor,
    { isLoading: loadingUpdateColor, error: updateColorError },
  ] = useUpdateColorMutation();

  const handleToggleSummaryTypeModal = () => {
    setToggleSummaryTypeModal(!toggleSummaryTypeModal);
  };

  const handleCloseButton = () => {
    handleToggleCloseModal();
    handleToggleInteractionModal();
  };

  const updateColorStatus = () => {
    fetch(`${BASE_URL}update-color-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uniqueId: uniqueId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("update color status", data);
        // refetchExcelData();
      })
      .catch((err) => {
        console.log("get color error ==> ", err);
      });
  };

  // const updateColorStatus = () => {
  //   fetch(`${BASE_URL}update-color-status`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       uniqueId: uniqueId,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("update color status", data);
  //       // refetchExcelData();
  //     })

  //     .catch((err) => {
  //       console.log("get color error ==> ", err);
  //     });
  // };

  const handleCreateSummary = async () => {
    const response = await createSummary({
      uniqueId: uniqueId,
      userId: accountsGoalUser?._id,
      meetingType: summaryTitle,
      meetingContent: summaryValue,
    });
    if (response.data?.message === "Summary submitted and fields updated") {
      // updateColorStatus();
      setShowAlertModal(true);
      setAlertType("success");
      setAlertMessage("Summary submitted and fields updated");
    } else {
      setShowAlertModal(true);
      setAlertType("danger");
      setAlertMessage("Error submitting fields");
    }

    console.log("handleCreateSummary ==> ", response);
  };

  // initiate interaction will trigger create-button end point via
  //  useRemindMeLaterMutation hook

  const handleInitiateInteraction = async () => {
    const response = await remindMeLater({
      uniqueId: uniqueId,
      userId: accountsGoalUser?._id,
    });

    if (response.data?.message === "Button clicked") {
      // updateColorStatus();
      setShowAlertModal(true);
      setAlertType("success");
      setAlertMessage("Interaction initiated reminder will be sent afterwards");
    } else {
      setShowAlertModal(true);
      setAlertType("danger");
      setAlertMessage("Error initiating interaction");
    }

    console.log("handleInitiateInteraction ===> ", response);
  };

  useEffect(() => {
    if (showAlertModal === true) {
      setTimeout(() => {
        setShowAlertModal(false);
        if (alertType === "success") {
          // handleCloseButton();
        }
      }, 2000);
    }
  });

  return (
    <div
      className={`w-full md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start  rounded-t-3xl md:rounded-none overflow-y-scroll`}
    >
      <div className="relative w-full h-full mx-auto flex flex-col justify-between bg-white py-12 rounded-3xl overflow-y-scroll">
        <div className="px-5">
          <FeaturesHeader
            dontShowHeader={dontShowHeader}
            title={"Summary"}
            handleBackButton={handleToggleInteractionModal}
            handleCloseButton={handleCloseButton}
          />

          <div>
            <LabelField labelTitle={"Summary type"} required={true} />
            <button
              className={
                "w-full flex flex-row items-center border border-border-color rounded-full px-6 py-3 mt-4 h-12 justify-between"
              }
              onClick={handleToggleSummaryTypeModal}
            >
              <p className=" text-sm text-form-text-color">{summaryTitle}</p>
              <CaretDown color={"#D7D7D7"} />
            </button>
            {toggleSummaryTypeModal && (
              <div className="mt-4 flex flex-col items-start">
                {summaryType.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSummaryTitle(item.type);
                      handleToggleSummaryTypeModal();
                    }}
                  >
                    <p
                      className={` py-2 ${
                        summaryTitle === item.type
                          ? "text-black"
                          : "text-form-text-color"
                      }`}
                    >
                      {item.type}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {/* summary */}
            <LabelField labelTitle={"Summary"} required={true} />
            <TextArea
              value={summaryValue}
              onChange={(e) => setSummaryValue(e.target.value)}
              className="border text-start border-secondary-accent-color h-36 rounded-xl px-4 text-sm text-secondary-accent-color mt-2"
            />

            {/* create summary button */}

            <div className="flex flex-row items-center justify-between mt-8">
              {/* take an action button */}
              <button
                className={`w-[90%] ml-auto ${
                  !isValidForm ? "bg-primary-color" : "bg-[#6787e7]"
                } rounded-full mt-8 h-12 py-6 flex justify-center mr-6 items-center mb-10 `}
                disabled={isValidForm ? true : false}
                onClick={handleCreateSummary}
              >
                <div className="text-center font-semibold text-white text-base">
                  {loadingCreateSummary ? <Loading /> : <p>Save summary</p>}
                </div>
              </button>
              {/* cancel button */}
              {/*<button
                className={`w-[35%] h-12 bg-primary-color rounded-full mt-4 py-3 flex justify-center items-center mb-10  `}
                disabled={false}
                onClick={handleInitiateInteraction}
              >
               {/*} <div className="text-xs text-white-color">
                  {loadingRemindmeLater ? <Loading /> : <p>Remind me later</p>}
                </div>
              </button>*/}
            </div>
          </div>
        </div>

        {/* alert */}
        {showAlertModal && (
          <DropDownAlert
            showAlertModal={showAlertModal}
            message={alertMessage}
            type={alertType}
          />
        )}
      </div>
    </div>
  );
};

export default InteractionModal;

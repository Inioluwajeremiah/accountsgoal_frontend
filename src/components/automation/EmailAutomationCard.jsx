import React, { useEffect, useState } from "react";

import Loading from "../Loading";
import closeIcon from "../../assets/closeIcon.svg";
import TextInputField from "../forms/TextInputField";
import DropDownAlert from "../DropDownAlert";
import {
  useSendEmailDataMutation,
  useSendGreetingEmailMutation,
  useUpdateEmailDataMutation,
} from "../../store/emailApiSlice";
import { windowWidth } from "../../utils/Dimensions";
import EditEmail from "./EditEmail";
import ViewAutomatedEmail from "./ViewAutomatedEmail";

const EmailAutomationCard = ({
  item,
  index,
  lastIndex,
  isGreetingEmail,
  uniqueId,
  sendTo,
}) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [emailContent, setEmailContent] = useState(item?.content);

  const [
    sendEmailData,
    {
      isLoading: loadingSendEmail,
      isErrror: isErrorEmail,
      isSuccess: isSuccessEmail,
      error: sendEmailError,
    },
  ] = useSendEmailDataMutation();

  const [
    sendGreetingEmail,
    {
      isLoading: loadingSendGreetingEmail,
      isErrror: isErrorGreetingEmail,
      isSuccess: isSuccessGreetingEmail,
      error: sendGreetingEmailError,
    },
  ] = useSendGreetingEmailMutation();

  const [
    updateEmailData,
    { isLoading: loadingUpdate, isError, isSuccess, error },
  ] = useUpdateEmailDataMutation();

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };
  const handleToggleEditTodoModal = () => {
    setToggleEditModal(!toggleEditModal);
  };

  const handleSendEmail = async () => {
    console.log("email id ==> ", item?._id);
    const response = await sendEmailData({ emailDraftId: item?._id });
    console.log(response);
    if (response.data?.message === "Email sent successfully.") {
      setShowAlertModal(true);
      setAlertType("success");
      setAlertMessage("Email sent successfully");
      setToggleModal(false);
    } else {
      setShowAlertModal(true);
      setAlertType("danger");
      setAlertMessage("Error sending email");
    }
  };

  const handleSendGreetingEmail = async () => {
    console.log("email id ==> ", item?._id);
    const response = await sendGreetingEmail({
      emailDraftId: item?._id,
      uniqueId: uniqueId,
    });
    console.log(response);
    if (response.data?.message === "Email sent successfully.") {
      setShowAlertModal(true);
      setAlertType("success");
      setAlertMessage("Email sent successfully");
      setToggleModal(false);
    }
    if (response?.error) {
      setShowAlertModal(true);
      setAlertType("danger");
      setAlertMessage("Error sending email");
    }
  };
  const handleUpdateEmail = async () => {
    console.log("email id ==> ", item?._id);
    const response = await updateEmailData({
      emailId: item?._id,
      content: emailContent,
    });
    if (response.data?._id) {
      setShowAlertModal(true);
      setAlertType("success");
      setAlertMessage("Email updated and sent successfully");
      setToggleEditModal(false);
      setToggleModal(false);
    } else {
      setShowAlertModal(true);
      setAlertType("danger");
      setAlertMessage("Error updating email");
    }

    console.log("update email response", response);
  };

  useEffect(() => {
    if (showAlertModal === true) {
      setTimeout(() => {
        setShowAlertModal(false);
        setToggleEditModal(false);
      }, 2000);
    }
  });
  return (
    <>
      <div className="w-full mx-5 flex flex-row items-center justify-between">
        <button
          onClick={handleToggleModal}
          style={{ width: windowWidth * 0.9 }}
          className={` relative bg-white border-[#B9B9B9] border rounded-lg p-3  ${
            lastIndex === index ? "mb-20" : "mb-4"
          } `}
        >
          <p
            className={`font-bold text-secondary-accent-color text-sm my-1 text-start ${
              item.status === true && "line-through"
            }`}
          >
            {item?.subject}
          </p>

          {sendTo && (
            <p className="text-sm text-primary-accent-color text-start ">
              Send to: {item?.to}
            </p>
          )}

          <p className="text-sm text-primary-accent-color text-start">
            {item?.content && item?.content.length > 150
              ? item.content?.slice(0, 150) + "..."
              : item?.content}
          </p>
        </button>
      </div>
      {/*********************** view todo modal *************************/}

      {toggleModal && (
        <ViewAutomatedEmail
          handleToggleModal={handleToggleModal}
          item={item}
          isGreetingEmail={isGreetingEmail}
          handleSendGreetingEmail={handleSendGreetingEmail}
          handleSendEmail={handleSendEmail}
          handleToggleEditTodoModal={handleToggleEditTodoModal}
          loadingSendEmail={loadingSendEmail}
          loadingSendGreetingEmail={loadingSendGreetingEmail}
        />
      )}
      {/******************** edit automation modal *************************/}
      {toggleEditModal && (
        <EditEmail
          item={item}
          isGreetingEmail={isGreetingEmail}
          handleToggleEditTodoModal={handleToggleEditTodoModal}
          handleSendGreetingEmail={handleSendGreetingEmail}
          handleUpdateEmail={handleUpdateEmail}
          loadingUpdate={loadingUpdate}
          loadingSendGreetingEmail={loadingSendGreetingEmail}
          emailContent={emailContent}
          setEmailContent={setEmailContent}
        />
      )}
      {/* alert */}
      {showAlertModal && (
        <DropDownAlert
          showAlertModal={showAlertModal}
          message={alertMessage}
          type={alertType}
        />
      )}
    </>
  );
};

export default EmailAutomationCard;

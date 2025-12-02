import React, { useRef, useState } from "react";
import FeaturesHeader from "../FeaturesHeader";
import { useSelector } from "react-redux";
import {
  useGetAllGreetingsQuery,
  useGetEmailDataQuery,
} from "../../store/emailApiSlice";
import { windowWidth } from "../../utils/Dimensions";
import Loading from "../Loading";
import LoadingAnimation from "../LoadingAnimation";
import closeIcon from "../../assets/closeIcon.svg";
import EmailAutomationCard from "./EmailAutomationCard";
import "./scrollbar.css";

function AutomationModal({
  uniqueId,
  handleToggleAutomationModal,
  handleToggleCloseModal,
  dontShowHeader,
}) {
  const { accountsGoalUser } = useSelector((state) => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const goalsEmailListRef = useRef(null);
  const activityEmailListRef = useRef(null);
  const scrollViewRef = useRef(null);

  const tabWidth =
    windowWidth <= 650
      ? windowWidth
      : windowWidth > 650 <= 750
      ? windowWidth * 0.5
      : windowWidth * 0.4;

  const handleHorizontalScroll = (e) => {
    const scrollWidth = e.target.scrollLeft;
    const objectIndex = Math.round(scrollWidth / tabWidth);
    console.log(scrollWidth, objectIndex);
    setCurrentIndex(objectIndex);
  };
  // get all goals email by user
  const {
    data: allEmails,
    refetch,
    isLoading: loadingEmail,
    error: emailError,
  } = useGetEmailDataQuery({ userId: accountsGoalUser?._id });

  // get all greetings email by user
  const {
    data: allGreetingsEmail,
    isLoading: loadingGreetingsEmail,
    error: greetingsEmailError,
  } = useGetAllGreetingsQuery();

  const handleGoalsEmailTab = () => {
    const goalsEmail = document.getElementById("goalsEmail");
    setCurrentIndex(0);
    goalsEmail.scrollIntoView({ behavior: "smooth" });
  };

  const handleActivitiesEmailTab = () => {
    const greetingsEmail = document.getElementById("greetingsEmail");
    setCurrentIndex(1);
    greetingsEmail.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className={`w-full md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white  rounded-t-3xl md:rounded-none overflow-y-scroll`}
    >
      <div className="relative w-full h-full mx-auto  bg-white py-12 rounded-3xl overflow-y-scroll ">
        <div className="px-5 h-[20%] sm:h-[15%] md:h-[10%] ">
          <FeaturesHeader
            dontShowHeader={dontShowHeader}
            title={"Automated Emails"}
            handleBackButton={handleToggleAutomationModal}
            handleCloseButton={handleToggleCloseModal}
          />
        </div>

        <div className="h-[80%] sm:h-[85%] md:h-[90%]  ">
          {/* tab indicator */}
          <div className="flex flex-row items-center justify-between px-5 mt-4 mb-8">
            <button className="w-1/2" onClick={handleGoalsEmailTab}>
              <p className="font-bold text-center">Goals</p>
              <div
                className={`w-1/2 mx-auto mt-1 border-2 rounded-full ${
                  currentIndex === 0
                    ? " border-primary-color "
                    : "border-secondary-accent-color"
                }`}
              />
            </button>
            <button className="w-1/2" onClick={handleActivitiesEmailTab}>
              <p className="font-bold text-center">Activity</p>
              <div
                className={`w-1/2 mx-auto mt-1 border-2 rounded-full ${
                  currentIndex === 1
                    ? " border-primary-color "
                    : "border-secondary-accent-color"
                }`}
              />
            </button>
          </div>

          <div
            ref={scrollViewRef}
            className="h-full flex flex-row overflow-x-scroll snap-x snap-mandatory no-scrollbar "
            onScroll={handleHorizontalScroll}
          >
            <div
              className="w-[100%] px-5 flex flex-col items-center"
              id="goalsEmail"
            >
              {allEmails &&
                allEmails.emailDrafts?.length > 0 &&
                allEmails.emailDrafts.map((item, index) => (
                  <EmailAutomationCard
                    key={index}
                    item={item}
                    index={index}
                    uniqueId={uniqueId ? uniqueId : ""}
                    lastIndex={allEmails.emailDrafts.length - 1}
                    sendTo={true}
                  />
                ))}

              {loadingEmail && (
                <div
                  style={{ width: windowWidth }}
                  className=" flex justify-center items-center"
                >
                  <Loading />
                </div>
              )}

              {!loadingEmail && allEmails.emailDrafts?.length === 0 && (
                <div style={{ width: windowWidth, marginTop: 20 }}>
                  <p className="text-center">No email message</p>
                </div>
              )}
            </div>

            <div
              className="w-[100%] px-5 flex flex-col items-center"
              id="greetingsEmail"
            >
              {allGreetingsEmail && allGreetingsEmail.length > 0 ? (
                allGreetingsEmail.map((item, index) => (
                  <EmailAutomationCard
                    key={index}
                    item={item}
                    index={index}
                    isGreetingEmail={true}
                    lastIndex={allGreetingsEmail.length - 1}
                    uniqueId={uniqueId}
                    sendTo={false}
                  />
                ))
              ) : loadingGreetingsEmail ? (
                <div
                  style={{ width: windowWidth }}
                  className="  flex justify-center items-center"
                >
                  <Loading />
                </div>
              ) : (
                <div style={{ width: windowWidth, marginTop: 20 }}>
                  <p className="text-center">No email message</p>
                </div>
              )}
            </div>
            {/* loading goals */}
            {loadingEmail ||
              (loadingGreetingsEmail && (
                <LoadingAnimation
                  loading={loadingEmail || loadingGreetingsEmail}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutomationModal;

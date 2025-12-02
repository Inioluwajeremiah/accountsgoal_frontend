import React from "react";
import Loading from "../Loading";
import closeButton from "../../assets/closeIcon.svg";
import editButton from "../../assets/editIcon.svg";

function ViewAutomatedEmail({
  handleToggleModal,
  item,
  isGreetingEmail,
  handleSendGreetingEmail,
  handleSendEmail,
  handleToggleEditTodoModal,
  loadingSendEmail,
  loadingSendGreetingEmail,
}) {
  return (
    <div className="w-full md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed top-0 bottom-0 right-0 z-10 overflow-y-scroll ">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="min-h-[65%] bg-black/50" onClick={handleToggleModal} />

        <div className=" w-full flex flex-col -mt-20 rounded-t-3xl  bg-screen-bg px-5 ">
          <div className="w-full  flex flex-col justify-between bg-screen-bg">
            {/* close button */}
            <button
              className=" w-12 h-12 flex self-end mt-7 items-center justify-center rounded-full  p-2"
              onClick={handleToggleModal}
            >
              <img src={closeButton} alt="close button" />
            </button>
            {!isGreetingEmail && (
              <>
                <p className={`font-bold text-base`}>{item?.subject}</p>

                <p className=" text-sm text-[#777777] mt-8 text-left ">
                  {item?.to}
                </p>
              </>
            )}
            <p className=" text-sm text-[#777777] mt-8 text-left ">
              {item?.content}
            </p>
          </div>

          {/* send mail button and edit button*/}
          <div className="flex flex-row items-center justify-between">
            {/* send mail button */}
            <button
              className={`bg-primary-color w-2/3
          rounded-full mt-10 h-12 py-3 flex justify-center items-center mb-10`}
              onClick={
                isGreetingEmail ? handleSendGreetingEmail : handleSendEmail
              }
            >
              {loadingSendEmail || loadingSendGreetingEmail ? (
                <Loading size="small" color={"#fff"} />
              ) : (
                <p className="text-center font-semibold text-white text-base">
                  Send mail
                </p>
              )}
            </button>

            {/* edit mail button */}

            <button
              className=" w-12 h-12 rounded-full bg-primary-color flex items-center justify-center"
              onClick={handleToggleEditTodoModal}
            >
              <img src={editButton} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAutomatedEmail;

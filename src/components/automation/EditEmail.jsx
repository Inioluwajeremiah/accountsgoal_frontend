import closeButton from "../../assets/closeIcon.svg";
import Loading from "../Loading";
import TextArea from "../forms/TextArea";
import TextInputField from "../forms/TextInputField";

const EditEmail = ({
  item,
  isGreetingEmail,
  handleToggleEditTodoModal,
  handleSendGreetingEmail,
  handleUpdateEmail,
  loadingUpdate,
  loadingSendGreetingEmail,
  emailContent,
  setEmailContent,
}) => {
  return (
    <div className="w-full md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed top-0 bottom-0 right-0 z-10 overflow-y-scroll ">
      <div className="w-full h-full flex flex-col">
        <div
          className="min-h-[65%] bg-black/50"
          onClick={handleToggleEditTodoModal}
        />

        <div className=" w-full flex flex-col -mt-20 rounded-t-3xl  bg-screen-bg px-5 ">
          <div className="w-full h-full flex flex-col justify-between bg-screen-bg">
            {/* close button */}
            <button
              className=" w-12 h-12 flex self-end mt-7 items-center justify-center rounded-full  p-2"
              onClick={handleToggleEditTodoModal}
            >
              <img src={closeButton} alt="close button" />
            </button>

            {!isGreetingEmail && (
              <>
                <p className="text-secondary-accent-color font-bold text-sm">
                  {item?.subject}
                </p>
                <p className="text-sm my-2 text-secondary-accent-color">
                  Email to: {item?.to}
                </p>
              </>
            )}
            <p className="text-secondary-accent-color font-bold text-sm">
              Content
            </p>
            <TextArea
              value={emailContent}
              multiline
              onChange={(e) => setEmailContent(e.target.value)}
              className="border border-secondary-accent-color rounded-xl px-4 text-sm text-secondary-accent-color mt-2 bg-screen-bg"
            />
          </div>

          {/* update and send mail button */}
          <button
            className={`
            bg-primary-color
           rounded-full mt-10 h-12 py-3 flex justify-center items-center mb-10`}
            disabled={false}
            onClick={
              isGreetingEmail ? handleSendGreetingEmail : handleUpdateEmail
            }
          >
            {loadingUpdate || loadingSendGreetingEmail ? (
              <Loading size="small" color={"#fff"} />
            ) : (
              <p className="text-center font-semibold text-white text-base">
                Send mail
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmail;

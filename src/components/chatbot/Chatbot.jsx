"use client";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { BsChatText } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import { DNA } from "react-loader-spinner";
import OpenAI from "openai";
import favIcon from "../../icons/UserIcon";
import { toast } from "react-toastify";
import accountgoalimg from "../../assets/android.png";
// import accountgoalimg from "../assets/accountgoalimg.png";

const openAIKey = import.meta.env.VITE_OPENAI_API_KEY;

const Chatbot = forwardRef((props, ref) => {
  const openai = new OpenAI({
    apiKey: openAIKey,
    dangerouslyAllowBrowser: true,
  });

  const [showChat, setShowChat] = useState(false);

  useImperativeHandle(ref, () => ({
    handleShowSupportChat() {
      setShowChat(true);
    },
    handleHideSupportChat() {
      setShowChat(false);
    },
  }));

  // chat is user chat input
  const [chat, setChat] = useState("");
  const [chatList, setChatList] = useState([]);

  // chatUID is from bot response12a=]['/]
  const [chatUID, setChatUID] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = (botChat) => {
    const timestamp = Date.now();

    setChatList([
      ...chatList,
      { text: chat, sender: "user", timestamp },
      { text: botChat, sender: "bot", timestamp },
    ]);
    setChat("");
    scrollToBottom();
  };
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  let formattedMessage = "";
  chatList.forEach((chat) => {
    formattedMessage += `sender: ${chat.sender}\nmessage: ${chat.text}\n\n`;
  });

  formattedMessage = formattedMessage.trim();
  const _phoneNumber = "2348185875172";

  const message = `Hello, I want to speak to Accountsgoal representative`;
  const whatsappURL = `https://wa.me/${_phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleSend = async (chat) => {
    const startTime = new Date();
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `
                    You're a training assistant bot for Accountsgoal, your name is Akanke and you represent Accountsgoal brand. Accountsgoal brand is as explained below: 

                    Accountsgoal Project Documentattion

                    Purpose
                    
                    Accountsgoal is intended to increase productivity and assist in the streamlining of goals in performance-based roles
                    
                    HOW IT WORKS:
                    
                    Accountsgoal will be able to integrate popular work platforms, such as Excel and Outlook to increase productivity in an organization
                    
                    Accountsgoal will keep a concise calendar of events/meetings with each account. With option for AI to create an attainable daily route/plan per day based on metrics chosen (revenue, last interaction)
                    
                    Accountsgoal will be able to display a geographical img of the accounts within the territory, with the ability to filter
                    
                    Accountsgoal will be able keep a rolling to-do list with ability to prioritize based on goal completion date
                    
                    Accountsgoal will help in achieving daily, quarterly, semi-annual or annual goals by showing a real-time pie chart of goal achieved
                    
                    Many sales personnel can have upwards of 300* accounts to mange  using accountsgoal
                    
                    Accountsgoal app is divided into 5 different category based on functionality
                    
                    Excel
                    
                    Map
                    
                    Calender
                    
                    To-do list
                    
                    Goals
                    
                    Excel
                    
                    User will be able upload a files, document,  table (via Excel) to accountsgoal app
                    
                    Accountsgoal will be able to create accounts for each based on the excel file uploaded
                    
                    Accountsgoal can look at revenue and determine largest to smallest account based on the excel file uploaded
                    
                    Map
                    
                    Accountsgoal will have a map that will show all accounts within different territory using the app
                    
                    Accountsgoal map will be able to zoom in to specific city or zoom out to view entire state or country
                    
                    Accountsgoal map will have search bar function to quickly locate account registered under a particular organization
                    
                    Accountsgoal map will be able to  filterer: Last interaction based on (1-30days, 30-60, 60-90) or by Revenue with a color key for each which could be Green or Red
                    
                    Calendar
                    
                    Calendar will be imported which can be set to either 5 or 7 day view
                    
                    The calender will show you 1 month (monthly view), 3 months (quarterly view), 6 months (semi-annual), 12 months (yearly) based event
                    
                    Once added to Accountsgoal calendar it will automatically be able to link to Outlook Calendar (send invites via work email)
                    
                    There will be an AI assistant can help to schedule/prioritize a monthly schedule around manually input events. Automatically updates as changes are made
                    
                    To-Do List
                    
                    Organization user will be able to create a prioritize to-do list based on end-date
                    
                    The to-do list will be included  from every account
                    
                    The to-do-list will have a cross out function or checking off
                    
                    Once marked as completed. To-do will be archived
                    
                    Once marked as completed will keep time stamp of date and time it has been marked
                    
                    Goals
                    
                    Accountsgoal will be able to set  a measurable goals and it can deliver real time goal completion percentage
                    
                    FREQUENTLY ASKED QUESTIONS.
                    
                    Q: How do I register for an account on accountsgoal.com? A: To register for an account on accountsgoal.com, follow these steps:
                    
                    Visit the accountsgoal.com website.
                    
                    Click on the "Login/Signup" button, usually located in the top-right corner of the homepage.
                    
                    Fill out the registration form with your personal information, such as your full name, company email address, phone number and password.
                    
                    Click on the "Sign Up" button to complete the registration process and then you will be directed to a verification page.
                    
                    Check your mail to get the OTP verification code.  
                    
                    Input the 4 - digit code in the verification page and click on verify.
                    
                    Once you are verification process is completed you will be directed to a success page and then login page afterwards.
                    
                    Q: Do I need to provide any personal information to register for an account? A: Yes, you will typically need to provide basic personal information such as your fullname, phone number and company email address to register for an account on accountsgoal.com.
                    
                    Q: Is registering for an account on accountsgoal.com free? A: Yes, registration for an account on accountsgoal.com is usually free. However, some premium features or services may require payment.
                    
                    Q: Can I use a social media account to register on accountsgoal.com? A: Some websites offer the option to register using a social media account such as Facebook or Google. Check the registration page on accountsgoal.com to see if this option is available.
                    
                    Q: What should I do if I encounter any issues during the registration process? A: If you encounter any issues during the registration process, such as technical difficulties or error messages, you can usually find help and support resources on the accountsgoal.com website. Look for a "Help" or "Support" section at the bottom right side on the homepage, or contact customer support (support@accountsgoal.com) for assistance.
                    
                    Q: Can I access my account from multiple devices? A: Yes, many online platforms, including accountsgoal.com, allow you to access your account from multiple devices, such as smartphones, tablets, and computers. Simply log in with your registered email address and password to access your account from any supported device.
                    
                    Q: Is my information secure on accountsgoal.com? A: Accountsgoal.com typically employs security measures to protect your personal information, such as encryption and secure authentication methods. However, it's always a good idea to use strong, unique passwords and to be cautious about sharing sensitive information online.
                    
                    Q: How can I import data from an Excel file into the app or website? 
                    
                    A: You can easily import data from an Excel file into the app or website using these steps:
                    
                    Open the app on your device or access it through the web interface.
                    
                    On the website, once you have login, on the top right corner you click on dashboard to access you dashboard.
                    
                    On the dashboard, you will see a plus icon on the bottom right corner, click on it to start the uploading process.
                    
                    While on the mobile app, once you are login successfully, you will see a modal asking you to upload excel file. Also if you skip that part, on the map page you will see a plus icon that will take you to upload section.
                    
                    You will the information of how the excel document should looks like.
                    
                    Click on the "upload document button".
                    
                    Choose the Excel file you want to import from your device's file explorer or window explorer.
                    
                    Once you've selected the file, initiate the import process.
                    
                    The app will then process the Excel file and integrate the data seamlessly into its interface.
                    
                    Once the import is complete, you should see the imported data within the map screen.
                    
                    Q: What types of data can I import from Excel into the app? 
                    
                    A: You can typically import various types of data from Excel into the app, including but not limited to:
                    
                    Financial data such as budgets, expenses, and income.
                    
                    Any other structured data that is compatible with the app's format.
                    
                    Q: Are there any specific file formats or requirements for Excel files to be imported into the app? A: The app usually supports standard Excel file formats such as .xls and .xlsx. Ensure that your Excel file is properly formatted and does not contain any unsupported features or data types that might cause issues during the import process. Also your excel heading fields should contain all these headings: ACCUNT_NAME, ADDRESS, CELEBRATIONS, EMAIL, MOBILE_CONTACT and REVENUE, and it must be spelt the same way.
                    
                    Q: What should I do if I encounter any errors or issues during the import process? A: If you encounter any errors or issues during the import process, such as missing or incorrect data, double-check that your Excel file is correctly formatted and that you're using a supported file format and check the required headings. You can also refer to the app's help documentation or contact customer support for assistance.
                    
                    Q: Can I import data from Excel on both mobile and desktop versions of the app? 
                    
                    A: Yes, most apps that support Excel import functionality allow you to do so on both mobile and desktop versions. Simply follow the same steps outlined in the app's interface, regardless of the device you're using.
                    
                    Q: What are the limitations of the free version compared to the premium version? 
                    
                    A: The free version of the app may have several limitations in comparison to the premium version. Some common differences include:
                    
                    Features: The free version may offer a limited set of features compared to the premium version. Premium versions often include advanced functionalities, additional tools, and exclusive features designed to enhance the user experience.
                    
                    Storage: Free versions typically come with limited storage capacity for data and files. In contrast, premium versions may offer larger storage quotas or unlimited storage options, allowing users to store more data without restrictions.
                    
                    Advanced functionalities: Premium versions often include advanced functionalities and capabilities not available in the free version. These may include advanced analytics, automation features, customizations, and integrations with other apps or services.
                    
                    Support: While both versions may offer customer support, premium users often receive priority support with faster response times and access to dedicated support channels. Free users may have access to community forums or limited support resources.
                    
                    Updates and improvements: Premium versions may receive updates and improvements more frequently than the free version. These updates may include bug fixes, performance enhancements, and new features exclusive to premium users.
                    
                    Usage limits: Free versions may have usage limits or restrictions on certain features, such as the number of projects, transactions, or collaborators allowed. Premium versions often offer higher usage limits or remove these restrictions altogether.
                    
                    Import Excel: Free accounts are not allowed to import more accounts compared to the Premium user who has unlimited access.
                    
                    Adding Organization members: Free uses are limited to adding organization user compared to Premium users who has unlimited access.
                    
                    Q: Are there any tutorials or guides available for new users? A: 
                    
                    Yes, the app offers tutorials and guides specifically designed to assist new users in getting started. These resources aim to provide step-by-step instructions and helpful tips to facilitate a smooth onboarding experience and ensure users can make the most out of the app's features.
                    
                    Q: Where can I find the tutorials or guides for new users? A: You can typically find the tutorials and guides within the about section of the web application.
                    
                    Q: What topics do the tutorials and guides cover for new users? A: The tutorials and guides for new users cover a range of topics essential for understanding and navigating the app effectively. This may include instructions on account setup, basic feature usage, data import/export, customization options, and tips for optimizing the user experience.
                    
                    Q: Are the tutorials and guides available in multiple formats, such as text, video, or interactive demos? Yes, the tutorials and guides available in various formats to cater to different learning preferences. This could include written instructions with screenshots, video tutorials, interactive demos, or a combination of these formats to provide comprehensive guidance.
                    
                    Q: Can I access the tutorials and guides from both the mobile and desktop versions of the app? A: Bacically you can access it in the web application
                    
                    Q: Are the tutorials and guides regularly updated to reflect new features or changes in the app? A: Yes, the app's developers usually update the tutorials and guides regularly to reflect any changes, updates, or new features introduced in the app. This ensures that users have access to the most up-to-date information and instructions.



When giving user directions, use an <ol></ol> which is properly formatted in order for user to understand clearly the steps, use inline style to set the disk of the <li></li> tags, more like providing a step by step instruction or guide.


This information is all about Accountsgoal, Accountsgoal is spelt "Accountsgoal" not "Accounts Goal" or "Account goal". Your task include assisting clients or customers with their enquiries, also provide adequate direction for clients. 

Your output should be a properly formatted html code without he head, title, html or body tag. Keep your response short, clear and avoid overloading the user with plenty instructions

Use href for links to make it more attractive and also to reduce text length, make link styling obvious. When user ask to speak to a customer service provider, reply accordingly and send this link if they request for whatsapp conversation with an agent - refer to mobile number. Make sure urls are proper html formatted. Make links style obvious, underlined and blue in color.


                    `,
          },
          { role: "user", content: `${chat}` },
        ],
        model: "gpt-4-turbo",
      });

      const endTime = new Date();
      const responseTimeInSeconds = (endTime - startTime) / 1000;

      setChatUID(response.conversation_id);
      sendMessage({
        text: response?.choices[0].message.content,
        sender: "bot",
        timestamp: Date.now(),
        responseTimeInSeconds,
        status: "success",
      });
      localStorage.setItem("chatUID", JSON.stringify(response.id));
      // console.log("Response: ", response);
    } catch (error) {
      toast.error("An error occured, please try again");
      sendMessage({
        text: response?.choices[0].message.content,
        sender: "bot",
        timestamp: Date.now(),
        responseTimeInSeconds,
        status: "fail",
      });
    } finally {
      setIsLoading(false);
    }
  };
  function scrollToBottom() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }

  //  useEffect hook to update localStorage when chatList changes
  useEffect(() => {
    // Function to check if a chat entry is older than 72 hours
    const isOlderThan72Hours = (timestamp) => {
      const currentTime = new Date().getTime();
      const entryTime = new Date(timestamp).getTime();
      const timeDifference = currentTime - entryTime;
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      return hoursDifference > 72;
    };
    if (chatList?.length > 0) {
      const filteredChatList = chatList.filter(
        (chat) => !isOlderThan72Hours(chat.timestamp)
      );
      localStorage.setItem("chatHistory", JSON.stringify(filteredChatList));
    }
  }, [chatList]);

  // setting the chat from localStorage
  useEffect(() => {
    const isOlderThan72Hours = (timestamp) => {
      const currentTime = new Date().getTime();
      const entryTime = new Date(timestamp).getTime();
      const timeDifference = currentTime - entryTime;
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      return hoursDifference > 72;
    };

    const storedChatHistory = localStorage.getItem("chatHistory");
    if (storedChatHistory?.length > 0) {
      const filteredStoredChatHistory = JSON.parse(storedChatHistory).filter(
        (chat) => !isOlderThan72Hours(chat.timestamp)
      );
      setChatList(filteredStoredChatHistory);
    }

    // const storedChatHistory = localStorage.getItem("chatHistory");
    // if (storedChatHistory?.length > 0) {
    //   setChatList(JSON.parse(storedChatHistory));
    // }
    // setChatList(JSON.parse(storedChatHistory));

    // const storedChatUID = localStorage.getItem("chatUID");
    // if (storedChatUID !== "undefined") {
    //   setChatUID(JSON.parse(storedChatUID));
    // }

    // Retrieve and set chat UID
    const storedChatUID = localStorage.getItem("chatUID");
    if (storedChatUID !== "undefined") {
      setChatUID(JSON.parse(storedChatUID));
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  return (
    <>
      <div className="w-max fixed right-0 bottom-0 m-4 shadow-xl bg-white z-[99999]">
        {showChat ? (
          <div className="bg-white w-96 max-w-96 mb-8 rounded-tl-lg rounded-tr-lg">
            <div className="flex bg-blue-600 text-white items-center justify-between py-3 px-2 rounded-tl-lg rounded-tr-lg">
              <div className="flex gap-2 items-center">
                <div>
                  <span>
                    <svg
                      width="55"
                      height="35"
                      viewBox="0 0 13 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_3258_33139)">
                        <path
                          d="M6.09857 0.539086C7.6946 0.277798 9.35352 1.39334 9.76702 2.99542C10.221 4.51979 9.47221 6.28968 8.07966 6.9919C6.70953 7.74592 4.86518 7.3354 3.9266 6.06162C2.92677 4.80811 2.98857 2.83099 4.06444 1.64675C4.58733 1.04646 5.31971 0.643827 6.09857 0.539086Z"
                          fill="white"
                        />
                        <path
                          d="M10.0601 6.15503C11.3816 7.11684 12.2939 8.64008 12.534 10.285C11.9613 10.2078 11.3892 10.1284 10.8165 10.0473C10.7318 9.41607 10.6514 8.78368 10.5666 8.15242C9.9179 8.81409 9.27522 9.48139 8.62543 10.1419C7.58348 9.61654 6.35282 9.49265 5.23812 9.83446C3.96535 10.2089 2.87526 11.1724 2.31682 12.4051C1.75783 13.6147 1.7261 15.0692 2.24134 16.3008C2.7883 17.6427 3.95988 18.6969 5.33001 19.068C6.55848 19.4154 7.9215 19.2093 9.00065 18.5133C10.0825 17.8291 10.8718 16.6758 11.1196 15.3953C11.3329 14.3552 11.1754 13.2509 10.7252 12.2981C11.3345 11.6725 11.9422 11.0446 12.5548 10.4218C12.651 11.7846 12.5778 13.1541 12.5996 14.5202C12.3092 14.5191 12.0199 14.5202 11.7294 14.5213C11.7054 15.8097 11.2186 17.0824 10.3659 18.029C9.33593 19.1992 7.77984 19.8524 6.24617 19.7505C4.78962 19.675 3.38831 18.9221 2.48747 17.7469C1.77424 16.838 1.38207 15.6842 1.35691 14.5202C1.07085 14.5202 0.78643 14.5191 0.501465 14.5185C0.505294 13.3664 0.497636 12.2131 0.505294 11.0609C0.533735 9.13394 1.51443 7.26607 3.04373 6.15672C3.78978 7.39559 5.17686 8.20366 6.60278 8.16762C7.99315 8.1665 9.33101 7.36574 10.0601 6.15672V6.15503Z"
                          fill="white"
                        />
                        <path
                          d="M8.99959 10.3376C9.42676 9.90226 9.84956 9.46359 10.2767 9.02942C10.3391 9.49005 10.3971 9.95125 10.4605 10.413C10.9101 10.4761 11.3592 10.5369 11.8088 10.6017C11.3832 11.0398 10.9566 11.4767 10.5305 11.9143C10.1898 11.8681 9.84847 11.8219 9.5088 11.7701C8.61289 12.679 7.72134 13.5924 6.83801 14.5137C6.71002 14.512 6.58258 14.5137 6.45459 14.5154C6.45897 14.387 6.46444 14.2597 6.46936 14.1324C7.36254 13.2286 8.24314 12.3102 9.13414 11.403C9.09202 11.0471 9.04061 10.6923 8.99904 10.3376H8.99959Z"
                          fill="white"
                        />
                        <path
                          d="M4.67333 11.1344C5.85804 10.4068 7.43382 10.453 8.58244 11.238C8.46101 11.3647 8.33959 11.4909 8.21871 11.6176C7.34576 11.0843 6.23271 10.9824 5.29631 11.4013C3.97869 11.9515 3.13419 13.4747 3.36993 14.9203C3.5641 16.4452 4.92219 17.6965 6.42086 17.7269C7.79591 17.8051 9.13814 16.854 9.57407 15.5155C9.89185 14.5999 9.77152 13.5524 9.28801 12.7202C9.40998 12.5929 9.5336 12.4673 9.65721 12.3429C10.1719 13.1515 10.3748 14.1623 10.2042 15.1134C10.0248 16.1749 9.37717 17.1367 8.48125 17.6953C7.7341 18.17 6.81904 18.3514 5.95157 18.2066C4.94462 18.0462 4.01917 17.4318 3.45471 16.5618C2.93728 15.7813 2.72507 14.7969 2.86563 13.8644C3.02261 12.7348 3.71178 11.7032 4.67333 11.1333V11.1344Z"
                          fill="white"
                        />
                        <path
                          d="M4.83088 12.9092C5.47137 12.1231 6.62381 11.8899 7.52082 12.323C7.39393 12.4598 7.26539 12.595 7.13412 12.7279C6.725 12.6023 6.27595 12.5893 5.87995 12.7667C5.22743 13.0336 4.77181 13.7319 4.78822 14.4538C4.78549 15.1718 5.2504 15.856 5.90128 16.1139C6.52427 16.3774 7.28618 16.2186 7.76422 15.7327C8.25867 15.2568 8.42385 14.487 8.2089 13.8327C8.33743 13.6947 8.4687 13.5618 8.6038 13.4318C8.82368 13.9583 8.88603 14.5631 8.71593 15.1155C8.48347 15.9253 7.78664 16.5717 6.97715 16.7238C6.20429 16.8854 5.36253 16.5909 4.8462 15.9799C4.09741 15.1465 4.09085 13.7488 4.83143 12.9092H4.83088Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3258_33139">
                          <rect
                            width="12.3047"
                            height="19.7937"
                            fill="white"
                            transform="translate(0.5 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                </div>
                <div>
                  <span className="font-bold">Online Chat</span>
                  <p>We&apos;re available 24/7 to assist you</p>
                </div>
              </div>

              <div
                id="supportChat"
                className="cursor-pointer p-1 "
                onClick={() => setShowChat(!showChat)}
              >
                <MdOutlineClose size={24} />
              </div>
            </div>
            <div
              className=" h-96 overflow-auto max-h-96 customBar mt-2"
              ref={chatContainerRef}
            >
              <ul className="px-2">
                <li>
                  <div className="flex items-center">
                    <span className="bg-black rounded-full p-2">
                      <img
                        loading="lazy"
                        src={accountgoalimg}
                        alt="Logo"
                        className="w-8 h-fit overflow-hidden"
                      />
                    </span>
                    <p className=" bg-blue-100  max-w-[80%] p-2 m-2 rounded-md text-lg">
                      Welcome to Accountsgoal
                    </p>
                  </div>
                </li>
                <li></li>

                {chatList?.map((chat) => {
                  if (chat.sender === "bot") {
                    return (
                      <li key={chat.timestamp}>
                        <div className="flex ">
                          {chat.text && (
                            <div className="flex items-start">
                              <div className="flex-shrink-0 bg-black rounded-full p-2">
                                <img
                                  loading="lazy"
                                  src={accountgoalimg}
                                  alt="Logo"
                                  className="w-8 h-fit overflow-hidden"
                                />
                              </div>
                              <div className="max-w-[80%] m-2">
                                <p
                                  className={`${
                                    chat.text.status === "fail"
                                      ? "bg-red-100"
                                      : "bg-blue-100"
                                  } p-2 mb-0  rounded-md text-lg font-medium`}
                                  dangerouslySetInnerHTML={{
                                    __html: chat.text.text,
                                  }}
                                />
                                {chat.text.responseTimeInSeconds && (
                                  <span className="text-xs text-gray-500  ">{`${Math.round(
                                    chat.text.responseTimeInSeconds
                                  )} seconds`}</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  }

                  if (chat.sender === "user") {
                    return (
                      <li>
                        <div className="flex justify-end">
                          {chat.text && (
                            <p
                              className="bg-slate-200 max-w-[80%] p-2 m-2 rounded-md text-sm"
                              dangerouslySetInnerHTML={{ __html: chat.text }}
                            />
                          )}
                        </div>
                      </li>
                    );
                  }
                })}

                {isLoading && (
                  <li>
                    <div className="flex ">
                      <p className=" bg-slate-200 text-right max-w-[80%] p-2 m-2 rounded-md text-sm">
                        <DNA
                          visible={true}
                          height="40"
                          width="40"
                          ariaLabel="dna-loading"
                          wrapperStyle={{}}
                          wrapperClass="dna-wrapper"
                        />
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            {/*input here   */}
            <div className="flex items-center justify-between gap-2 mb-2 border-t-2 pt-2 px-2 ">
              <input
                type="text"
                placeholder="Enter message here"
                className="p-2 w-full rounded-sm bg-[#EEF7F0] focus:outline-none "
                onChange={(e) => setChat(e.target.value)}
                value={chat}
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                    handleSend(chat);
                  }
                }}
              />

              <RiSendPlaneFill
                size={24}
                className="cursor-pointer"
                onClick={() => {
                  handleSend(chat);
                  sendMessage();
                }}
              />
            </div>
            <p className="text-center text-gray-500 text-xs pt-1 pb-3">
              Powered by Accountsgoal
            </p>
          </div>
        ) : (
          <div
            className="b p-2 !rounded-2xl cursor-pointer"
            onClick={() => setShowChat(!showChat)}
          >
            <BsChatText size={32} stroke="white" className="fill-blue-600 " />
            {/* <BsChatText size={40} stroke="white" className="fill-[#ffc727] " /> */}
          </div>
        )}
      </div>
    </>
  );
});

export default Chatbot;

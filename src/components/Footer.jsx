import React, { useState } from "react";
import accountgoalimg from "../assets/accountgoalimg.png";
import axios from "axios";
import LinkedinIcon from "../assets/linkedin.svg";
import FacebookIcon from "../assets/facebook.svg";
import TwitterIcon from "../assets/twitter.svg";
import TitktokIcon from "../assets/titktok.svg";
import YoutubeIcon from "../assets/youtube.svg";
import InstagramIcon from "../assets/instagram.svg";
import PrivacyPolicy from "./PrivacyPolicy";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import AboutUs from "./AboutUs";
import Signin from "../screens/Signin";
import Chatbot from "../components/chatbot/Chatbot";

const MediaArray = [
  {
    name: "linkedIn",
    link: "",
    icon: LinkedinIcon,
  },
  {
    name: "facebook",
    link: "https://www.facebook.com/profile.php?id=61556974903675&mibextid=ZbWKwL",
    icon: FacebookIcon,
  },
  {
    name: "twitter",
    link: "https://x.com/accountsgoal",
    icon: TwitterIcon,
  },
  {
    name: "tiktok",
    link: "https://www.tiktok.com/@accountsgoal?_t=8koSAaEUPZt&_r=1",
    icon: TitktokIcon,
  },
  {
    name: "youtube",
    link: "https://www.youtube.com/@accountsgoal",
    icon: YoutubeIcon,
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/p/C401dUfrobe/?igsh=NTc4MTIwNjQ2YQ==",
    icon: InstagramIcon,
  },
];

const Footer = ({ supportChatRef, page }) => {
  const [email, setEmail] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleEmailSubscription = async () => {
    try {
      const res = await axios.post(emailSubscriptionUrl, credential);
      console.log(res);
      setEmail("");
    } catch (error) {
      console.log(error?.response?.data);
      setEmail("");
    }
  };

  const date = new Date();
  const year = date.getFullYear();

  const handleShowSupportChat = () => {
    supportChatRef?.current?.handleShowSupportChat();
  };

  return (
    <footer className="w-[100%] py-8 bg-tertiary-color md:px-10 lg:px-16">
      <div className="container w-full md:px-10 mx-auto">
        <div className="w-[90%] md:w-full mx-auto">
          <div className=" flex flex-wrap justify-between">
            {/* Footer Sections */}
            <div className="w-full md:w-1/3 mb-8 flex flex-col justify-start items-start text-white-color">
              <Link to={"/"}>
                {" "}
                <img
                  loading="lazy"
                  src={accountgoalimg}
                  alt="Logo"
                  className="w-40 h-fit mb-4"
                />
              </Link>

              <h2 className="text-xl font-bold mb-4">+1(7635) 547-12-97</h2>
              <p className="mb-4">customer@accountsgoal.com</p>
            </div>

            <div className="w-full md:w-1/3 mb-8">
              <h3 className="text-lg font-bold mb-4 text-white-color">
                Quick Links
              </h3>
              <ul className="w-full flex justify-between items-center flex-wrap text-primary-accent-color">
                {/* <li className="w-1/2 mb-4">Product</li> */}
                <Link to="/signin" className="w-1/2 mb-4 cursor-pointer">
                  Product
                </Link>

                {page ? (
                  <Link to={"/#aboutus"} className="w-1/2 mb-4 cursor-pointer">
                    Company
                  </Link>
                ) : (
                  <ScrollLink
                    to={"aboutus"}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="w-1/2 mb-4 cursor-pointer"
                  >
                    Company
                  </ScrollLink>
                )}

                <Link to="/privacy-policy" className="w-1/2 mb-4">
                  Privacy Policy
                </Link>
                <br />
                {/* <li className="w-1/2 mb-4">Support</li> */}

                <ScrollLink
                  to="chatbot"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  role="button"
                  className="w-1/2 mb-4 cursor-pointer"
                  // onClick={() => setShowChat(true)}
                  onClick={handleShowSupportChat}
                >
                  Support
                </ScrollLink>
              </ul>
            </div>

            {/* Subscribe Section */}
            <div className="w-full md:w-1/3 mb-8">
              <h3 className="text-lg font-bold mb-4 text-white-color">
                Subscribe
              </h3>
              {/* <p>Subscribe to our newsletter for updates.</p> */}
              <div className="flex items-center mt-4 md:h-12 h-16">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="p-2 rounded-l outline-none w-[80%] h-full"
                />
                <button
                  type="submit"
                  className="bg-primary-color text-white p-2 rounded-r w-[20%] h-full flex justify-center items-center"
                  onClick={handleEmailSubscription}
                >
                  <svg
                    width="17"
                    height="13"
                    viewBox="0 0 17 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.94465 13L15.8838 7.42846C16.4307 6.91519 16.4307 6.08324 15.8838 5.57154L9.94465 0L7.96479 1.8581L11.5138 5.18669H0.249512L0.249512 7.81292H11.5138L7.96479 11.1427L9.94465 13Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* All Rights Reserved and Social Media Section */}
          <div className="mt-8 border-t border-gray-700 md:pt-4 pt-12 flex flex-col md:flex-row justify-between md:items-center">
            {/* Social Media Links */}
            <div className="flex items-center flex-wrap md:flex-nowrap gap-2 md:gap-x-4">
              {MediaArray.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="text-white mr-4 border border-white-colorm h-10 w-10 md:h-12 md:w-12 rounded-full flex justify-center items-center"
                >
                  <img
                    loading="lazy"
                    src={item.icon}
                    alt={`${item.name} icon`}
                  />
                </a>
              ))}
            </div>

            <div className="w-full justify-center md:justify-end flex items-center mt-10 md:mt-0">
              <p className="text-white md:text-base text-sm">
                &copy; {year} Accountsgoal. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

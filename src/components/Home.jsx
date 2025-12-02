import appscreenshot1 from "../assets/appscreenshot1.png";
//import appscreenshot2 from "../assets/appscreenshot2.png";
import appscreenshot2 from "../assets/appscreenshot2.png";
import appscreenshot3 from "../assets/appscreenshot3.png";
import mobileframes from "../assets/mobileframes.png";
import ios from "../assets/ios.png";
import android from "../assets/android.png";
import qrcode from "../assets/qrcode.png";
import { windowHeight } from "../utils/Dimensions";
import { useState } from "react";
import { emailSubscriptionUrl } from "../utils/Endpoints";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";

function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let credential = {
    email,
  };

  const handleEmailSubscription = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(emailSubscriptionUrl, credential);
      console.log(res?.data?.message);
      if (res) {
        toast.success(res?.data?.message, {
          position: "top-right",
        });
      }
      setIsLoading(false);
      setEmail("");
    } catch (error) {
      console.log(error?.response?.data?.msg);
      toast.error(error?.response?.data?.msg, {
        position: "top-right",
      });
      setIsLoading(false);
      setEmail("");
    }
  };
  // const handleEmailSubscription = () => {
  //   fetch(emailSubscriptionUrl, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: email,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log("Error => ", error.message);
  //     });
  // };

  return (
    <div className=" w-full">
      {/* 1. landing page and cta  */}
      {/* h-[55vh] md:h-screen */}
      <section className="container mx-auto px-10">
        {/* title text */}
        <h1 className="text-xl md:text-3xl text-black text-center font-black lg:text-5xl lg:px-16 mt-24">
          Unlock Your Sales Potential:{" "}
          <span className="text-blue-500">Where Strategy Meets Success.</span>
        </h1>
        {/* landing sub title text */}
        <p className="text-sm md:text-2xl font-normal text-primary-accent-color text-center my-2 md:my-6 lg:my-16">
          Streamline your account management with intuitive tools and<br></br>
          {/* <br /> */}
          insights, designed to elevate your productivity and drive unparalleled{" "}
          <br></br>
          {/* <br /> */}
          growth.
        </p>
        {/* email field and submit button */}
        <div className="w-[100%] lg:w-[60%]   flex justify-center  mx-auto mb-16 md:mb-16 mt-6 md:mt-0">
          <div className=" w-full flex justify-between items-center rounded-full border border-tertiary-accent-color mb-10">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="Enter your email address"
              className="w-[73%] text-xs md:text-base px-3 md:px-6 h-full outline-none border-l border-r-tertiary-accent-color rounded-l-full"
            />

            <button
              type="submit"
              className={`${
                isLoading ? "bg-blue-200" : "bg-blue-500"
              } w-[50%] md:w-[27%] bg-blue-500 text-white-500 rounded-full p-3 text-white text-xs md:text-base flex items-center justify-center`}
              onClick={handleEmailSubscription}
            >
              {isLoading ? <Loading /> : "Get Early Access"}
            </button>
          </div>
        </div>
      </section>
      {/* h-[100vh] md:h-screen */}

      {/* 2. phones and downloads  */}
      <section className=" w-full relative  rounded-3xl mt-60 bg-tertiary-color h-[30rem] sm:h-[60rem] md:h-[45rem]  lg:h-[45rem] md:pb-32 lg:pb-16">
        <div className="container relative mx-auto w-full md:w-full h-full md:px-10">
          {/* 1.  phone desgin images */}
          {/* absolute */}
          {/* <div className=" -mt-32 mx-auto"> */}
          <div className="absolute z-20 left-[10%] top-0 w-[80%] -mt-40 md:-mt-52 mx-auto">
            <img
              loading="lazy"
              src={mobileframes}
              alt="mobile design"
              className=" w-[80%] mx-auto object-contain hidden md:block "
            />

            <img
              loading="lazy"
              src={appscreenshot1}
              alt="mobile design"
              className=" w-[60%] sm:w-[70%] mx-auto object-contain md:hidden"
            />
          </div>

          {/* 2.  downloads block*/}
          {/* absolute  top-[65%]*/}
          <div className=" absolute left-0 top-[30%] sm:top-[55%] md:top-[55%] lg:top-[45%] w-full md:px-10 mx-auto  flex flex-col gap-y-16 md:flex-row justify-between items-center md:gap-x-6 pb-10 mt-24 md:mt-0 lg:mt-36 ">
            {/* downloads text */}
            <div className="w-[90%]">
              <p className=" md:mt-0 font-black text-sm sm:text-2xl text-white">
                Download today and transform your management approach.
              </p>
              <p className="text-[12px] text-[#D7D5D5] sm:text-lg mt-4">
                Discover the ultimate tool for account management excellence
                with accountsgoal, now at your fingertips.
              </p>
              <button className="md:hidden bg-primary-color text-white-color text-sm font-semibold p-4 rounded-full mt-10">
                <a href="https://www.accountsgoal.com/invite-link/1234">
                  Download app
                </a>
              </button>
            </div>
            {/* for ios and android */}
            <div className=" hidden md:flex md:flex-row items-center w-[80%] gap-x-3 text-white ">
              {/* ios */}
              <div className="relative bg-secondary-color rounded-3xl p-4 w-[47%]">
                <p className="text-2xl">For iOS</p>
                <p>Available on all ios devices</p>
                <img
                  loading="lazy"
                  src={qrcode}
                  alt="qcode icon"
                  className="h-24 w-24 my-6"
                />
                <div className=" absolute flex justify-center items-center  h-20 w-20 rounded-full -right-4 -bottom-4 bg-quartenary-color">
                  <img
                    loading="lazy"
                    src={ios}
                    alt="ios icon"
                    className="h-10 w-10"
                  />
                </div>
              </div>
              {/* android */}
              <div className="relative bg-secondary-color rounded-3xl p-4 w-[53%]">
                <p className="text-2xl">For Android</p>
                <p>Available on all android devices</p>
                <img
                  loading="lazy"
                  src={qrcode}
                  alt="qcode icon"
                  className="h-24 w-24 my-6"
                />
                <div className="absolute flex justify-center items-center h-20 w-20 rounded-full -right-4 -bottom-4 bg-quartenary-color">
                  <img
                    loading="lazy"
                    src={android}
                    alt="android icon"
                    className="h-10 w-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;

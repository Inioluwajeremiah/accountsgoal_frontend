import React, { useEffect, useRef, useState } from "react";
import stars from "../assets/stars.png";
import map from "../assets/map.png";
import media from "../assets/media.png";
import todo from "../assets/todo.png";
import { Link } from "react-router-dom";

const Todo = [
  {
    priority: "High priority",
    priorityColor: "#F35555",
    title: "Shedule meeting",
    time: "12:00pm- 1:00pm",
  },

  {
    priority: "Low priority",
    priorityColor: "#6CBE44",
    title: "Call metodist hospital",
    time: "3:00pm- 4:00pm",
  },
  {
    priority: "Medium priority",
    priorityColor: "#FFA500",
    title: "Setup account for Daniel",
    time: "1:30pm- 2:30pm",
  },
];

const scrollToAboutUs = () => {
  const aboutUsSection = document.getElementById("aboutus");
  if (aboutUsSection) {
    aboutUsSection.scrollIntoView({ behavior: "smooth" });
  }
};

const GoalArray = Array.from({ length: 6 });

function Features() {

  const featuresRef = useRef(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#features") {
        featuresRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    // Check the hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

 

  

  return (
    <section
      id="features"
      ref={featuresRef}
      className="container mx-auto md:px-10 flex flex-col items-center justify-center bg-white pt-10 md:pt-32 pb-16 "
    >
      <div className=" bg-blue-500 rounded-full shadow flex items-center justify-center px-4 py-3">
        <div className="text-white w-fit">Features</div>
      </div>
      <div>
        <h2 className="font-bold text-sm md:text-3xl text-center  mt-8 md:mt-12">
          Maximize management with essential features
        </h2>
        <h2 className="font-normal text-xs md:text-lg text-center mt-3 mb-8 md:mb-16">
          Streamline your workflow and elevate your business success.{" "}
          <Link to={"#aboutus"} onClick={scrollToAboutUs}>
            Learn More{" "}
          </Link>
        </h2>
      </div>

      {/* first grid */}
      <div className="w-full flex md:flex-row flex-col  gap-y-4 md:gap-4">
        <div className="w-[90%] md:w-1/2 p-4 bg-card-bg rounded-3xl mx-auto flex flex-col items-center">
          <p className="font-bold text-xl text-center mt-4 p-2">
            Geo-Client Mapping Interface
          </p>
          <p className="text-base text-primary-accent-color text-center p-2  w-[80%] mx-auto">
            Navigate your sales territory with ease! Our Map View helps you
            locate clients.
          </p>
          <img
            loading="lazy"
            src={map}
            alt=" Geo-Client Mapping Interface image"
            className="mt-4 object-contain"
          />
        </div>
        {/* social media */}
        <div className="w-[90%] md:w-1/2 p-4 bg-card-bg rounded-3xl mx-auto  flex flex-col items-center">
          <img
            loading="lazy"
            src={media}
            alt="Various Integration for easy use"
            className="mb-4 object-contain"
          />
          <p className="font-bold text-xl text-center mt-4 p-2">
            Various Integration for easy use
          </p>
          <p className="text-base text-primary-accent-color text-center p-2  w-[80%] mx-auto">
            Effortlessly synchronise your Excel data and manage email
            communications
          </p>
        </div>
      </div>

      {/* second grid */}
      <div className="w-full flex md:flex-row flex-col  gap-y-4 md:gap-4 mt-4 md:mt-8 ">
        {/* 1/3  */}
        <div className="w-[90%] mx-auto md:w-1/3 rounded-3xl p-4 bg-card-bg">
          <img
            loading="lazy"
            src={stars}
            alt="AI icon"
            className="object-contain flex  mx-auto w-1/2  "
          />
          <p className="font-bold text-xl text-center mt-6 p-2">
            Smart Scheduling with AI
          </p>
          <p className="text-base text-primary-accent-color text-center p-2">
            Enhance efficiency with AI-driven insights and automatedsales task
            management.
          </p>
        </div>
        {/* 2/3 */}
        <div className="w-[90%] mx-auto md:w-1/3 rounded-3xl  p-4 bg-card-bg">
          <p className="font-bold text-xl text-center p-2">Manage To-do list</p>
          <p className="text-base text-primary-accent-color text-center p-2">
            Organize and Prioritize with Our Advanced To-Do List System
          </p>
          <img
            loading="lazy"
            src={todo}
            alt="Manage To-do list image"
            className="mt-8"
          />
        </div>
        {/* 3/3 */}
        <div className="w-[90%] mx-auto md:w-1/3 rounded-3xl p-4 bg-card-bg">
          <div className="relative rounded-3xl p-4 bg-white-color w-[70%] mx-auto pb-14">
            <p className="text-[#F35555] font-semibold py-2 text-[0.5em]">
              20%
            </p>
            {GoalArray.map((item, index) => (
              <div
                key={index}
                className=" w-[80%] flex flex-row items-center gap-2 my-2 "
              >
                <input
                  type="checkbox"
                  checked={index === 1}
                  className="h-4 w-4 border appearance-none checked:bg-black "
                  onChange={() => null}
                />
                <p className="text-[0.5em]">
                  Increase the revenue for this account
                </p>
              </div>
            ))}

            <div className="absolute right-8 bottom-8 w-10 h-10 flex flex-row justify-center items-center rounded-full bg-primary-color">
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.45125 3.50218L10.2381 2.71524C10.6728 2.28063 11.3774 2.28063 11.8121 2.71524C12.2466 3.14985 12.2466 3.8545 11.8121 4.28911L11.0251 5.07604M9.45125 3.50218L4.82883 8.12461C4.24201 8.71143 3.94859 9.00482 3.7488 9.36237C3.549 9.71992 3.34798 10.5642 3.15576 11.3715C3.96309 11.1793 4.80737 10.9783 5.16492 10.7785C5.52246 10.5787 5.81588 10.2853 6.4027 9.69847L11.0251 5.07604M9.45125 3.50218L11.0251 5.07604"
                  stroke="white"
                  strokeWidth="0.842085"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.08594 11.3713H10.4543"
                  stroke="white"
                  strokeWidth="0.842085"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <p className="font-bold text-xl text-center mt-4 p-2">
            Goal Settings
          </p>
          <p className="text-base text-primary-accent-color text-center p-2">
            Set and Achieve Targets with Precision Using Our Advanced
            Goal-Setting Tools.
          </p>
        </div>
      </div>
    </section>
  );
}
export default Features;

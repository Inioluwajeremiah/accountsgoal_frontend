import React, { useEffect, useRef, useState } from "react";
import { BaseUrl, pricingUrl } from "../utils/Endpoints";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  useCreateSessionMutation,
  useLoginStatusQuery,
} from "../store/authApi";
import { Navigate, useNavigate } from "react-router-dom";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [getPlans, setGetPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createPayment, { isLoading, isError, error: paymentErr }] =
    useCreateSessionMutation();
  const { data: isLoggedIn, isLoading: statusLoading } = useLoginStatusQuery();
  const isLoggedInStatus = statusLoading ? "Loading.." : isLoggedIn;
  const navigate = useNavigate();
  // const fetchAllPlans = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(pricingUrl);
  //     if (res) {
  //       // console.log(res.data.data);
  //       setGetPlans(res.data.data)
  //       // toast.success(res?.data?.message, {
  //       //   position: "top-right",
  //       // });
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     // console.log(error);
  //     // toast.error(error?.response?.data?.msg, {
  //     //   position: "top-right",
  //     // });
  //     setLoading(false);
  //   }
  // };

  const pricingRef = useRef(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#pricing") {
        pricingRef.current.scrollIntoView({
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

  const plans = [
    {
      id: 1,

      title: "Free Plan",
      description: "Ideal for individuals or small teams just starting out",
      price: "$0",
      //additionalInfo: "Limited features included",
      features: [
        "Access to basic features: Task Management, Calender Integration",
        "Standard Map view with basic client location tagging",
        "Basic Goal Setting and Tracking",
        "Community Support",
        "Limited to 50 client accounts.",
      ],
      join: "Join for free",
    },
    {
      id: 2,
      priceId: "price_1PdwJGBDmg9aD60CnpuruNiF",
      title: "Monthly Subscription",
      description:
        "Designed for professionals and businesses seeking comprehensive management tools.",
      price: "$30",
      //additionalInfo: "Cancel anytime",
      features: [
        "All Free Plan features",
        "Enhanced Goal Setting with custom metrics",
        "Unlimited client account and in-depth client management tools",
        "Early access to new features",
        "Full AI insights an advanced analytics",
      ],
      join: "Subscribe for more",
    },
  ];

  const randomFeatures = [
    "Access to Premium Content",
    "Priority Customer Support",
    "Advanced Analytics",
    "Customizable Dashboard",
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId === selectedPlan ? null : planId);
  };

  const renderFeatures = (features, selectedId, planId) => (
    <ul className="">
      {features.map((feature, index) => (
        <li key={index} className="relative flex items-center my-4 mb-2">
          <svg
            className="absolute left-0  h-5 w-5 bg-primary-color rounded-full text-white-color p-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <p
            className={`ml-10 text-sm md:text-base font-semibold ${
              selectedId === planId ? "text-white-color" : "text-black"
            }`}
          >
            {feature}
          </p>
        </li>
      ))}
    </ul>
  );

  const createSesssion = async (priceId) => {
    try {
      if (!isLoggedInStatus) {
        return navigate("/signin");
      }
      // const {data: response} = await axios.post(`${BaseUrl}session`, {priceId, platform: 'web'});
      const res = await createPayment({ priceId, platform: "web" }).unwrap();
      if (res) {
        console.log("resp", res);
        window.location.href = res.url;
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <section
      className=" relative flex flex-col items-center justify-center py-10 md:py-16 "
      id="pricing"
      ref={pricingRef}
    >
      <div className=" bg-blue-500 rounded-full shadow flex items-center justify-center px-4 py-3">
        <div className="text-white w-fit">Pricing</div>
      </div>
      <div>
        <h2 className="font-bold text-sm md:text-3xl text-center mt-8 md:mt-12">
          Explore our flexible pricing plans
        </h2>
        <h2 className="font-normal text-xs md:text-lg text-center mt-3 mb-8 md:mb-16">
          Range of competitive pricing options designed to suit various business
          sizes.
        </h2>
      </div>

      <div className="container mx-auto md:px-10">
        <div className="flex justify-center items-center flex-col gap-3 md:flex-row mx-auto px-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={` w-full  md:w-[40%] flex flex-col justify-left p-8 lg:mb-0 lg:mr-6 rounded-3xl  cursor-pointer ${
                plan.id === 2 ? " bg-tertiary-color" : "bg-card-bg"
              }`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              <h2
                className={`w-fit text-xs md:text-base font-bold ${
                  plan.id === 2
                    ? "text-white-color bg-primary-color"
                    : "text-primary-color bg-[#ECF0FC]"
                } px-4 py-2 mb-4 rounded-full `}
              >
                {plan.title}
              </h2>
              <p
                className={`text-sm md:text-base ${
                  plan.id === 2 ? "text-white-color" : "text-black"
                }`}
              >
                <span className="text-base md:text-2xl font-bold mt-4">
                  {plan.price}
                </span>
                /month
              </p>
              <p
                className={`text-sm md:text-base mt-4 ${
                  plan.id === 2 ? "text-[#D1D1D1]" : "text-[#5C5C5C]"
                }`}
              >
                {plan.description}
              </p>

              {renderFeatures(
                [...plan.features, ...randomFeatures],

                plan.id,
                2
              )}

              <button
                onClick={() => {
                  if (plan.id === 2) {
                    createSesssion(plan.priceId);
                  } else {
                    if (!isLoggedInStatus) {
                      navigate("/signin");
                    } else {
                      navigate("/dashboard");
                    }
                  }
                }}
                className={`w-full text-center text-sm md:text-base font-bold ${
                  plan.id === 2
                    ? "text-white-color bg-primary-color"
                    : "text-primary-color bg-[#ECF0FC]"
                } px-4 py-3 mb-4 rounded-full my-3 ${
                  plan.id === 2 && isLoading && "bg-blue-400"
                }`}
              >
                {plan.join}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

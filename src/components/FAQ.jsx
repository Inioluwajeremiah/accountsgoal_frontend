import React, { useEffect, useRef, useState } from "react";

function FAQ() {
  const faqRef = useRef(null);

  useEffect(() => {
    // Scroll to the FAQ section if the hash is #faq
    if (window.location.hash === "#faq") {
      faqRef.current.scrollIntoView({
        behavior: "auto",
      });
    }
  }, []);

  const [faqItems, setFaqItems] = useState([
    {
      question: "How do i import data from Excel into the app?",
      answer:
        "To import data from Excel into the app, use the app's interface to upload the Excel file. The app will process and integrate the data seamlessly.",
    },
    {
      question: "Can i sync my existing calender with the app's calender?",
      answer:
        "Yes, you can sync your existing calendar with the app. Access the app's settings or preferences, and look for an option to connect or sync calendars. Follow the prompts to integrate your calendar seamlessly.",
    },
    {
      question:
        "What are the limitation of the free version compared to premium version?",
      answer:
        "The free version may have limitations on features, storage, and advanced functionalities compared to the premium version. Check the app's documentation or pricing page for specific details on restrictions and benefits associated with each version.",
    },
    {
      question: "Is my data secure with account goals?",
      answer:
        "Yes, your data is secure with account goals. The app employs robust security measures to protect your information. Refer to the app's privacy and security policies for specific details on data protection.",
    },
    {
      question: "Are there any tutorials or guide for new users?",
      answer:
        "Certainly, for new users, the app provides tutorials and guides to facilitate a smooth onboarding experience. Explore the app's help or tutorial section for comprehensive assistance.",
    },
    // Add more FAQ items as needed
  ]);

  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={faqRef} id="faq" className="container py-10 md:px-10 mx-auto">
      <div className="flex flex-col mx-auto items-center justify-center">
        <div className="h-10 w-20 bg-blue-500 rounded-full shadow flex items-center justify-center">
          <p className="text-white text-center text-base  ">FAQ</p>
        </div>
        <div className="w-full mx-auto">
          <h2 className="font-bold md:text-3xl text-center text-sm  mt-8 md:mt-12">
            Quickly find answers to common queries
          </h2>

          <h2 className="font-normal md:text-lg text-xs text-center mt-3 mb-4 md:mb-12">
            Find answers to your questions with our comprehensive FAQ section
          </h2>
        </div>
      </div>

      <div>
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="mt-4  w-[90%] md:w-[70%] lg:w-[50%] mx-auto"
          >
            <div
              onClick={() => toggleQuestion(index)}
              className={`flex items-center justify-between bg-gray-200 p-4 rounded-3xl cursor-pointer ${
                openIndex === index ? "bg-blue-200" : ""
              }`}
            >
              <h3 className="txt-sm md:text-lg font-semibold">
                {item.question}
              </h3>
              <div
                className={`w-6 h-6 text-black font-semibold text-sm md:text-lg`}
              >
                {openIndex === index ? "-" : "+"}
              </div>
            </div>
            {openIndex === index && (
              <p className="mt-2 text-sm md:text-base text-primary-accent-color">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;

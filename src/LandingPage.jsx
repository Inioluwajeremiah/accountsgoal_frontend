import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense, useEffect, useRef } from "react";
import { useGetUserQuery } from "./store/authApi";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

const Navbar = lazy(() => import("./components/Navbar"));
const Home = lazy(() => import("./components/Home"));
const Features = lazy(() => import("./components/Features"));
const Pricing = lazy(() => import("./components/Pricing"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const FAQ = lazy(() => import("./components/FAQ"));
const Footer = lazy(() => import("./components/Footer"));
const Chatbot = lazy(() => import("./components/chatbot/Chatbot"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));

function LandingPage() {
  const { data, isLoading, isError, error } = useGetUserQuery();

  console.log("user-data", data);

  const supportChatRef = useRef();

  return (
    <main className="">
      <Suspense>
        <Navbar />
        <br />
        <br />
        <Home />
        <Features />
        <Pricing />
        <AboutUs />
        <FAQ />
        <Footer supportChatRef={supportChatRef} />

        <Chatbot ref={supportChatRef} />
      </Suspense>
      <ToastContainer />
      <Routes>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </main>
  );
}

export default LandingPage;

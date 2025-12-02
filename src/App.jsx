import React, { useEffect, useState } from "react";
import {
  // HashRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Signup from "./screens/Signup";
import OtpVerification from "./screens/OtpVerification";
import ForgotPassword from "./screens/ForgotPassword";
import VerifyPasswordReset from "./screens/VerifyPasswordReset";
import PasswordReset from "./screens/PasswordReset";
import PasswordChanged from "./screens/PasswordChanged";
import Signin from "./screens/Signin";
import SuccessRegister from "./screens/SuccessRegister";
import LandingPage from "./LandingPage";
import Goals from "./screens/Goals";
import Todos from "./screens/Todos";
import { useGetUserQuery, useLoginStatusQuery } from "./store/authApi";
import DashboardRoute from "./dashboard/DashboardRoute";
import PaymentSuccessful from "./components/PaymentSuccessful";
import PrivacyPolicy from "./components/PrivacyPolicy";
import axios from "axios";
import { BASE_URL } from "./utils/Endpoints";

const App = () => {
  const { data } = useLoginStatusQuery();
  const [inviteLoad, setInviteLoad] = useState(false);
  const [getInvitedUserData, setGetInvitedUserData] = useState();
  const { accountsGoalUser: invitedUserfromLocalStorage } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  const navigate = useNavigate();

  const getInvitedUser = async () => {
    try {
      if (invitedUserfromLocalStorage) {
        setInviteLoad(true);
        const res = await axios.get(
          `${BASE_URL}getuser-under-organization/${invitedUserfromLocalStorage?.organizationId}/${invitedUserfromLocalStorage?.userId}/${invitedUserfromLocalStorage?._id}`
        );
        if (res) {
          // console.log(res.data, "innnnnnvvvv");
          setGetInvitedUserData(res?.data[0]);
        }
        setInviteLoad(false);
      }
    } catch (error) {
      setInviteLoad(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (invitedUserfromLocalStorage) {
      getInvitedUser();
    }
  }, []);

  // console.log("innnnnnvvvv", getInvitedUserData);

  const {
    data: accountsGoalUser,
    isLoading,
    isError,
    error,
  } = useGetUserQuery();
  const isLoggedIn = isLoading
    ? "loading.."
    : accountsGoalUser || (inviteLoad ? "loading" : getInvitedUserData);

  /* useEffect(() => {
    if (!getInvitedUserData || !accountsGoalUser) {
      if (location.pathname.startsWith("/dashboard/")) {
        navigate("/");
      }
      if (location.pathname.startsWith("/dashboard")) {
        navigate("/");
      }
    }
    if (getInvitedUserData || accountsGoalUser) {
      navigate(location.pathname);
    }
  }, [location.pathname]);*/

  console.log("user", accountsGoalUser);

  useEffect(() => {
    if (isLoading || inviteLoad) {
      // Do nothing while loading
      return;
    }

    if (!getInvitedUserData && !accountsGoalUser) {
      if (location.pathname.startsWith("/dashboard")) {
        navigate("/");
      }
    } else {
      navigate(location.pathname);
    }
  }, [
    location.pathname,
    isLoading,
    inviteLoad,
    getInvitedUserData,
    accountsGoalUser,
  ]);

  // useEffect(() => {
  //   const currentTime = Date.now();
  //   const timeDifference = currentTime - loginTime;
  //   const oneMin = 1000 * 60 * 60 * 24;
  //   const timeInminute = Math.floor(timeDifference / oneMin);
  //   if (Math.floor(timeDifference / (1000 * 60 * 60 * 24)) >= 1) {
  //     logoutUser();
  //     navigate("/signin");
  //   }
  //   if (!accountsGoalUser?.token) {
  //     navigate("/signin");
  //   }
  //   console.log("accountsGoalUser ==> ", timeInminute);
  // }, []);
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.clear();
    }
  }, [isLoggedIn]);

  return (
    <>
      {/* <ProtectedRoute> */}
      {/* <DashboardRoute /> */}
      {/* </ProtectedRoute> */}
      {/* <Router> */}
      {isLoggedIn ? <DashboardRoute /> : <LandingPage />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path={
            location.pathname === "/invite-signup"
              ? "/invite-signup"
              : "/signup"
          }
          element={<Signup />}
        />

        <Route path="/payment-success" element={<PaymentSuccessful />} />
        <Route
          path={
            location.pathname === "/invite-signin"
              ? "/invite-signin"
              : "/signin"
          }
          element={<Signin />}
        />
        {/* <Route path="/invite-signin" element={<InviteSignin />} /> */}
        <Route path="/success-register" element={<SuccessRegister />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-password-reset" element={<VerifyPasswordReset />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-changed" element={<PasswordChanged />} />
        {/*<Route path="/calender" element={<CalendarScreen />} />*/}
        <Route path="/goal" element={<Goals />} />
        <Route path="/todo" element={<Todos />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/password-reset" element={<PasswordReset />} />
      </Routes>
      {/* </Router> */}
    </>
  );
};

export default App;

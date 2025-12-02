import React, { useEffect, useState } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { useGetUserQuery, useLoginStatusQuery } from "../store/authApi";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/Endpoints";

const ProtectedRoute = ({ children, ...rest }) => {
  // const { data, isLoading } = useLoginStatusQuery();
  const [inviteLoad, setInviteLoad] = useState(false);
  const [getInvitedUserData, setGetInvitedUserData] = useState(null);
  const { accountsGoalUser: invitedUserfromLocalStorage } = useSelector(
    (state) => state.auth
  );

  const getInvitedUser = async () => {
    try {
      setInviteLoad(true);
      const res = await axios.get(
        `${BASE_URL}getuser-under-organization/${invitedUserfromLocalStorage.organizationId}/${invitedUserfromLocalStorage.userId}/${invitedUserfromLocalStorage._id}`
      );
      if (res) {
        console.log(res.data, "innnnnnvvvv");
        setGetInvitedUserData(res?.data[0]);
      }
      setInviteLoad(false);
    } catch (error) {
      setInviteLoad(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getInvitedUser();
  }, []);

  const {
    data: accountsGoalUser,
    isLoading,
    isError,
    error,
  } = useGetUserQuery();
  const isLoggedIn = isLoading
    ? "loading.."
    : accountsGoalUser || (inviteLoad ? "loading" : getInvitedUserData);
  const location = useLocation();

  // If user is not logged in and not trying to access the sign-in page, allow access to the home page

  //   if (!isLoggedIn && (location.pathname !== '/signin'  && location.pathname !== '/signup' && location.pathname !== '/forgot-password' && location.pathname !== '/otp-verification' && location.pathname !== '/sucess-register' && location.pathname !== '/otp-password-reset' && location.pathname !== '/password-reset' && location.pathname !== '/password-changed')) {
  //     return <Navigate to="/"  replace />;
  // }
  if (!isLoggedIn) {
    if (location.pathname === "/invite-signin") {
      return <Navigate to="/invite-signin" replace />;
    }
    if (location.pathname === "/invite-signup") {
      return <Navigate to={`/invite-signup${location.search}`} replace />;
    }
  }

  if (!isLoggedIn) {
    if (
      location.pathname !== "/signin" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/forgot-password" &&
      location.pathname !== "/otp-verification" &&
      location.pathname !== "/sucess-register" &&
      location.pathname !== "/otp-password-reset" &&
      location.pathname !== "/password-reset" &&
      location.pathname !== "/password-changed"
    ) {
      return <Navigate to="/" replace />;
    }
  }
  if (
    isLoggedIn &&
    (location.pathname === "/signin" ||
      location.pathname === "/signup" ||
      location.pathname === "/forgot-password" ||
      location.pathname === "/otp-verification" ||
      location.pathname === "/sucess-register" ||
      location.pathname === "/otp-password-reset" ||
      location.pathname === "/password-reset" ||
      location.pathname === "/password-changed")
  ) {
    return <Navigate to="/" replace />;
  }
  //   if (isLoggedIn && (location.pathname !== '/signin' || location.pathname !== '/signup' || location.pathname !== '/forgot-password' || location.pathname !== '/otp-verification' || location.pathname !== '/sucess-register' || location.pathname !== '/otp-password-reset' || location.pathname !== '/password-reset' || location.pathname !== '/password-changed') ) {
  //     if(location.pathname.startsWith('/dashboard')){
  //       return <Navigate to="/dasboard"  replace />;

  //     }
  //     return <Navigate to="/"  replace />;
  // }

  // If user is not logged in and trying to access a protected route, redirect to sign-in page
  if (!isLoggedIn && location.pathname !== "/") {
    if (location.pathname === "/signin") {
      return <Navigate to="/signin" />;
    } else if (location.pathname === "/signup") {
      return <Navigate to="/signup" />;
    } else if (location.pathname === "/forgot-password") {
      return <Navigate to="/forgot-password" />;
    } else if (location.pathname === "/otp-verification") {
      return <Navigate to="/otp-verification" />;
    } else if (location.pathname === "/sucess-register") {
      return <Navigate to="/sucess-register" />;
    } else if (location.pathname === "/otp-password-reset") {
      return <Navigate to="/otp-password-reset" />;
    } else if (location.pathname === "/password-reset") {
      return <Navigate to="/password-reset" />;
    } else if (location.pathname === "/password-changed") {
      return <Navigate to="/password-changed" />;
    }
  }

  // if (!isLoggedIn && location.pathname !== '/') {
  //     return <Navigate to="/signup"   />;
  // }

  // if(!isLoggedIn) {
  //     return <Navigate to="/signin" state={{ from: location}} replace />
  // }

  return isLoggedIn && children;
};

export default ProtectedRoute;

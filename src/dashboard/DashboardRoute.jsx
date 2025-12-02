import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Layout from "../components/Layout";
import MapScreen from "../screens/MapScreen";
import Todos from "../screens/Todos";
//import CalendarScreen from '../screens/Calendar'
//import CalenderEvent from '../components/calender/CalenderEvent'
import CreateNewGoal from "../components/goals/CreateNewGoal";
import CreateTodo from "../components/todo/CreateTodo";
import GoalsPercent from "../components/goals/GoalsPercent";
import ClientInformation from "../screens/ClientInformation";
import Support from "../screens/Support";
import EditGoal from "../components/goals/EditGoal";
import GoalsMarked from "../components/goals/GoalMarked";
import Goals from "../screens/Goals";
import InviteOthersModal from "../components/organization/InviteOthersModal";
import InvitationSent from "../components/organization/InvitationSent";
import OrganizationSuccess from "../components/organization/OrganizationSuccess";
import OrganizationProfile from "../components/organization/OrganizationProfile";
import CreateOrganization from "../components/organization/CreateOrganization";
import SkipOrganizationSuccess from "../components/organization/SkipOrganizationSuccess";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/Endpoints";
import { useGetUserQuery } from "../store/authApi";
const DashboardRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Layout />}>
          <Route path="/dashboard" element={<MapScreen />} />
          {/* <Route path="/map" element={<Home />} /> */}
          <Route path="/dashboard/goals" element={<Goals />} />
          <Route path="/dashboard/todo-list" element={<Todos />} />
          {/* <Route path="/dashboard/calender" element={<CalendarScreen />} />*/}

          <Route
            path="/dashboard/create-new-goal"
            element={<CreateNewGoal />}
          />
          <Route path="/dashboard/create-todo" element={<CreateTodo />} />
          <Route path="/dashboard/goals-percent" element={<GoalsPercent />} />
          <Route path="/dashboard/goals-marked" element={<GoalsMarked />} />
          <Route
            path="/dashboard/client-information"
            element={<ClientInformation />}
          />
          <Route path="/dashboard/support" element={<Support />} />
          <Route path="/dashboard/edit-goals" element={<EditGoal />} />
          <Route
            path="/dashboard/create-organization"
            element={<CreateOrganization />}
          />
          <Route
            path="/dashboard/invite-others"
            element={<InviteOthersModal />}
          />
          <Route
            path="/dashboard/invitation-sent"
            element={<InvitationSent />}
          />
          {/* <Route
            path="dashboard/createOrganizationSuccessAlert"
            element={<OrganizationSuccess />}
          /> */}
          <Route
            path="/dashboard/organization-success"
            element={<OrganizationSuccess />}
          />
          <Route
            path="/dashboard/skip-organization-success"
            element={<SkipOrganizationSuccess />}
          />
          <Route
            path="organization-profile"
            element={<OrganizationProfile />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default DashboardRoute;

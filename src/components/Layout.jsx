import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Home from "../screens/MapScreen";

const Layout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };
  return (
    <div className="w-full flex flex-row items-center justify-between bg-none">
      <div>
        <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      </div>

      <div className="w-[94%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

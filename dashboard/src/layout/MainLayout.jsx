import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Header";
import Sidebar from "./Sidebar";
function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="bg-blue-mode w-full min-h-screen dark:bg-dark-mode">
      <Headers showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="mr-0 lg:mr-[260px] pt-[95px] transition-all ">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;

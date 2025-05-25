import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNavs } from "../navigation/index";
import { allNav } from "./../navigation/allNav";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNavs("admin");
    setAllNav(navs);
  }, []);
  // console.log(allNav);
  console.log("pathname", pathname);
  return (
    <div className="text-black">
      <div
        onClick={() => setShowSidebar(!showSidebar)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-dashboard-mode top-0 left-0 z-10`}
      ></div>
      <div
        className={`w-[260px] fixed bg-dashboard-mode dark:bg-dark-mode z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
          showSidebar ? "right-0" : "-right-[260px] lg:right-0"
        }`}
      >
        <div className="flex justify-center items-center h-[70px]">
          <Link to="/" className="w-[180px] h-[50px]">
            <img src="http://localhost:3000/images/logo.png" alt="" />
          </Link>
        </div>
        <div className="px-[16px]">
          <div className="text-left">{pathname}</div>
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? "bg-blue-mode shadow-indigo-500/30 text-light duration-500"
                      : "text-[#d0d2d6] font-normal duration-200 "
                  } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pr-4 transition-all`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

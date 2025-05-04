//src/views/auth/Register.jsx
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineGooglePlus } from 'react-icons/ai'
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
const Login = () => {
  return (
    <div className="bg-light-mode dark:bg-dark-mode text-light-text dark:text-light min-h-screen  flex  items-center justify-center transition-colors duration-300 ">
      <div className="loginFrm dark:bg-dark-mode dark:text-dark-text backdrop-blur-sm p-16 rounded-2xl shadow-2xl w-96 transition-all">
        <form
          action=""
          className="text-right transition-colors duration-3000 "
        >

          <div className="flex flex-col w-full gap-1 mb-3">
            <label htmlFor="email">ایمیل </label>
            <input
              className="px-3 py-2 outline-none border rounded-md "
              type="email"
              name="email"
              id="email"
              placeholder="ایمیل"
            />
          </div>

          <div className="flex flex-col w-full gap-1 mb-3">
            <label htmlFor="password">رمز عبور</label>
            <input
              className="px-3 py-2 outline-none border rounded-md "
              type="password"
              name="password"
              id="password"
              placeholder="رمز عبور"
            />
          </div>

          <button
            type="submit"
            className="loginBtn bg-green-900 text-light p-2 rounded-md block w-full"
          >
            ورود
          </button>
          <div className="flex justify-center p-1">
            <Link to='/Register' >
              ثبت نام؟
            </Link>
          </div>
          <div className="w-full flex justify-center items-center mb-3"><div className="w-[45%] bg-slate-700 h-[1px]">
          </div>
          <div className="w-[10%] flex justify-center  items-center">

          <span className="pb-1">یا</span>
          </div>
            
            <div className="w-[45%] bg-slate-700 h-[1px]"></div></div>
            <div className="flex justify-center items-center gap-3">
                <div className="flex w-[35px] h-[35px] rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 hover:text-secondary justify-center cursor-pointer items-center overflow-hidden">

              <span><AiOutlineGooglePlus className="text-2xl"/></span>
            </div>
              <div className="flex w-[35px] h-[35px] rounded-md bg-purple-700 shadow-lg hover:shadow-purple-700/50  hover:text-secondary  justify-center cursor-pointer items-center overflow-hidden">

              <span><FaGithub  className="text-xl"/></span>
              </div>
              <div className="flex w-[35px] h-[35px] rounded-md bg-cyan-700 shadow-lg hover:shadow-cyan-700/50 hover:text-secondary  justify-center cursor-pointer items-center overflow-hidden">

              <span><FaXTwitter/></span>
              </div>
              <div className="flex w-[35px] h-[35px] rounded-md bg-indigo-700 shadow-lg hover:shadow-indigo-700/50 hover:text-secondary justify-center cursor-pointer items-center overflow-hidden">

              <span><CiFacebook className="text-2xl"/></span>
              </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

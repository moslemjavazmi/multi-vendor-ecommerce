//src/views/auth/Register.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineGooglePlus } from 'react-icons/ai'
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
function Register() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password:''
  })
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
  }
  const submit = (e) => {
    e.preventDefault();
    console.log(state)
  }
  return (
    <div className="bg-light-mode dark:bg-dark-mode text-light-text dark:text-light min-h-screen  flex  items-center justify-center transition-colors duration-300 ">
      <div className="loginFrm dark:bg-dark-mode dark:text-dark-text backdrop-blur-sm p-16 rounded-2xl shadow-2xl w-96 transition-all">
        <form
          onSubmit={submit}
          className="text-right transition-colors duration-3000 "
        >
          <div className="flex flex-col w-full gap-1 mb-3">
            <label htmlFor="name">نام و نام خانوادگی </label>
            <input
              className="px-3 py-2 outline-none border rounded-md "
              type="name"
              name="name"
              id="email"
              placeholder="نام"
              value={state.name}
              onChange={inputHandle}
            />
          </div>
          <div className="flex flex-col w-full gap-1 mb-3">
            <label htmlFor="email">ایمیل </label>
            <input
              className="px-3 py-2 outline-none border rounded-md "
              type="text"
              name="email"
              id="email"
              placeholder="ایمیل"
              value={state.email}
              onChange={inputHandle}
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
              value={state.password}
              onChange={inputHandle}
            />
          </div>
                    <div className="flex flex-row w-full gap-1 mb-3 text-xs/10">
            
            <input
              className="px-5 py-2 outline-none border rounded-md "
              type="checkbox"
              name="policy"
              id="policy"
            />
            <label htmlFor="policy">قوانین سایت را پذیرفته ام</label>
          </div>
          <button
            type="submit"
            className="loginBtn bg-green-900 text-light p-2 rounded-md block w-full"
          >
            ثبت نام
          </button>
          <div className="flex my-3">
            <span className="align-middle">آیا قبلا ثبت نام کرده اید؟</span>
            <Link to='/Login' className="mx-3 align-middle">
              ورود
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
}

export default Register;

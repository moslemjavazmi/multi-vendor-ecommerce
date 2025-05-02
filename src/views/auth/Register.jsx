//src/views/auth/Register.jsx
import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

function Register() {
  return (
    <div className="bg-light-mode dark:bg-dark-mode min-h-screen  flex  items-center justify-center transition-colors duration-300 ">
      <div className="loginFrm bg-transparent backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-96 transition-all">
        <form
          action=""
          className=" text-right transition-colors duration-3000 "
        >
          <div className="flex flex-col w-full gap-1 mb-3">
            <label htmlFor="email">نام و نام خانوادگی </label>
            <input
              className="px-3 py-2 outline-none border rounded-md "
              type="email"
              name="email"
              id="email"
              placeholder="نام"
            />
          </div>
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
          <div className="flex justify-center mt-3">
            <span className="align-middle">آیا قبلا ثبت نام کرده اید؟</span>
            <Link to={Login} className="mx-3 align-middle">
              ورود
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

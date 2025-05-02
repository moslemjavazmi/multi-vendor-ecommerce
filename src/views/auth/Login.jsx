import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";

const Login = () => {
  const [darkMode, setDarkMode] = useState(false);

  // بارگذاری حالت از localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);
  function handleLoginSubmit(ev) {
    ev.preventDefualt();
  }

  return (
    <div className="bg-light-mode dark:bg-dark-mode min-h-screen  flex  items-center justify-center transition-colors duration-300 ">
      <div className="loginFrm bg-transparent backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-96 transition-all">
        <form action="" onSubmit={handleLoginSubmit} className="text-right ">
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
          <Link to={Register} className="flex justify-center mt-3">
            ثبت نام
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

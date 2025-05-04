import React, { useState, useEffect } from 'react';
import { IoMoonSharp } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // بارگذاری اولیه حالت از localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  // توگل تم تاریک
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <nav className="bg-light dark:bg-[#78807d ] py-4 px-6 shadow-lg transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-dark dark:text-light text-2xl font-bold">
          فروشگاه آنلاین
        </h1>

        <div className="flex items-center gap-4">
          {/* دکمه تغییر تم */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-light/10 transition-colors"
            aria-label="تغییر تم"
          >
            {darkMode ? (
              <LuSun className="text-light w-6 h-6" />
            ) : (
              <IoMoonSharp className="text-dark w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
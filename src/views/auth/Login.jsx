import React, { useEffect, useState } from 'react';

const Login = () => {
  const [darkMode, setDarkMode] = useState(false);

  // بارگذاری حالت از localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);
  function handleLoginSubmit(ev) {
    ev.preventDefualt();
  }

  return (
    <div className="bg-light-mode dark:bg-dark-mode min-h-screen w-[350px] flex  items-center justify-center transition-colors duration-300">
      <div className="bg-light dark:bg-dark backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 p-8 rounded-2xl shadow-md w-96 transition-all">
        <form action="" onSubmit={handleLoginSubmit}>
          <div className="flex flex-col w-full gap-1 mb-3" >
                      <label htmlFor="email" >ایمیل </label>
          <input className='px-3 py-2 outline-none border rounded-md ' type="email" name="email" id="email"  onChange={(e) =>handleLoginSubmit(e) }/>
          </div>

          <div className="flex flex-col w-full gap-1 mb-3" >

          
          <label htmlFor="password">رمز عبور</label>
          <input className='px-3 py-2 outline-none border rounded-md border border-'  type="password" name="password" id="password"  onChange={(e) =>handleLoginSubmit(e) }/>
          </div>
          <button type='submit'></button>
</form>
    </div>
    </div>
  );
};

export default Login;
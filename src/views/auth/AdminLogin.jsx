import React,{useState} from "react";

const AdminLogin = () => {
    const [state, setState] = useState({
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
      <div className="loginFrm dark:bg-dark-mode dark:text-dark-text backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-96 transition-all">
                  <div className="flex justify-center m-5">
          <div className=" flex justify-center">
            <img src="http://localhost:3000/images/logo.png"  alt="" />
          </div>
       </div>
              <h1 className="flex justify-center text-4xl mb-5 text-primary">ورود</h1>
        <form
          onSubmit={submit}
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

          <button
            type="submit"
            className="loginBtn bg-green-900 text-light p-2 rounded-md block w-full"
          >
            ورود
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

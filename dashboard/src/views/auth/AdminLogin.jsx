import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import toast from 'react-hot-toast'
import {admin_login} from '../../store/Reducers/authReducer'
const AdminLogin = () => {
  const dispatch = useDispatch()
  const {loader, errorMessage} = useSelector(state => state.auth)
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
      // console.log(state)
      dispatch(admin_login(state))
  }
  const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: '24px',
    justifyContent: "center",
    alignItems: "center",
  };


  useEffect(() => {
  if(errorMessage){
    toast.error(errorMessage)
    
  }
},[errorMessage])

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
            disabled={loader ? true : false}
            type="submit"
            className="loginBtn bg-green-900 text-light p-2 rounded-md block w-full"
          >
            {loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle}  /> : 'ورود'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

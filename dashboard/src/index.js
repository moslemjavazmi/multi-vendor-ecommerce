//src/index.js
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import store from "./store/index";
import { Provider } from "react-redux";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
const App = lazy(() => import("./App"));
document.documentElement.setAttribute("dir", "rtl");
document.documentElement.setAttribute("lang", "fa");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback="در حال بارگذاری ...">
        <App />
        <Toaster
          toastOptions={{
            position: "top-right",
            style: {
              background: "#283046",
              color: "white",
            },
          }}
        />
      </Suspense>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();

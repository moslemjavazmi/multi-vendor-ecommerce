import React, { useEffect, useState, useRef } from "react";

import adminImage from "../../assets/admin.jpg";
import sellerImage from "../../assets/seller.png";

const SellerToAdmin = () => {
  const scrollRef = useRef();

  const [text, setText] = useState("");

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-blue-mode px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div className="w-full md:pl-4">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                <div className="relative">
                  <img
                    className="w-[42px] h-[42px] border-green-500 border-2 max-w-[42px] p-[2px] rounded-full"
                    src={adminImage}
                    alt=""
                  />
                </div>
                <h2 className="text-base text-white font-semibold">Support</h2>
              </div>
            </div>
            <div className="py-4">
              <div className="bg-blue-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto"></div>
            </div>
            <form className="flex gap-3">
              <input
                required
                value={text}
                className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]"
                type="text"
                placeholder="input your message"
              />
              <button className="shadow-lg bg-cyan-500 hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToAdmin;

import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
// import Pagination from "../Pagination";
// import { useSelector, useDispatch } from "react-redux";
// import { get_admin_orders } from "../../store/Reducers/OrderReducer";
function Orders() {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-dashboard-mode rounded-md">
        <div className="flex justify-between items-center">
          <select
            name=""
            id=""
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-blue-mode border border-slate-700 rounded-md text-light"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <input
            type="text"
            name=""
            id=""
            placeholder="جستجو"
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-blue-mode border border-slate-700 rounded-md text-light"
          />
        </div>
        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left [#d0d2d6]">
            <div className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <div className="flex justify-between items-start">
                <div className="py-3 w-[25%]">Order Id</div>
                <div className="py-3 w-[13%]">Price</div>
                <div className="py-3 w-[18%]">Payment Status</div>
                <div className="py-3 w-[18%]">Order Status</div>
                <div className="py-3 w-[18%]">Action</div>
                <div className="py-3 w-[8%]">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
            <div className="text-[#d0d2d6]">
              <div className="flex justify-between items-start border-b border-slate-700">
                <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                  ssssss
                </div>
                <div className="py-4 w-[13%]">$88888</div>
                <div className="py-4 w-[18%]">88444</div>
                <div className="py-4 w-[18%]">484884</div>
                <div className="py-4 w-[18%]">
                  <div className="flex justify-start items-start border-b border-slate-700">
                    <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                      $8484848484
                    </div>
                    <div className="py-4 w-[13%]">$7373773</div>
                    <div className="py-4 w-[18%]">8484884</div>
                    <div className="py-4 w-[18%]">88449449</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;

import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { current } from "@reduxjs/toolkit";
import Pagination from "../Pagination";
export default function SellerRequest() {
    // const dispatch = useDispatch()
    // const { totalOrder, myOrders } = useSelector(state => state.order)
    const [currentPage, setCurrentPage] = useState(1)
    // const [searchValue, setSearchValue] = useState('')
    const [perPage, setPerPage] = useState(5)
    // const [show, setShow] = useState('')
  
  
    // useEffect(() => {
    //     dispatch(get_admin_orders({
    //         parPage: parseInt(perPage),
    //         page: parseInt(currentPage),
    //         searchValue
    //     }))
    // }, [perPage,currentPage,searchValue])
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
                    <div className="py-3 ml-5 w-[25%]">شماره</div>
                    <div className="py-3 w-[13%]">نام و نام خانوادگی</div>
                    <div className="py-3 w-[18%]">ایمیل</div>
                    <div className="py-3 w-[18%]">وضعیت پرداخت</div>
                    <div className="py-3 w-[18%]">وضعیت</div>
                    <div className="py-3 w-[18%]">فعالیت</div>
                    <div className="py-3 w-[8%]">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                </div>
                <div className="text-[#d0d2d6]">
                  <div className="flex justify-between items-start border-b border-slate-700">
                    <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                      65
                    </div>
                    <div className="py-3 w-[13%]">محمد</div>
                    <div className="py-3 w-[18%]">m.dsf@gmail.com</div>
                    <div className="py-3 w-[18%]">پرداخت شده</div>
                    <div className="py-3 w-[18%]">درحال بررسی</div>
                    <div className="py-3 w-[18%]">فعال</div>
                    {/* <div className="py-4 w-[18%]">
                      <div className="flex justify-start items-start border-b border-slate-700">
                        <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                          فعال
                        </div>
                        <div className="py-4 w-[13%]">درحال بررسی</div>
                        <div className="py-4 w-[18%]">فعال</div>
                      </div>
                    </div> */}
                  </div>
                </div>

              </div>
            </div>
            {/* <Pagination /> */}
            <Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} totalItem={50} perPage={perPage} showItems={5}  />
          </div>
        </div>
  )
}

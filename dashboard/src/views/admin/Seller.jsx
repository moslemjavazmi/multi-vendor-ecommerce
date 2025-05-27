import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
// import { current } from "@reduxjs/toolkit";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";

export default function Seller() {
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
                 <table className="w-full text-sm text-left [#d0d2d6]">
                   <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                     <tr className="flex justify-between items-start">
                       <th className="py-3 w-[25%]">Order Id</th>
                       <th className="py-3 w-[13%]">Price</th>
                       <th className="py-3 w-[18%]">Payment Status</th>
                       <th className="py-3 w-[18%]">Order Status</th>
                       <th className="py-3 w-[18%]">Action</th>
                       <th className="py-3 w-[8%]">
                       </th>
                     </tr>
                   </thead>
                   <tbody className="text-[#d0d2d6]">
                     <tr className="flex justify-between items-start border-b border-slate-700">

                       <td className="py-4 w-[13%]">$88888</td>
                       <td className="py-4 w-[18%]">88444</td>
                       <td className="py-4 w-[18%]">484884</td>
                       <td className="py-4 w-[18%]">
                       <div className='flex justify-start items-center gap-4'>
                                            <Link to={`/admin/dashboard/seller/details/1`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>
                                        </div>
                       </td>
                     </tr>
                   </tbody>

                 </table>
               </div>
               {/* <Pagination /> */}
               <Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} totalItem={50} perPage={perPage} showItems={5}  />
             </div>
           </div>
  )
}

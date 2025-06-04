import React from "react";

const OrderDetails = () => {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-blue-mode rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <select
            name=""
            id=""
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-blue-mode border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="warehouse">warehouse</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
        <div className="p-4">
          <div className="flex gap-2 text-lg text-[#d0d2d6]">
            <h2>#order._id</h2>
            <span>order.date</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[32%]">
              <div className="pr-3 text-[#d0d2d6] text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver to : order.shippingInfo
                  </h2>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Payment Status : </h2>
                  <span className="text-base">order.payment_status</span>
                </div>
                <span>Price : $order.price</span>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="text-[#d0d2d6] flex flex-col gap-6">
                    <div className="flex gap-3 text-md">
                      <img
                        className="w-[45px] h-[45px]"
                        src="/images/logo.png"
                        alt=""
                      />
                      <div>
                        <h2>p.name</h2>
                        <p>
                          <span>Brand : </span>
                          <span>p.brand </span>
                          <span className="text-lg">Quantity : p.quantity</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

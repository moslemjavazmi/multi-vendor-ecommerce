import React, { useEffect, useState } from 'react'

const OrderDetails = () => {


    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4  bg-[#283046] rounded-md'>
                <div className='flex justify-between items-center p-4'>
                    <h2 className='text-xl text-[#d0d2d6]'>Order Details</h2>
                    <select   name="" id="" className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="pending">درحال انتظار</option>
                        <option value="processing">درحال پردازش</option>
                        <option value="warehouse">انبار</option>
                        <option value="placed">انحام شده</option>
                        <option value="cancelled">کنسل شد</option>
                    </select>
                </div>
                <div className='p-4'>
                    <div className='flex gap-2 text-lg text-[#d0d2d6]'>
                        <h2>order id</h2>
                        <span>order date</span>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-[32%]'>
                            <div className='pr-3 text-[#d0d2d6] text-lg'>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='pb-2 font-semibold'>Deliver to : order.shippingInfo?.name</h2>
                                    <p><span className='text-sm'>$order.shippingInfo?.address   order.shippingInfo?.province order.shippingInfo?.cityorder.shippingInfo?.area</span></p>
                                </div>
                                <div className='flex justify-start items-center gap-3'>
                                    <h2>Payment Status : </h2>
                                    <span className='text-base'>order.payment_status</span>
                                </div>
                                <span>Price : order.price</span>
                                <div className='mt-4 flex flex-col gap-8'>
                                    <div className='text-[#d0d2d6]'>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-[68%]'>
                            <div className='pl-3'>
                                <div className='mt-4 flex flex-col'>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
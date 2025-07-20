import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  get_seller,
  seller_status_update,
  messageClear
} from "../../store/Reducers/sellerReducer";
const SellerDetails = () => {
  const dispatch = useDispatch();
  const { seller, successMessage } = useSelector((state) => state.seller);
  const { sellerId } = useParams();
  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId]);
  console.log("seller", seller);

  const [status, setStatus] = useState("");
  const submit = (e) => {
    e.preventDefault();
    dispatch(
      seller_status_update({
        sellerId,
        status
      })
    );
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);

      dispatch(messageClear());
    }
  }, [successMessage]);
  useEffect(() => {
    if (seller) {
      setStatus(seller.status);
    }
  }, [seller]);
  return (
    <div>
      <div className="px-2 lg:px-7 pt-5">
        <div className="w-full p-4  bg-blue-mode rounded-md">
          <div className="w-full flex flex-wrap text-[#d0d2d6]">
            <div className="w-3/12 flex justify-center items-center py-3">
              <div>
                {seller?.image ? (
                  <img
                    className="w-full h-[150px] rounded-full"
                    src={`http://localhost:5000/${seller?.image}`}
                    alt=""
                  />
                ) : (
                  <span>تصویر آپلود نشده</span>
                )}
              </div>
            </div>
            <div className="w-4/12 m-auto">
              <div className="px-0 md:px-5 py-2">
                <div className="py-2 text-lg">
                  <h2>اطلاعات پایه</h2>
                </div>
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-blue-mode rounded-md">
                  <div className="flex gap-2">
                    <span>نام فروشنده : </span>
                    <span>{seller?.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>ایمیل : </span>
                    <span>{seller?.email}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>نقش : </span>
                    <span>{seller?.role}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>وضعیت : </span>
                    <span>{seller?.status}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>وضعیت پرداخت : </span>
                    <span>{seller?.payment}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-4/12 m-auto">
              <div className="px-0 md:px-5 py-2">
                <div className="py-2 text-lg">
                  <h2>آدرس</h2>
                </div>
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-blue-mode rounded-md">
                  <div className="flex gap-2">
                    <span>نام فروشگاه : </span>
                    <span>{seller?.shopInfo?.shopName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>استان : </span>
                    <span>{seller?.shopInfo?.division}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>شهرستان : </span>
                    <span>{seller?.shopInfo?.district}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>شهر: </span>
                    <span>{seller?.shopInfo?.sub_district}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form onSubmit={submit}>
              <div className="flex gap-4 py-3">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-blue-mode border border-slate-700 rounded-md text-dark"
                  name=""
                  required
                  id=""
                >
                  <option value="">--انتخاب وضعیت--</option>
                  <option value="active">فعال</option>
                  <option value="deactive">غیر فعال</option>
                </select>
                <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 w-[170px] ">
                  ذخیره
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;

import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiKnightBanner } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination";
import Search from "../components/Search";
import { getProducts } from "../../store/Reducers/productReducer";
const Products = () => {
  const dispatch = useDispatch();
  const { products, totalProduct } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue
    };
    dispatch(getProducts(obj));
  }, [searchValue, currentPage, perPage]);
  console.log("products", products);
  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-blue-mode rounded-md">
        <Search
          setPerPage={setPerPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6]  border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  ردیف
                </th>
                <th scope="col" className="py-3 px-4">
                  تصویر محصول
                </th>
                <th scope="col" className="py-3 px-4">
                  نام
                </th>
                <th scope="col" className="py-3 px-4">
                  دسته
                </th>
                <th scope="col" className="py-3 px-4">
                  برند
                </th>
                <th scope="col" className="py-3 px-4">
                  قیمت
                </th>
                <th scope="col" className="py-3 px-4">
                  تخفیف
                </th>
                <th scope="col" className="py-3 px-4">
                  تعداد
                </th>
                <th scope="col" className="py-3 px-4">
                  ویرایش
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {i + 1}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <img
                      className="w-[45px] h-[45px]"
                      src={`http://localhost:5000/${d.images[0]}`}
                      alt=""
                    />
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d?.name?.slice(0, 16)}...</span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.category}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.brand}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>
                      {d.price}
                      <span className="text-xs text-gray-500">{"  "}تومان</span>
                    </span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.discount === 0 ? (
                      <span>بدون تخفیف</span>
                    ) : (
                      <span>
                        {d.discount}
                        <span className="text-xs text-gray-500">
                          {"  "}تومان
                        </span>
                      </span>
                    )}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.stock}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/seller/dashboard/edit-product/${d._id}`}
                        className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                      >
                        <FaEdit />
                      </Link>
                      <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        <FaEye />
                      </Link>
                      <button className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                        <FaTrash />
                      </button>
                      <Link
                        to={`/seller/dashboard/add-banner/${d._id}`}
                        className="p-[6px] bg-cyan-500 rounded hover:shadow-lg hover:shadow-cyan-500/50"
                      >
                        <GiKnightBanner />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalProduct <= perPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              perPage={perPage}
              showItem={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

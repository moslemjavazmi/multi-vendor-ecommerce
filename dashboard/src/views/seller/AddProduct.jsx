import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import Category from "./../admin/Category";
import { all } from "axios";

export default function AddProduct() {
  const Categorys = [
    {
      id: 1,
      name: "Laptop"
    },
    {
      id: 2,
      name: "Mobile"
    },
    {
      id: 3,
      name: "Tablet"
    },
    {
      id: 4,
      name: "Camera"
    },
    {
      id: 5,
      name: "Watch"
    }
  ];
  const [state, setState] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    description: "",
    image: "",
    quantity: ""
  });
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState(Categorys);
  const [searchValue, setSearchValue] = useState("");

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (i) => i.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(Categorys);
    }
  };
  // useEffect(() => {
  //   setAllCategory(Categorys);
  // }, []);
  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Add Product</h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
            to="/seller/dashboard/products"
          >
            Products
          </Link>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  type="text"
                  placeholder="product name"
                  onChange={handleInput}
                  value={state.name}
                  name="name"
                  id="name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Product brand</label>
                <input
                  onChange={handleInput}
                  value={state.brand}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  type="text"
                  placeholder="product brand"
                  name="brand"
                  id="brand"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  name="category"
                  onClick={() => setCateShow(!cateShow)}
                  onChange={handleInput}
                  value={category}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  type="text"
                  placeholder="--select category--"
                  id="category"
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      name="search"
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                    {allCategory.map((c, i) => (
                      <span
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          category === c.name && "bg-indigo-500"
                        }`}
                        onClick={() => {
                          setCateShow(false);
                          setCategory(c.name);
                          setSearchValue("");
                          setAllCategory(Categorys);
                        }}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Stock</label>
                <input
                  onChange={handleInput}
                  value={state.stock}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  type="number"
                  min="0"
                  placeholder="product stock"
                  name="stock"
                  id="stock"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  type="number"
                  min="0"
                  onChange={handleInput}
                  value={state.price}
                  placeholder="price"
                  name="price"
                  id="price"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  min="0"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  type="number"
                  placeholder="%discount%"
                  onChange={handleInput}
                  value={state.discount}
                  name="discount"
                  id="discount"
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="description">Description</label>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]"
                htmlFor="image"
              >
                <span>
                  <BsImages />
                </span>
                <span>select image</span>
              </label>
              <input className="hidden" type="file" id="image" />
            </div>
            <div className="flex">
              <button className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
                ثبت
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

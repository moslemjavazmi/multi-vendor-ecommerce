//dashboard/src/views/seller/EditProduct.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { getCategory } from "../../store/Reducers/categoryReducer";
import api from "../../api/api";
import {
  get_product,
  update_product,
  product_image_update,
  messageClear
} from "../../store/Reducers/productReducer";
import JoditEditor from "jodit-react";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { overrideStyle } from "../../utils/utils";
const EditProduct = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { ProductId } = useParams();
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.category);
  const { product, loader, errorMessage, successMessage } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(
      getCategory({
        searchValue: "",
        perPage: "",
        page: ""
      })
    );
  }, []);
  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: ""
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    dispatch(get_product(ProductId));
  }, [ProductId]);

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categorys);
    }
  };
  const [imageShow, setImageShow] = useState([]);

  // const changeImage = (img, files) => {
  //   if (files.length > 0) {
  //     dispatch(
  //       product_image_update({
  //         oldImage: img,
  //         newImage: files[0],
  //         productId: ProductId
  //       })
  //     );
  //   }
  // };
  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        product_image_update({
          oldImage: img,
          newImage: files[0],
          productId: ProductId
        })
      ).then(() => {
        dispatch(get_product(ProductId));
      });
    }
  };

  useEffect(() => {
    setState({
      name: product.name,
      description: product.description,
      discount: product.discount,
      price: product.price,
      brand: product.brand,
      stock: product.stock
    });
    setContent(product.description);
    setCategory(product.category);
    setImageShow(product.images);
  }, [product]);
  useEffect(() => {
    if (categorys.length > 0) {
      setAllCategory(categorys);
    }
  }, [categorys]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
  // تابع برای افزودن تصاویر جدید
  const addNewImages = (e) => {
    if (e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setNewImages((prev) => [...prev, ...files]);
    }
  };

  // تابع برای حذف تصاویر جدید قبل از آپلود
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // تابع برای آپلود تصاویر جدید
  const uploadNewImages = async () => {
    if (newImages.length === 0) return;

    try {
      const formData = new FormData();

      // استفاده از نام صحیح فیلد
      newImages.forEach((img) => formData.append("newImages[]", img));

      formData.append("productId", ProductId);

      const { data } = await api.post("/product-add-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true // اطمینان از ارسال کوکی‌ها
      });

      if (data.success) {
        toast.success("تصاویر جدید با موفقیت اضافه شدند");
        setNewImages([]);
        dispatch(get_product(ProductId));
      }
    } catch (error) {
      console.error("Upload error:", error);

      // نمایش پیام خطای مناسب
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("خطا در آپلود تصاویر");
      }
    }
  };
  // در EditProduct.jsx
  const deleteImage = async (img) => {
    if (window.confirm("آیا مطمئنید می‌خواهید این تصویر را حذف کنید؟")) {
      try {
        await api.post("/product-delete-image", {
          productId: ProductId,
          image: img
        });
        toast.success("تصویر با موفقیت حذف شد");
        dispatch(get_product(ProductId)); // دریافت مجدد محصول
      } catch (error) {
        toast.error("خطا در حذف تصویر");
      }
    }
  };
  const update = (e) => {
    e.preventDefault();
    const obj = {
      name: state.name,
      description: state.description,
      discount: state.discount,
      price: state.price,
      brand: state.brand,
      stock: state.stock,
      productId: ProductId
    };
    console.log(obj);
    dispatch(update_product(obj));
  };
  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-blue-mode rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">ویرایش محصول</h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
            to="/seller/dashboard/products"
          >
            محصولات
          </Link>
        </div>
        <div>
          <form onSubmit={update}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">نام محصول</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-blue-mode border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  placeholder="product name"
                  name="name"
                  id="name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">برند محصول</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-blue-mode border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  placeholder="product brand"
                  name="brand"
                  id="brand"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">دسته محصول</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-blue-mode border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={category}
                  type="text"
                  placeholder="--select category--"
                  id="category"
                />
                <div
                  className={`absolute top-[101%] bg-blue-mode w-full transition-all  z-10 ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scrool">
                    {allCategory.length > 0 &&
                      allCategory.map((c, i) => (
                        <span
                          key={i}
                          className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                            category === c.name && "bg-indigo-500"
                          }`}
                          onClick={() => {
                            setCateShow(false);
                            setCategory(c.name);
                            setSearchValue("");
                            setAllCategory(categorys);
                          }}
                        >
                          {c.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">تعداد</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-blue-mode border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.stock}
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
                <label htmlFor="price">قیمت</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-blue-mode border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  placeholder="price"
                  name="price"
                  id="price"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">تخفیف</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-blue-mode border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  placeholder="%discount%"
                  name="discount"
                  id="discount"
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="description">توضیحات تکمیلی</label>
              <JoditEditor
                ref={editor}
                value={content}
                // config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShow &&
                imageShow.length > 0 &&
                imageShow.map((img, i) => (
                  <div key={i}>
                    <label className="h-[180px]" htmlFor={i}>
                      <img
                        className="h-[150px] w-full object-fill"
                        src={`http://localhost:5000/${img}`}
                        alt=""
                      />
                    </label>
                    <input
                      onChange={(e) => changeImage(img, e.target.files)}
                      type="file"
                      id={i}
                      className="hidden"
                    />
                    <button
                      onClick={() => deleteImage(img)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                    >
                      <IoCloseSharp />
                    </button>
                  </div>
                ))}
              {/* پیش‌نمایش تصاویر جدید */}
              {newImages.map((img, i) => (
                <div key={`new-${i}`} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="h-[150px] w-full object-fill"
                  />
                  <button
                    onClick={() => removeNewImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              ))}
              {/* افزودن تصاویر جدید */}
              <div>
                <label
                  className="flex justify-center items-center flex-col h-[150px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]"
                  htmlFor="new_images"
                >
                  <span>
                    <BsImages />
                  </span>
                  <span>انتخاب عکس</span>
                </label>
                <input
                  onChange={addNewImages}
                  type="file"
                  id="new_images"
                  className="hidden"
                  multiple
                />
              </div>
            </div>

            <div className="flex justify-around">
              {/* دکمه آپلود تصاویر جدید */}
              {newImages.length > 0 && (
                <div className="mr-3">
                  <button
                    type="button"
                    onClick={uploadNewImages}
                    className="bg-green-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                  >
                    آپلود {newImages.length} تصویر جدید
                  </button>
                </div>
              )}
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "ذخیره"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

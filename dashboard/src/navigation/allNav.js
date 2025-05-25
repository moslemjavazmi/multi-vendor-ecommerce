// import { AiFillDashboard, AiOutlineShopping } from "react-icons/ai";
// export const allNav = [
//   {
//     id: 1,
//     title: "داشبورد",
//     icon: <AiFillDashboard />,
//     role: "admin",
//     path: "/admin/dashboard"
//   },
//   {
//     id: 2,
//     title: "سفارشات",
//     icon: <AiOutlineShopping />,
//     role: "admin",
//     path: "/admin/orders"
//   }
// ];

import {
  AiFillDashboard,
  AiOutlineShoppingCart,
  AiOutlinePlus
} from "react-icons/ai";
import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { CiChat1 } from "react-icons/ci";
import { BsCurrencyDollar, BsChat } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
export const allNav = [
  {
    id: 1,
    title: "دشبورد",
    icon: <AiFillDashboard />,
    role: "admin",
    path: "/admin/dashboard"
  },
  {
    id: 2,
    title: "سفارشات",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/dashboard/orders"
  },
  {
    id: 3,
    title: "دسته بندی",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/dashboard/category"
  },
  {
    id: 4,
    title: "فروشندگان",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/dashboard/sellers"
  },
  {
    id: 5,
    title: "درخواست پرداخت",
    icon: <BsCurrencyDollar />,
    role: "admin",
    path: "/admin/dashboard/payment-request"
  },
  {
    id: 6,
    title: "فروشندگان غیرفعال",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/dashboard/deactive-sellers"
  },
  {
    id: 7,
    title: "درخواست فروشندگان",
    icon: <BiLoaderCircle />,
    role: "admin",
    path: "/admin/dashboard/sellers-request"
  },
  {
    id: 8,
    title: "چت فروشندگان",
    icon: <CiChat1 />,
    role: "admin",
    path: "/admin/dashboard/chat-sellers"
  },
  {
    id: 9,
    title: "داشبورد",
    icon: <AiFillDashboard />,
    role: "seller",
    path: "/seller/dashboard"
  },
  {
    id: 10,
    title: "افزودن محصول",
    icon: <AiOutlinePlus />,
    role: "seller",
    path: "/seller/dashboard/add-product"
  },
  {
    id: 11,
    title: "محصولات",
    icon: <RiProductHuntLine />,
    role: "seller",
    path: "/seller/dashboard/products"
  },
  // {
  //     id: 11,
  //     title: 'All Banner',
  //     icon: <RiProductHuntLine />,
  //     role: 'seller',
  //     path: '/seller/dashboard/banners'
  // },

  {
    id: 12,
    title: "محصولات تخفیف",
    icon: <RiProductHuntLine />,
    role: "seller",
    path: "/seller/dashboard/discount-products"
  },
  {
    id: 13,
    title: "سفارشات",
    icon: <AiOutlineShoppingCart />,
    role: "seller",
    path: "/seller/dashboard/orders"
  },
  {
    id: 14,
    title: "پرداخت ها",
    icon: <BsCurrencyDollar />,
    role: "seller",
    path: "/seller/dashboard/payments"
  },
  {
    id: 15,
    title: "چت مشتریان",
    icon: <BsChat />,
    role: "seller",
    path: "/seller/dashboard/chat-customer"
  },
  {
    id: 16,
    title: "چت پشتیبانی",
    icon: <CiChat1 />,
    role: "seller",
    path: "/seller/dashboard/chat-support"
  },
  {
    id: 17,
    title: "پروفایل",
    icon: <FiUsers />,
    role: "seller",
    path: "/seller/dashboard/profile"
  }
];

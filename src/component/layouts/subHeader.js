// import React, { useEffect, useState } from "react";
// import { Fragment } from "react";
// import "./subHeader.css";
// import { Link, withRouter } from "react-router-dom";
// import { logoutHandler } from "../../store/actions/usersAction";
// import { getOrderDeliver } from "../../store/actions/orderAction";
// import { connect, useDispatch, useSelector } from "react-redux";
// import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
// import { toast } from "react-toastify";
// import Toast from "../home/toast";
// import { useHistory } from "react-router-dom";
// import Notify from "./notify";
// import User from "../home/user";
// import Slider from "react-slick";

// const SubHeader = ({ show }) => {
//   const [amout, setAmount] = useState(0);
//   const [order, setOrder] = useState(0);
//   // const [showHeader, setShowHeader] = useState(true);
//   const [showOps, setShowOps] = useState(false);
//   // const isLogin = useSelector((state) => state.isLogin);
//   const lengthOfCart = useSelector((state) => state.cart.cartItem.length);
//   const isEmpty = useSelector((state) => state.cart.empty);
//   const isLogin = useSelector((state) => state.login.role);
//   const deliver = useSelector((state) => state.orderInfo.deliver);
//   const listProducts = useSelector((state) => state.getAllProducts.products);
//   const [search, setSearch] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const [isSignin, setSignIn] = useState(false);
//   const [result, setResult] = useState(true);
//   const [dspMore, setDspMore] = useState(false);
//   // const [listProducts, setListProducts] = useState([]);


//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     prevArrow: null,
//     nextArrow: null,
//   };
//   const dispatch = useDispatch();
//   const history = useHistory;
//   // const logout = async () => {
//   //   dispatch(logoutHandler());
//   //   if (isLogin === false) {
//   //     toast.success(<Toast message="Đăng xuất thành công" />, {
//   //       className: "success",
//   //     });
//   //     history.push("/");
//   //   }
//   // };
//   useEffect(() => {
//     // Kiểm tra sự thay đổi trong cartItem.length và cập nhật amout
//     if (isLogin === 1) {
//       if (amout !== lengthOfCart) {
//         setAmount(lengthOfCart);
//       }

//       // Kiểm tra sự thay đổi trong countOrder.deliver.length và cập nhật order
//       if (deliver !== null) {
//         if (order !== deliver.length) {
//           setOrder(deliver.length);
//         }
//       }
//     }
//   }, [amout, order, lengthOfCart, deliver, isLogin]);

//   useEffect(() => {
//     if (isEmpty === true) {
//       setAmount(0);
//     } else {
//       setAmount(lengthOfCart);
//     }
//     if (isLogin === 1) {
//       dispatch(getOrderDeliver());
//       if (deliver !== null) {
//         if (deliver.length > 0) {
//           setOrder(deliver.length);
//         } else setOrder(0);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     show(showOps);
//   }, [showOps]);

//   const showOptions = () => {
//     setShowOps(!showOps);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowOps(false);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleSearch = () => {
//     let text = searchText.toLowerCase();
//     if (text !== "") {
//       let searchProduct = [...products].filter((item) =>
//         item.name.toLowerCase().includes(text)
//       );
//       let searchResult = searchProduct.slice(0, 4);
//       if (searchProduct.length === 0) {
//         setResult(false);
//         setListProducts([]);
//         setDspMore(false);
//       } else if (searchProduct.length > 4) {
//         setDspMore(true);
//         setListProducts(searchResult);
//         setResult(true);
//       } else {
//         setListProducts(searchResult);
//         setResult(true);
//         setDspMore(false);
//       }
//     } else {
//       setListProducts([]);
//     }
//   };
//   return (
//     <Fragment>
//       <header className="sub_header me-0">
//         <div className="header_top">
//           <div className={isLogin === 0 ? "row_header" : "row_sub row_header"}>
//             <div className="col_a">
//               {/* <img src="./logo_sub.png" alt="" className="icon_logo" /> */}
//               <button className="icon_nav" onClick={showOptions}>
//                 {showOps ? (
//                   <i className="fa-solid fa-xmark"></i>
//                 ) : (
//                   <i className="fa-solid fa-bars"></i>
//                 )}
//               </button>
//             </div>
//             <div className="text-center">
//               <div className="logo text-center">
//                 <p>Swans Lux</p>
//               </div>
//             </div>
//             <div className="col_b float-end me-4 mt-3 top_right">
//               <div className="d-inline-block search" onClick={() => setSearch(!search)}>
//                 <i className="fa-solid fa-magnifying-glass"></i>
//               </div>
//               <div className="d-inline-block ms-4 alert position-relative">
//                 <i className="fa-regular fa-bell noti_icon"></i>
//                 <div className="alert_frame">
//                   <Notify />
//                 </div>
//               </div>
//               <div className="d-inline-block">
//                 {isLogin === 0 ? (
//                   <User />
//                 ) : (
//                   <div className="d-inline-block signin ms-3">
//                     <Link
//                       to={`/login/${1}`}
//                       className="btn_links d-inline-block"
//                     >
//                       {" "}
//                       Đăng Nhập
//                     </Link>
//                     <Link
//                       to={`/login/${2}`}
//                       className="btn_links sign_up d-inline-block position-relative"
//                     >
//                       {" "}
//                       Đăng Ký
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               {/* </div> */}
//             </div>
//             <div className="show_options">
//               <div className={showOps ? "brand_logo" : "d-hide"}>
//                 {/* <img className="" src="./logo_sub.png" alt="" /> */}
//                 <div className={showOps ? "brand_logo_icon" : "d-hide"}>
//                   <ArrowDropDownRoundedIcon />
//                 </div>
//               </div>
//               <div className={showOps ? "stick_nav" : "d-hide" + " me-3"}>
//                 <div className="row align-items-center justify-content-around">
//                   <div className="sticky-header">
//                     <div className="row align-items-center">
//                       <div className="main_menu text-center">
//                         <ul>
//                           <li>
//                             <Link to="/" className="text-decoration-none fs-2">
//                               Trang Chủ
//                             </Link>
//                           </li>
//                           <li>
//                             <Link
//                               to="/products"
//                               className="text-decoration-none fs-2"
//                             >
//                               Trang sức
//                             </Link>
//                           </li>
//                           <li>
//                             <Link
//                               to="/intro"
//                               className="text-decoration-none fs-2"
//                             >
//                               Đồng hồ
//                             </Link>
//                           </li>
//                           <li>
//                             <Link
//                               to="/products"
//                               className="text-decoration-none fs-2"
//                             >
//                               Trang sức cưới
//                             </Link>
//                           </li>
//                           <li>
//                             <Link
//                               to="/products"
//                               className="text-decoration-none fs-2"
//                             >
//                               Phụ kiện & Quà tặng
//                             </Link>
//                           </li>
//                           <li>
//                             <Link
//                               to="/intro"
//                               className="text-decoration-none fs-2"
//                             >
//                               Giới thiệu
//                             </Link>
//                           </li>
//                           <li>
//                             <Link
//                               to="/contact"
//                               className="text-decoration-none fs-2"
//                             >
//                               Liên Hệ
//                             </Link>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={`div_search ${search ? "show" : ""}`}>
//           <div className="input_search">
//             <input
//               type="text"
//               className="col-5"
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//             <Link
//               to={`/products/${searchText !== "" ? searchText : "none"}`}
//               className="col-5"
//             >
//               <i className="fa-solid fa-magnifying-glass"></i>
//               Search
//             </Link>
//           </div>
//           <div className="row justify-content-center">
//             {result ? (
//               listProducts.map((product) => (
//                 <div className="my-3 card_search">
//                   <img
//                     src={`http://localhost:3005/uploads/${
//                       product.image.split(",")[2]
//                     }`}
//                     alt=""
//                     className="h-100 w-100"
//                   />
//                   <div className="search_card_hover">
//                     <Slider {...settings}>
//                       {product.image.split(",").map((image) => (
//                         <img
//                           src={`http://localhost:3005/uploads/${image}`}
//                           className="image_slide"
//                         />
//                       ))}
//                     </Slider>

//                     <div className="product_name mt-4">
//                       <h5 className="text-center mb-0">{product.name}</h5>
//                     </div>
//                     <div className="text-end mt-3 me-2">
//                       <div className="d-inline-block me-2">
//                         <LocalOfferIcon />
//                       </div>
//                       <span>
//                         {Intl.NumberFormat("vi-VN", {
//                           style: "currency",
//                           currency: "VND",
//                         }).format(product.price)}
//                       </span>
//                       {/* </div> */}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="search_notfound">
//                 <img src="./not_found.png" alt="" />
//                 <p>Không tìm thấy sản phẩm phù hợp</p>
//               </div>
//             )}
//           </div>
//           <div className="text-end mt-3">
//             <Link
//               to={`/products/${searchText !== "" ? searchText : "none"}`}
//               className={dspMore ? "d_more" : "d-none"}
//             >
//               <KeyboardDoubleArrowRightIcon />
//             </Link>
//           </div>
//         </div>
//       </header>
//     </Fragment>
//   );
// };

// export default SubHeader;

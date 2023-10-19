import "./header.css";
import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Notify from "../layouts/notify";
import User from "./user";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { logoutHandler } from "../../store/actions/usersAction";
import { getOrderDeliver } from "../../store/actions/orderAction";
import CancelIcon from "@material-ui/icons/Cancel";
import Toast from "./toast";
import { toast } from "react-toastify";
import { Fragment } from "react";
import { fetchProducts } from "../../store/actions/productsAction";
import Slider from "react-slick";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { saveDetail } from "../../store/actions/productsAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = ({ type, option }) => {
  const dispatch = useDispatch();
  const { role, user } = useSelector((state) => state.login);
  const products = useSelector((state) => state.getAllProducts.products);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [listProducts, setListProducts] = useState([]);
  const [dspMore, setDspMore] = useState(false);
  const [showHeader, setShowHeader] = useState(type === 1 ? true : false);
  const [showOps, setShowOps] = useState(false);
  const [isSignin, setSignIn] = useState(false);
  const [result, setResult] = useState(true);
  const history = useHistory();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: null,
    nextArrow: null,
  };

  useEffect(() => {
    autoLogout();
    if (role === 0) {
      dispatch(getOrderDeliver());
      setSignIn(true);
    } else {
      setSignIn(false);
    }
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      console.log(type);
      if (type === 1) {
        if (currentPosition < 200) {
          setShowHeader(true);
          setShowOps(false);
        } else {
          setShowHeader(false);
          setShowOps(false);
        }
        setSearch(false);
      } else {
        if (currentPosition < 200) {
          setShowOps(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const showOptions = () => {
    setShowOps(!showOps);
  };
  const autoLogout = async () => {
    const now = new Date();
    const isActive = await JSON.parse(localStorage.getItem("isactive"));
      if (isActive && now.getTime() > isActive.expiry) {
        await dispatch(logoutHandler());
      }
  };

  useEffect(() => {
    if (role === 0) {
      dispatch(getOrderDeliver());
      setSignIn(true);
    } else {
      setSignIn(false);
    }
    console.log(type);
    if (type === 1) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  }, [role, type]);

  const handleSearch = () => {
    let text = searchText.toLowerCase();
    if (text !== "") {
      let searchProduct = [...products].filter((item) =>
        item.name.toLowerCase().includes(text)
      );
      let searchResult = searchProduct.slice(0, 4);
      if (searchProduct.length === 0) {
        setResult(false);
        setListProducts([]);
        setDspMore(false);
      } else if (searchProduct.length > 4) {
        setDspMore(true);
        setListProducts(searchResult);
        setResult(true);
      } else {
        setListProducts(searchResult);
        setResult(true);
        setDspMore(false);
      }
    } else {
      setListProducts([]);
    }
  };

  useEffect(() => {
    handleSearch();
    dispatch(fetchProducts());
  }, [searchText]);

  useEffect(() => {
    if (typeof option === "function") {
      option(showOps);
    }
  }, [showOps]);

  const getDetail = (detail) => {
    dispatch(saveDetail(detail));
    history.push("/product/detail");
  };
  return (
    <Fragment>
      <header className="header_main position-relative">
        <nav>
          <div className={showHeader ? "position-relative z_index" : "stick"}>
            <div className="header_top">
              {/* <div className=""> */}
              <div className={`${isSignin ? "" : "notLogin"} row_header`}>
                <div className="col_header_a">
                  <button
                    className={showHeader ? "d-none" : "icon_nav"}
                    onClick={showOptions}
                  >
                    {showOps ? (
                      <i className="fa-solid fa-xmark"></i>
                    ) : (
                      <i className="fa-solid fa-bars"></i>
                    )}
                  </button>
                  <div className={showHeader ? "social_icone" : "d-none"}>
                    <ul>
                      <li>
                        <i className="fa-brands fa-facebook-f"></i>
                      </li>
                      <li>
                        <i className="fa-brands fa-twitter fs-5"></i>
                      </li>
                      <li>
                        <i className="fa-brands fa-instagram fs-5"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col_header_b float-end me-2 mt-3 top_right z_index">
                  <div
                    className="d-inline-block search"
                    onClick={() => setSearch(!search)}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <div className="d-inline-block ms-2 alert position-relative">
                    <i className="fa-regular fa-bell noti_icon"></i>
                    <div className="alert_frame">
                      <Notify />
                    </div>
                  </div>
                  <div className="d-inline-block">
                    {isSignin ? (
                      <User />
                    ) : (
                      <div className="d-inline-block signin ms-3">
                        <Link
                          to={`/login/${1}`}
                          className="btn_links d-inline-block"
                        >
                          {" "}
                          Đăng Nhập
                        </Link>
                        <Link
                          to={`/login/${2}`}
                          className="btn_links sign_up d-inline-block position-relative"
                        >
                          {" "}
                          Đăng Ký
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className={showHeader ? "nav-head" : "nav-head-show"}>
                  <div
                    className={
                      showHeader ? "position-relative" : "stick set_index h-0"
                    }
                  >
                    <div className="text-center">
                      <div
                        className={
                          showHeader ? "logo" : "logo_scroll" + " text-center"
                        }
                      >
                        <p>Swans Lux</p>
                        {/* <p>The Moon</p> */}

                        {/* <span className="and_word"> & </span> */}
                      </div>
                    </div>
                    <div
                      className={
                        showHeader || showOps ? "brand_logo" : "d-none"
                      }
                    >
                      <img
                        className=""
                        src={process.env.PUBLIC_URL + "/logo.png"}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={showHeader || showOps ? "d-block" : "d-none"}>
                    <div className={showOps ? "stick_nav" : "" + " me-3"}>
                      <div className="row align-items-center justify-content-around">
                        <div className="sticky-header">
                          <div className="row align-items-center">
                            <div className="main_menu text-center">
                              <ul>
                                <li>
                                  <Link
                                    to="/"
                                    className="text-decoration-none fs-2"
                                  >
                                    Trang Chủ
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`/products/${"none"}`}
                                    className="text-decoration-none fs-2"
                                  >
                                    Trang sức
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`/category/${"watch"}`}
                                    className="text-decoration-none fs-2"
                                  >
                                    Đồng hồ
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`/category/${"wedding"}`}
                                    className="text-decoration-none fs-2"
                                  >
                                    Trang sức cưới
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`/category/${"accessories"}`}
                                    className="text-decoration-none fs-2"
                                  >
                                    Phụ kiện & Quà tặng
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/intro"
                                    className="text-decoration-none fs-2"
                                  >
                                    Giới thiệu
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/contact"
                                    className="text-decoration-none fs-2"
                                  >
                                    Liên Hệ
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className={`div_search ${search ? "show" : ""}`}>
              <div className="input_search">
                <input
                  type="text"
                  className="col-5"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Link
                  to={`/products/${searchText !== "" ? searchText : "none"}`}
                  className="col-5"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                  Search
                </Link>
              </div>
              <div className="row justify-content-center">
                {result ? (
                  listProducts.map((product) => (
                    <div
                      onClick={() => getDetail(product)}
                      className="my-3 card_search"
                    >
                      <img
                        src={`http://localhost:3005/uploads/${
                          product.image.split(",")[2]
                        }`}
                        alt=""
                        className="h-100 w-100"
                      />
                      <div className="search_card_hover">
                        <Slider {...settings}>
                          {product.image.split(",").map((image) => (
                            <img
                              src={`http://localhost:3005/uploads/${image}`}
                              className="image_slide"
                            />
                          ))}
                        </Slider>

                        <div className="product_name mt-4">
                          <h5 className="text-center mb-0">{product.name}</h5>
                        </div>
                        <div className="text-end mt-3 me-2">
                          <div className="d-inline-block me-2">
                            <LocalOfferIcon />
                          </div>
                          <span>
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.price)}
                          </span>
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="search_notfound">
                    <img src="./not_found.png" alt="" />
                    <p>Không tìm thấy sản phẩm phù hợp</p>
                  </div>
                )}
              </div>
              <div className="text-end mt-3">
                <Link
                  to={`/products/${searchText !== "" ? searchText : "none"}`}
                  className={dspMore ? "d_more" : "d-none"}
                >
                  <KeyboardDoubleArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;

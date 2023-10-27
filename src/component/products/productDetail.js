import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import "./productDetail.css";
import Header from "../home/header";
import Footer from "../home/footer";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getCartItem } from "../../store/actions/cartAction";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReviewCard from "./reviewCard";
import Loading from "../layouts/loading";
const ProductDetail = () => {
  const [product, setProduct] = useState({});
  // const parameterValue = props.parameter;
  const [qty, setQty] = useState(1);
  const [arrayImages, setArrayImages] = useState([]);
  const detailProduct = useSelector((state) => state.getAllProducts.detail);
  const role = useSelector((state) => state.login.role);
  const isAdd = useSelector((state) => state.cart.isAdd);
  const dispatch = useDispatch();
  const [op, setOptions] = useState(false);
  const prevDetailProductRef = useRef(detailProduct);
  const [isAddToCart, setAddToCart] = useState(false);
  const history = useHistory();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    console.log(product.description)
    const prevDetailProduct = prevDetailProductRef.current;
    if (prevDetailProduct !== detailProduct) {
      setProduct(detailProduct);
    }
    prevDetailProductRef.current = detailProduct;
  }, [detailProduct, product]);

  useEffect(async () => {
    if (isAddToCart) {
      if (isAdd) {
        toast.success(<Toast message="Đã thêm vào giỏ hàng" />, {
          className: "success",
        });
        setQty(1);
        await dispatch(getCartItem());
      } else {
        toast.error(<Toast message="Đăng nhập để tiếp tục" />, {
          className: "fail",
        });
      }
      setAddToCart(false);
    }
  }, [isAdd, isAddToCart]);

  const handleAddToCart = async () => {
    if (role === 0) {
      dispatch(addToCart(detailProduct.id, qty));
      setAddToCart(true);
    } else {
      toast.warning(<Toast message="Đăng nhập để mua hàng" />, {
        className: "warning",
      });
    }
  };

  useEffect(() => {
    const product = detailProduct;
    if (product) {
      setProduct(product);
      setArrayImages(product.image.split(","));
    }
  }, []);

  const showOption = (op) => {
    setOptions(op);
  };
  console.log(product);
  return (
    <Fragment>
      <Header type={0} option={showOption} />
      <div className={`${op ? "pad_top" : ""} product-detail`}>
        <div className="contain-detail">
          <div className="row d-flex justify-content-around h-100 m-0">
            <div className="col-md-6 img_list">
              <Slider {...settings}>
                <div>
                  <img
                    src={`http://localhost:3005/uploads/${arrayImages[0]}`}
                    alt="Slide 1"
                    className="border_img"
                  />
                </div>
                <div>
                  <img
                    src={`http://localhost:3005/uploads/${arrayImages[1]}`}
                    alt="Slide 2"
                    className="border_img"
                  />
                </div>
                {arrayImages.length === 3 ? (
                  <div>
                    <img
                      src={`http://localhost:3005/uploads/${arrayImages[2]}`}
                      alt="Slide 3"
                      className="border_img"
                    />
                  </div>
                ) : null}
              </Slider>
            </div>
            <div className="col-md-5">
              <div className="product p-4">
                <div className="position-relative">
                  <button className="btn_back" onClick={() => history.goBack()}>
                    <i className="fa fa-long-arrow-left"></i>{" "}
                  </button>
                </div>
                <div className="row justify-content-between">
                  <div className="mg_top mb-2 col-7">
                    {" "}
                    <h5 className="text-uppercase detail_name">
                      {product.name}
                    </h5>
                    <div className="price d-flex flex-row align-items-center mt-2">
                      {" "}
                      <span className="act-price pe-2">
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.price)}
                      </span>
                      <div className="ml-2">
                        {" "}
                        <small className="dis-price">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price + product.price * 0.4)}
                        </small>{" "}
                        <span>40% Sales</span>{" "}
                      </div>
                    </div>
                    <p style={{ fontSize: "15px", fontFamily: "cursive" }}>
                      Làm từ {product.material}
                    </p>
                  </div>
                  <div className="text-end mg_top col-4">
                    {/* <p>{product.type}</p> */}

                    <p>
                      {" "}
                      <span style={{ fontSize: "13px", display: "block" }}>
                        Cửa hàng hiện có
                      </span>{" "}
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>
                        {product.count} sản phẩm
                      </span>
                    </p>
                  </div>
                </div>
                <p className="about">
                  <span className="detail_descrip">
                    Thông tin Chi Tiết về trang sức
                  </span>
                  {product.description}
                </p>

                <div className="add_cart">
                  <div className="set_quant">
                    <button
                      onClick={() => {
                        if (qty === 1)
                          toast.warning(
                            <Toast message="Số lượng tối thiểu" />,
                            {
                              className: "warning",
                            }
                          );
                        else setQty(qty - 1);
                      }}
                    >
                      -
                    </button>
                    <span>{qty}</span>
                    <button
                      onClick={() => {
                        if (detailProduct.count === 0) {
                          toast.warning(<Toast message="Hết Hàng" />, {
                            className: "warning",
                          });
                        } else if (qty >= detailProduct.count)
                          toast.warning(<Toast message="Vượt quá số lượng" />, {
                            className: "warning",
                          });
                        else setQty(qty + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart mt-4 align-items-center row justify-content-between">
                    {" "}
                    <button
                      className="button_add text-uppercase mr-2 px-4 col-5"
                      onClick={handleAddToCart}
                    >
                      Thêm vào giỏ hàng
                    </button>{" "}
                    <i className="fa fa-share-alt text-muted col-1"></i>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {product.id !== undefined ? (
        <ReviewCard productId={product.id} />
      ) : (
        <Loading />
      )}
      <Footer />
    </Fragment>
  );
};

export default ProductDetail;

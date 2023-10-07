import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import "./productDetail.css";
import SubHeader from "../layouts/subHeader";
import Footer from "../home/footer";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getCartItem } from "../../store/actions/cartAction";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ProductDetail = () => {
  const [product, setProduct] = useState({});
  // const parameterValue = props.parameter;
  const [qty, setQty] = useState(0);
  const [arrayImages, setArrayImages] = useState([]);
  const detailProduct = useSelector((state) => state.getAllProducts.detail);
  const isAdd = useSelector((state) => state.cart.isAdd);
  const dispatch = useDispatch();
  const [op, setOptions] = useState(false)
  const prevDetailProductRef = useRef(detailProduct);
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
    const prevDetailProduct = prevDetailProductRef.current;
    if (prevDetailProduct !== detailProduct) {
      setProduct(detailProduct);
    }
    prevDetailProductRef.current = detailProduct;
  }, [detailProduct, product]);

  const handleAddToCart = async () => {
    if (qty === 0) {
      toast.warning(<Toast message="Chọn số lượng thêm vào giỏ hàng" />, {
        className: "warning",
      });
    } else {
      dispatch(addToCart(detailProduct.id, qty)).then(async () => {
        if (isAdd) {
          toast.success(<Toast message="Đã thêm vào giỏ hàng" />, {
            className: "success",
          });
          setQty(0);
          await dispatch(getCartItem());
        } else {
          toast.error(<Toast message="Đăng nhập để tiếp tục" />, {
            className: "fail",
          });
        }
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
    setOptions(op)
  }
  return (
    <Fragment>
      <SubHeader show={showOption}/>
      <div className="product-detail">
        <div className="mb-5 contain-detail">
          <div className="row d-flex justify-content-around h-100">
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
                <div>
                  <img
                    src={`http://localhost:3005/uploads/${arrayImages[2]}`}
                    alt="Slide 3"
                    className="border_img"
                  />
                </div>
              </Slider>
            </div>
            <div className="col-md-5">
              <div className="product p-4">
                <div>
                  <Link to="/products" className="btn_back">
                    {" "}
                    <i className="fa fa-long-arrow-left"></i>{" "}
                  </Link>{" "}
                </div>
                <div className="mg_top mb-2">
                  {" "}
                  <h5 className="text-uppercase detail_name">{product.name}</h5>
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
                </div>
                <div className="product_info">
                  <p>
                    <span className="fw-bolder">Loại</span> {product.type}
                  </p>
                  <p>
                    {" "}
                    <span className="fw-bolder">Chất liệu</span>{" "}
                    {product.material}
                  </p>
                  <p>
                    {" "}
                    <span className="fw-bolder">Số Lượng</span> {product.count}
                  </p>
                </div>
                <p className="about">
                  <span className="fw-bolder">Mô tả</span> {product.description}
                </p>

                <div className="add_cart">
                  <div className="set_quant">
                    <button
                      onClick={() => {
                        if (qty === 0)
                          toast.warning(<Toast message="Không thể giảm" />, {
                            className: "warning",
                          });
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
      <Footer />
    </Fragment>
  );
};

export default ProductDetail;

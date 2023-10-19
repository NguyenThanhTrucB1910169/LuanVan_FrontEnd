import React, { Fragment, useEffect, useState } from "react";
import { saveDetail } from "../../store/actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItem } from "../../store/actions/cartAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProductCard from "./productCard";
import Header from "../home/header";
import Toast from "../home/toast";
import { toast } from "react-toastify";
import './productsClassify.css'
const ProductsClassify = (props) => {
  const category = props.match.params.cate;
  const isLogin = useSelector((state) => state.login.role);
  const products = useSelector((state) => state.getAllProducts.products);
  const [searchProducts, setSearchProducts] = useState([]);
  const [addResult, setAddResult] = useState(false);
  const dispatch = useDispatch();
  const isAdd = useSelector((state) => state.cart.isAdd);
  const [option, setOption] = useState(false);
  const [imgSlide, setImgSlide] = useState({});
  const slide = {
    watch: {
      img: "/watch_slide.webp",
      caption:
        "Những chiếc đồng hổ được lấy cảm hứng từ những thiết kế cổ điển. Khám phá những chiếc đồng hồ đẹp mắt, sang trọng và được chế tác tinh xảo với các màu sắc đặc trưng của chúng tôi."
    },
    wedding: {
      img: "/wedding_slide.webp",
      caption: "Chúng tôi tôn vinh sự kết nối thực sự với bộ nhẫn cưới và nhẫn đôi tượng trưng cho tình yêu. Tất cả những thiết kết của chúng tôi, từ viên đá nhỏ nhất đến viên đá lớn nhất, đều có sự khéo léo tuyệt vời và đáp ứng các tiêu chuẩn chính xác.",
    },
    accessories: {
      img: "/accessories_slide.webp",
      caption: "Khám phá một loạt thiết kế không chỉ bổ sung cho phong cách của bạn — mà còn phản ánh phong cách của bạn.",
    },
  };
  useEffect(() => {
    console.log(category);
    // var filter = [];
    var filter = [...products].filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    setSearchProducts(filter);
    Object.keys(slide).map((key) => {
      console.log(slide[key]);
      if (key === category) {
        setImgSlide(slide[key]);
      }
    });
  }, [category]);

  const handleAddToCart = async (id) => {
    if (isLogin === 0) {
      await dispatch(addToCart(id, 1));
      console.log(isAdd);
      setAddResult(true);
    } else {
      toast.warning(<Toast message="Đăng nhập để tiếp tục" />, {
        className: "warning",
      });
    }
  };
  useEffect(async () => {
    if (addResult) {
      if (isAdd) {
        toast.success(<Toast message="Đã thêm vào giỏ hàng" />, {
          className: "success",
        });
        dispatch(getCartItem());
      } else {
        toast.error(<Toast message="Không thể thêm vào giỏ hàng" />, {
          className: "fail",
        });
      }
    }
  }, [addResult]);

  const showOption = (op) => {
    console.log(op);
    setOption(op);
  };
  return (
    <Fragment>
      <Header type={0} option={showOption} />
      <div className={`${option ? "img_slide_option" : 'img_slide'}`}>
        <img src={imgSlide.img} alt="" />
        <div className={category === 'accessories' ? 'caption_img_acce' : 'caption_img'}>
            <p>{imgSlide.caption}</p>
        </div>
      </div>
      <div className="product_cate_frame">
        <div className="row justify-content-sm-around mx-3 justify-content-lg-start">
          {searchProducts.length > 0 && searchProducts !== null ? (
            searchProducts.map((product, index) => (
              <div
                className="col-sm-11 col-md-6 col-lg-5 col-xl-4 col-xxl-3"
                key={index}
              >
                <ProductCard
                  cardItem={product}
                  onSendProduct={handleAddToCart}
                  getDetailPd={(pd) => dispatch(saveDetail(pd))}
                />
              </div>
            ))
          ) : (
            <div className="text-center">
              <img src="./noproduct.gif" alt="" className="img_emptypd" />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsClassify;

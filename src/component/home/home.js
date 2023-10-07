import React, { Fragment } from "react";
import "./home.css";
import Header from "./header";
import Footer from "./footer";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Toast from "./toast";
import { toast } from "react-toastify";
import Carousel from "react-material-ui-carousel";
import "react-slideshow-image/dist/styles.css";
import { Slide, Fade, Zoom } from "react-slideshow-image";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
const divStyle = {
  backgroundSize: "cover",
  height: "31rem",
};
const slideImages = [
  {
    url: "./sd-1.jpg",
  },
  {
    url: "./slide_1.avif",
  },
  {
    url: "./sd-3.webp",
  },
  {
    url: "./sd-4.webp",
  },
  {
    url: "./ds-8.avif",
  },
  {
    url: "./sd-6.avif",
  },
  {
    url: "./sd-7.avif",
  },
  {
    url: "./sd-8.avif",
  },
  {
    url: "./ds-1.avif",
  },
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.divStateBegin = null;

    this.state = {
      currentSlide: 0,
      blur: false,
      search: "",
      // divsWithSearchTerm: [],
      textExit: false,
    };
    // this.divStateBegin = [];
  }

  componentDidMount() {
    const now = new Date();
    let getTime = localStorage.getItem("isactive");
    if (!getTime) {
      let time = JSON.parse(getTime).expiry;
      if (now.getTime() > time) {
        localStorage.setItem("isactive", null);
      }
    }
  }

  handleBlur = () => {
    this.setState({ blur: !this.state.blur });
  };

  customPrevArrow = (
    <div className="d-none">
      <ArrowLeftIcon />
    </div>
  );
  customNextArrow = (
    <div className="d-none">
      <ArrowRightIcon />
    </div>
  );

  render() {
    return (
      <Fragment>
        <Header />
        <div id="home-element">
          <div className="slide-container">
            <Slide
              prevArrow={this.customPrevArrow}
              nextArrow={this.customNextArrow}
              transitionDuration={700}
              indicators={false}
            >
              {slideImages.map((slideImage, index) => (
                <div key={index}>
                  <div
                    className="divStyle"
                    style={{
                      ...divStyle,
                      backgroundImage: `url(${slideImage.url})`,
                    }}
                  ></div>
                </div>
              ))}
            </Slide>
          </div>

          <div className="home-intro">
            {/* {this.state.divsWithSearchTerm.length === 0
              ? this.divStateBegin
              : this.state.divsWithSearchTerm} */}
            <div className="home-intro">
              <div className="intro-1 test">
                <h1 className="text-center">Trang sức cao cấp</h1>
                <hr className="hr" />
                <p className="text-center fs-5">
                  Các tác phẩm trang sức cao cấp thể hiện sự đa dạng trong phong
                  cách, sự sáng tạo và tỉ mĩ trong từng thiết kế thông qua kỹ
                  thuật chế tác đặc biệt.
                </p>
              </div>
              <div className="intro-img test">
                <img src="./home-1.webp" alt="" />
                <div className="box-1">
                  <h3 className="text-center text-capitalize">
                    Món quà hoàn hảo
                  </h3>
                  <p className="">
                    Việc tìm kiếm món quà cho ngày lễ hoàn hảo không thể dễ dàng
                    hơn.
                  </p>
                  <button className="button-intro text-center">
                    Mua sắm ngay
                    <i className="fa-solid fa-angle-right ms-2"></i>
                  </button>
                </div>
              </div>
              <div className="intro_row test">
                <div className="col-6 home-flex p-0">
                  <img src="./flex-new-1.avif" alt="" className="h-100" />
                  <div className="overlay">
                    <div className="content">
                      <Link
                        to={`/products/${'none'}`}
                        className="button-explore ms-3 fw-bold text-center"
                      >
                        Khám phá
                        <i className="fa-solid fa-angle-right ms-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-5 home-flex p-0">
                  <img src="./flex-new-2.avif" alt="" className="h-100 w-100" />
                  <div className="overlay">
                    <div className="content">
                      <Link
                        to="/products"
                        className="button-explore ms-3 fw-bold text-center"
                      >
                        Khám phá
                        <i className="fa-solid fa-angle-right ms-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="intro-img test">
                <img src="./service.webp" alt="" />
                <div className="box-2">
                  <h3 className="text-center text-capitalize">Dịch vụ</h3>
                  <p className="">
                    Swans Lux luôn sẵn sàng phục vụ với đội ngũ tư vấn chuyên
                    nghiệp, nhiệt tình và cung cấp dịch vụ bảo dưỡng trang sức
                    trọn đời.
                  </p>
                  <Link
                    to="/contact"
                    className="button-intro text-center fw-bold"
                  >
                    Liên hệ ngay
                    <i className="fa-solid fa-angle-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default Home;

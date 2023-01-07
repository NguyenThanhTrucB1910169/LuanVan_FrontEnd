import React, { Fragment } from "react";
import "./home.css";
import Header from "./header";
import Footer from "./footer";
// import { Slide } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'
// import '../../public/'
class Home extends React.Component {
  constructor(props) {
    super(props);
    // this.showSlides = this.showSlides.bind(this);
    this.state = {
      currentSlide: 0,
    };
    this.slideImages = [
      {
        url: "/slider-1.webp",
        caption: "giảm giá 10% trong tuần",
        title: "Nhẫn cưới",
      },
      {
        url: "/slider-2.jpg",
        caption: "giảm giá 20% trong tuần",
        title: "Vòng cổ",
      },
      {
        url: "/slider-3.jpg",
        caption: "giảm giá 40% trong tuần",
        title: "Hoa tai & Vòng tay",
      },
    ];
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.currentSlide === 2) this.setState({ currentSlide: 0 });
      else this.setState({ currentSlide: this.state.currentSlide + 1 });
    }, 5000);
  }

  render() {
    return (
      <Fragment>
      <Header />
      <div>

        <div className="home-slide">
          <div className="slider-container">
            <div
              className="slide"
              style={{
                backgroundImage: `url(${
                  this.slideImages[this.state.currentSlide].url
                })`,
              }}
            >
              <div className="container slide-stick">
                <div className="row align-items-center">
                  <div className="col-6">
                    <div className="slider_content">
                      <p>{this.slideImages[this.state.currentSlide].caption}</p>
                      <h1>{this.slideImages[this.state.currentSlide].title}</h1>
                      <p className="slider_price">
                        Bắt đầu <span>2023.01.23</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shop-btn">
          <a href="/" className="button">
            Mua sắm ngay
          </a>
        </div>
        <div className="home-intro">
          <div className="intro-1">
            <h1 className="text-center">Trang sức cao cấp</h1>
            <hr className="hr" />
            <p className="text-center fs-5">
              Các tác phẩm trang sức cao cấp của JAZZY thể hiện sự đa dạng trong
              phong cách, sự sáng tạo và tỉ mĩ trong từng thiết kế thông qua kỹ
              thuật chế tác đặc biệt.
            </p>
          </div>
          <div className="intro-img">
            <img src="./home-1.webp" alt="" />
            <div className="box-1">
              <h3 className="text-center text-capitalize">Món quà hoàn hảo</h3>
              <p className="text-capitalize">
                Việc tìm kiếm món quà cho ngày lễ hoàn hảo không thể dễ dàng
                hơn.
              </p>
              <button className="button-intro text-center">
                Mua sắm ngay
                <i className="fa-solid fa-angle-right ms-2"></i>
              </button>
            </div>
          </div>
          <hr className="hr margin-t" />
          <div className="row intro-flex ">
            <div className="col-3 intro-flex-item">
              <img src="./flex-1.jpg" alt="" />
              <h2 className="text-capitalize text-center mt-4">nhẫn cưới</h2>
              <p>
                Khám phá những thiết kế độc đáo mang vẻ đẹp tinh khôi, thanh
                lịch, sang trọng.
              </p>
              <button className="button-explore ms-3 fw-bold text-center">
                Khám phá
                <i className="fa-solid fa-angle-right ms-2"></i>
              </button>
            </div>
            <div className="col-3 intro-flex-item">
              <img src="./flex-1.webp" alt="" />
              <h2 className="text-capitalize text-center mt-4">đồng hồ</h2>
              <p>
                Xóa mờ ranh giới giữa kỷ vật thời gian và trang sức với vẻ đẹp
                thời thượng.
              </p>
              <button className="button-explore ms-3 fw-bold text-center">
                Khám phá
                <i className="fa-solid fa-angle-right ms-2"></i>
              </button>
            </div>
            <div className="col-3 intro-flex-item">
              <img src="./flex-3.webp" alt="" />
              <h2 className="text-capitalize text-center mt-4">
                Trang sức cao cấp
              </h2>
              <p>
                Khám phá trang sức nổi tiếng đến từ các thương hiệu hàng đầu thế
                giới.
              </p>
              <button className="button-explore ms-3 fw-bold text-center">
                Khám phá
                <i className="fa-solid fa-angle-right ms-2"></i>
              </button>
            </div>
          </div>
          <div className="intro-img">
            <img src="./service.webp" alt="" />
            <div className="box-2">
              <h3 className="text-center text-capitalize">
                Dịch vụ của chúng tôi
              </h3>
              <p className="text-capitalize">
                Từ việc chọn một món quà ngày lễ đến cung cấp các cuộc hẹn tại
                cửa hàng, chúng tôi luôn sẵn sàng phục vụ bạn với đội ngũ tư vấn
                chuyên nghiệp và nhiệt tình. Jazzyy Jewelry cung cấp dịch vụ bảo
                dưỡng trang sức bạc trọn đời.
              </p>
              <button className="button-intro text-center fw-bold">
                Liên hệ ngay
                <i className="fa-solid fa-angle-right ms-2"></i>
              </button>
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

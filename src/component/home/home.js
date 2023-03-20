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
      blur: false,
    };
    this.slideImages = [
      {
        url: "/slider-1.webp",
      },
      {
        url: "/slide-9.webp",
      },
      {
        url: "/slide-6.webp",
      },
      {
        url: "/slider-4.webp",
      },
      {
        url: "/slide-4.webp",
      },
    
    ];
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.currentSlide === 4) this.setState({ currentSlide: 0 });
      else this.setState({ currentSlide: this.state.currentSlide + 1 });
    }, 5000);
    const now = new Date();
    let getTime = localStorage.getItem("isactive")
    if(!getTime) {
      let time = JSON.parse(getTime).expiry
      if(now.getTime() > time) {
        localStorage.setItem("isactive", null);
      }
    }
    // window.addEventListener('click', () => {
      // if(this.state.blur) this.setState({ blur: false });
    // })
  }

  handleBlur = () => {
    this.setState({blur: !this.state.blur})
  }



  render() {
    return (
      <Fragment>
      <Header onBlurScreen = {this.handleBlur}/>
      <div className={`home-content ${this.state.blur ? 'add-fil' : ''}`}>

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
             
              </div>
          </div>
        </div>
    
        <div className="home-intro">
          <div className="intro-1">
            <h1 className="text-center">Trang sức cao cấp</h1>
            <hr className="hr" />
            <p className="text-center fs-5">
              Các tác phẩm trang sức cao cấp của S&S thể hiện sự đa dạng trong
              phong cách, sự sáng tạo và tỉ mĩ trong từng thiết kế thông qua kỹ
              thuật chế tác đặc biệt.
            </p>
          </div>
          <div className="intro-img">
            <img src="./home-1.webp" alt="" />
            <div className="box-1">
              <h3 className="text-center text-capitalize">Món quà hoàn hảo</h3>
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
          {/* <hr className="hr margin-t" /> */}
          <div className="intro_row">
            {/* <div className="col-3 intro-flex-item">
              <img src="./flex-5.avif" alt="" />
              <h2 className="text-capitalize text-center mt-4">nhẫn</h2>
              <p>
                Khám phá những thiết kế độc đáo mang vẻ đẹp tinh khôi, sang trọng.
              </p>
              <button className="button-explore ms-3 fw-bold text-center">
                Khám phá
                <i className="fa-solid fa-angle-right ms-2"></i>
              </button>
            </div>
            <div className="col-3 intro-flex-item">
              <img src="./flex-8.jpg" alt="" />
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
              <img src="./flex-4.avif" alt="" />
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
            </div> */}
            <div className="col-5 home-flex p-0">
            <img src="./flex-new-1.webp" alt="" className="h-100"/>
            <div className="overlay">
              <div className="content">
              <button className="button-explore ms-3 fw-bold text-center">
                Khám phá
                <i className="fa-solid fa-angle-right ms-2"></i>
              </button>
              </div>
            </div>
            </div>
            <div className="col-5 home-flex p-0">
            <img src="./flex-new-2.avif" alt="" className="h-100 w-100"/>
            <div className="overlay">
              <div className="content">
              <button className="button-explore ms-3 fw-bold text-center">
                Khám phá
                <i className="fa-solid fa-angle-right ms-2"></i>
              </button>
              </div>
            </div>
            </div>
          </div>
          <div className="intro-img">
            <img src="./service.webp" alt="" />
            <div className="box-2">
              <h3 className="text-center text-capitalize">
                Dịch vụ 
              </h3>
              <p className="">
                S&S luôn sẵn sàng phục vụ với đội ngũ tư vấn
                chuyên nghiệp, nhiệt tình và cung cấp dịch vụ bảo
                dưỡng trang sức trọn đời.
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

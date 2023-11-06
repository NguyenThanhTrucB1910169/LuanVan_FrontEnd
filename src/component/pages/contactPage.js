import React, { Fragment } from "react";
import Header from "../home/header";
import "./contactPage.css";
import Footer from "../home/footer";
class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  option = (op) => {
    this.setState({ show: op });
  };

  render() {
    return (
      <Fragment>
        <Header option={this.option} />
        <div className={`contact ${this.state.show ? "pt_page" : ""}`}>
          {/* <h1>Liên hệ</h1> */}
          <div className="position-relative cont_overlay">
            <div className="overlay_ct"></div>
          </div>
          <div className="d-flex flex-sm-column flex-lg-row cont_content pt-5 ms-5">
            <div className="col-sm-12 col-lg-4 cont_link">
              <h1 className="">Liên hệ </h1>
              <ul className="p-0">
                <li>
                  <i className="fa-solid fa-phone"></i>
                  <span>Hotline: 012345</span>
                  <i className="fa-solid fa-caret-right"></i>
                </li>
                <li>
                  <i className="fa-solid fa-envelope"></i>
                  <span>Email: swanlux@jewel.com</span>
                  <i className="fa-solid fa-caret-right"></i>
                </li>
                <li>
                  <i className="fa-solid fa-link"></i>
                  <span>Website: swanslux.com</span>
                  <i className="fa-solid fa-caret-right"></i>
                </li>
                <li>
                  <i className="fa-solid fa-location-dot"></i>
                  <span>Địa chỉ: Ninh Kiều, Cần Thơ</span>
                  <i className="fa-solid fa-caret-right"></i>
                </li>
                <li>
                  <i className="fa-solid fa-house"></i>
                  <span>Fanpage: swanslux.jewery</span>
                  <i className="fa-solid fa-caret-right"></i>
                </li>
              </ul>
            </div>
            <div className="col-sm-12 col-lg-4 cont_hour">
              <h1>Giờ hoạt động</h1>
              <ul className="p-0">
                <li>Thứ 2 - Thứ 6: 8:00AM - 10:00PM</li>
                <li>Thứ 7: 9:00AM - 10:00PM</li>
                <li>Chủ Nhật: 10:00AM - 10:00PM</li>
              </ul>
            </div>
          </div>
          <div className="cont_assist">
            <h2 className="text-center fw-semibold">Dịch Vụ Tại Swans Lux</h2>
            <div className="d-flex flex-sm-column flex-lg-row m-sm-0 mf cont_mt justify-content-around">
              <div className="col-sm-12 col-lg-5 text-center">
                <img src="./cont-3.webp" alt="" />
                <h3>Dịch Vụ Sản Phẩm</h3>
                <p>
                  Chúng tôi cung cấp dịch vụ vệ sinh, sửa chữa và thay đổi kích
                  cỡ trong suốt thời gian sử dụng trang sức Swans Lux của bạn.
                </p>
              </div>
              <div className="col-sm-12 col-lg-5 text-center">
                <img src="./cont-4.webp" alt="" />
                <h3>Chăm Sóc Sản Phẩm</h3>
                <p>
                  Khám phá cách chăm sóc các chất liệu độc đáo trong thiết kế
                  của Swans Lux, từ ngọc trai đến bạc.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default ContactPage;

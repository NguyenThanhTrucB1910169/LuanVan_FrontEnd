import React, { Fragment } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
class Footer extends React.Component {
  render() {
    return (
      <Fragment>
        <footer className="text-center text-lg-start text-muted footer">
          <div className="mx-auto mb-3 mt-3">
            <h6 className="fw-bold mb-3 text-center fs-5">
              <img className="foo_logo" src="./logo.png" alt="" />
              Swans Lux
            </h6>
          </div>
          <div className="foo_link text-center pt-2">
            <Link to="/">Trang chủ</Link>
            <Link to="/products/none">Sản Phẩm</Link>
            <Link to="/intro">Giới Thiệu</Link>
            <Link to="/contact">Liên Hệ</Link>
          </div>
          <div className="mb-2 pt-3 ps-3">
            <a href="/" className="me-4 footer-social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/" className="me-4 footer-social">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" className="me-4 footer-social">
              <i className="fab fa-google"></i>
            </a>
            <a href="/" className="me-4 footer-social">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/" className="me-4 footer-social">
              <i className="fa-brands fa-pinterest"></i>
            </a>
          </div>

          <div className="text-center p-4 font_cus">
            &reg; 2023 &nbsp;
            <Link className="fw-bold text-decoration-none foo_text" to="/">
            swanslux.com
            </Link>
          </div>
        </footer>
      </Fragment>
    );
  }
}

export default Footer;

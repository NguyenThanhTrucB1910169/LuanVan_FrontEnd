import React, { Fragment } from "react";
import "./footer.css";
class Footer extends React.Component {
  render() {
    return (
      <Fragment>
        <footer className="text-center text-lg-start bg-light text-muted">
          <section 
          className="p-4 border-bottom text-center"
          >
            {/* <div className="me-5 d-none d-lg-block">
              <span>Get connected with us on social networks:</span>
            </div> */}

            <div>
              <a href="/" className="me-4 text-reset footer-social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" className="me-4 text-reset footer-social">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/" className="me-4 text-reset footer-social">
                <i className="fab fa-google"></i>
              </a>
              <a href="/" className="me-4 text-reset footer-social">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </section>

          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-2 col-lg-3 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4 text-center">
                    <i className="fas fa-gem me-3"></i>jazzy Jewelry
                  </h6>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">sản phẩm</h6>
                  <p>
                    <a href="/" className="text-reset text-decoration-none">
                      Nhẫn
                    </a>
                  </p>
                  <p>
                    <a href="/" className="text-reset text-decoration-none">
                      Đồng hồ
                    </a>
                  </p>
                  <p>
                    <a href="/" className="text-reset text-decoration-none">
                      Vòng tay
                    </a>
                  </p>
                  <p>
                    <a href="/" className="text-reset text-decoration-none">
                      Vòng cổ
                    </a>
                  </p>
                </div>

                <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Chăm sóc khách hàng</h6>
                  <p>
                    <a href="/" className="text-reset text-decoration-none">
                      Hỗ trợ
                    </a>
                  </p>
                  <p>
                    <a href="/" className="text-reset text-decoration-none">
                      Theo dõi trang web
                    </a>
                  </p>
                  <p>
                    <a href="/" className="text-reset text-decoration-none">
                     Đặt hàng
                    </a>
                  </p>
                 
                </div>

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
                  <p>
                    <i className="fas fa-home me-3"></i> Cần Thơ
                  </p>
                  <p>
                    <i className="fas fa-envelope me-3"></i>
                    jazzi@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone me-3"></i> 01 234 567 88
                  </p>
                  <p>
                    <i className="fas fa-print me-3"></i> 01 234 567 89
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div
            className="text-center p-4"
            style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}
          >
            © 2023 Copyright: &nbsp;
            <a className="text-reset fw-bold text-decoration-none" href="/">
              jazzyjewls.com
            </a>
          </div>
        </footer>
      </Fragment>
    );
  }
}

export default Footer;

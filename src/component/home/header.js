import "./header.css";
import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
class Header extends React.Component {
  render() {
    return (
      <header className="header_black">
        <div className="header_top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-9 col-md-6">
                <div className="social_icone">
                  <ul>
                    <li>
                      <a href="/">
                      <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/" className="ms-2">
                        <i className="fa-brands fa-twitter fs-5"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/" className="ms-2">
                        <i className="fa-brands fa-instagram fs-5"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="top_right text-right">
                  <ul>
                    <li className="language">
                      <a href="/" className="text-decoration-none fs-6">
                        VietNamese <i className="fa-solid fa-chevron-down"></i>
                      </a>
                      <ul className="dropdown_language">
                        <li>
                          <a href="/">English</a>
                        </li>
                        <li>
                          <a href="/">VietNamese</a>
                        </li>
                      </ul>
                    </li>

                    <li className="top_links">
                      <a href="/" className="text-decoration-none fs-6">
                        Tài khoản<i className="fa-solid fa-chevron-down"></i>
                      </a>
                      <ul className="dropdown_links">
                        <li>
                          <a href="/">Thông Tin</a>
                        </li>
                        <li>
                          <a href="/">Giỏ Hàng</a>
                        </li>
                        <li>
                          <a href="/">Đăng Xuất</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header_middel">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3">
                <div className="home_contact">
                  <div className="contact_icon">
                    <i className="fa-solid fa-headphones-simple fs-3"></i>
                  </div>
                  <div className="contact_box">
                    <p>
                      Hotline :{" "}
                      <a
                        href="tel: 1234567894"
                        className="text-decoration-none"
                      >
                        1234567894
                      </a>
                    </p>
                  </div>
                  <div className="search_btn">
                    <a href="/">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </a>
                    <div className="dropdown_search">
                      <form action="/">
                        <input type="text" placeholder="Search Product ...." />
                        <button type="submit">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-3 col-4 text-center">
                <div className="logo">
                  {/* <a href="index.html">
                    <img src="images/logo/logo-ash.png" alt="" />
                  </a> */}
                  <h1>Jazzy</h1>
                </div>
              </div>

              <div className="col-lg-4 col-md-7 col-6">
                <div className="middel_right">
                  <div className="cart_link">
                    <a href="/" className="text-decoration-none">
                      <i className="fa-solid fa-bag-shopping fs-4 me-4"></i>
                      <span className="me-2">67,598</span>
                      <i className="fa fa-solid fa-chevron-down"></i>
                    </a>
                    <span className="cart_quantity">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="main_menu_inner">
                  <div className="logo_sticky"></div>
                  <div className="main_menu">
                    <nav>
                      <ul>
                        <li className="">
                          <a href="/" className="text-decoration-none fs-2">
                            Trang Chủ <i className="ion-chevron-down"></i>
                          </a>
                          <ul className="sub_menu">
                            <li>
                              <a href="/">Banner</a>
                            </li>
                            <li>
                              <a href="/">Featured</a>
                            </li>
                            <li>
                              <a href="/">Collection</a>
                            </li>
                            <li>
                              <a href="/">Best Selling</a>
                            </li>
                            <li>
                              <a href="/">News</a>
                            </li>
                            <li>
                              <a href="/">Blog</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="/" className="text-decoration-none fs-2">
                            Danh Mục <i className="ion-chevron-down"></i>
                          </a>
                          <ul className="mega_menu">
                            <li>
                              <ul>
                                <li>
                                  <a href="/">Hoa Tai</a>
                                </li>
                                <li>
                                  <a href="/">Mặt Dây Chuyền</a>
                                </li>
                                <li>
                                  <a href="/">Nhẫn</a>
                                </li>
                                <li>
                                  <a href="/">Chuỗi ngọc</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <ul>
                                <li>
                                  <a href="/">Lắc Tay</a>
                                </li>

                                <li>
                                  <a href="/">Vòng tay</a>
                                </li>

                                <li>
                                  <a href="/">Đá quý</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              {/* <a href="/">Other</a> */}
                              <ul>
                                <li>
                                  <a href="/">Bạch Kim</a>
                                </li>
                                <li>
                                  <a href="/">Bạc</a>
                                </li>
                                {/* <li>
                                  <a href="/">Coins</a>
                                </li> */}
                                <li>
                                  <a href="/">Pha Lê</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a href="/" className="text-decoration-none fs-2">
                            Giới Thiệu
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;

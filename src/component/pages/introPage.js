import React, { Fragment } from "react";
import SubHeader from "../layouts/subHeader";
import "./introPage.css";
import Footer from "../home/footer";
class IntroPage extends React.Component {
  render() {
    return (
      <Fragment>
        <SubHeader />
        <div className="intro_contain">
          <h1 className="slogan">
            Timeless
            <span>Beauty</span>
          </h1>
          <img src="./intro-2.avif" alt="" />
          <p className="intro_name">About SLux Jewelry</p>
          <div className="d-flex flex-sm-column intro_first flex-xl-row flex-xxl-row">
            <img
              src="./intro-4.jpg"
              className="col-sm-12 col-xl-6 p-0"
              alt=""
            />
            <p className="col-sm-12 col-xl-6">
              Chào mừng đến với cửa hàng trang sức của chúng tôi - "Swans Lux".
              Chúng tôi chuyên cung cấp các sản phẩm trang sức đa dạng và đẹp
              mắt, từ nhẫn, dây chuyền, vòng tay đến hoa tai và các sản phẩm
              trang sức khác. Cam kết cung cấp những sản phẩm trang sức chất
              lượng cao, được chọn lọc kỹ lưỡng từ các nhà sản xuất trang sức
              hàng đầu trên thế giới. Chất lượng của các sản phẩm được đảm bảo
              thông qua quá trình kiểm tra và chứng nhận chất lượng trước khi
              được đưa đến khách hàng. Swans Lux Jewels cam kết đem đến cho
              khách hàng những dịch vụ sau bán hàng tốt nhất và hỗ trợ khách
              hàng 24/7. Chúng tôi hy vọng sẽ đem đến cho quý khách những trải
              nghiệm mua sắm thú vị và đầy ý nghĩa.
            </p>
          </div>

          <div className="intro_sec">
            <div className="d-sm-flex col-sm-12 d-lg-block doc">
              <h1 className="text-capitalize">trang sức ngọc trai</h1>
              <p className="">
                Truyền thống không phải lúc nào cũng phải trông truyền thống.
                Cho dù bạn muốn trang sức ngọc trai cổ điển hay mới mẻ, Swans Lux
                đều làm được điều đó một cách tốt nhất. Hãy xem các thiết
                kế hiện đại của chúng tôi kết hợp ngọc trai để chứng minh rằng
                sự đối lập sẽ thu hút. Làm cho ngọc trai màu trở thành item yêu
                thích của bạn. Mọi bộ sưu tập trang sức đều cần có ngọc trai,
                nhưng cách bạn tạo kiểu cho chúng là tùy thuộc vào bạn.
              </p>
            </div>
            <img src="./intro-3.webp" alt="" />
          </div>
          <div className="intro_third row">
            <div className="col-5 content_third">
              <h6>Trang sức bạch kim</h6>
              <p>
                Đồ trang sức bạch kim thanh lịch của chúng tôi nâng cao vẻ ngoài
                rực rỡ. Khám phá các thiết kế cổ điển và hiện đại của chúng tôi,
                từ nhẫn bạch kim đến hoa tai, dây chuyền và vòng tay bạch kim —
                tất cả đều chắc chắn và bền bỉ với thời gian.
              </p>
            </div>
            <div className="d-sm-none d-lg-block col-6">
              <img src="./intro-5.gif" className="intro_img_5" alt="" />
              <img src="./intro-9.webp" className="intro_img_4" alt="" />
              <img src="./intro-6.webp" className="intro_img_1" alt="" />
              <img src="./intro-7.webp" className="intro_img_2" alt="" />
              <img src="./intro-8.avif" className="intro_img_3" alt="" />
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default IntroPage;

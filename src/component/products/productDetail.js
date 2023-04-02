import React from "react";
import { Fragment } from "react";
import './productDetail.css'
import SubHeader from "../layouts/subHeader";
import Footer from "../home/footer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class ProductDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pd: {},
      arrayImages: []
    }
  }

  componentDidMount() {
    const pd = this.props.detailProduct;
    console.log(pd)
    if(pd){
      this.setState({
        pd: pd,
        arrayImages: pd.image.split(",")
      })
    }
  }

  render() {
    return (
      <Fragment>
      <SubHeader />
        <div className="pd-detail">
          <div className="mb-5 contain-detail">
            <div className="row d-flex justify-content-around h-100">
              {/* <div className="col-md-10"> */}
                {/* <div className="card"> */}
                  {/* <div className="row"> */}
                    <div className="col-md-6 img_list">
                      <div className="images">
                        <div className="text-center p-4 main-image pt-0">
                          
                          <img
                            id="main-image"
                            src={this.state.arrayImages[0]}
                            className=""
                            alt=""
                          />
                        </div>
                        <div className="thumbnail text-center">
                          
                          <img
                            onclick="change_image(this)"
                            src={this.state.arrayImages[1]}
                            alt=""
                          />
                          <img
                            onclick="change_image(this)"
                            src={this.state.arrayImages[2]}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="product p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <Link to="/products" className="d-flex align-items-center btn_back">
                            {" "}
                            <i className="fa fa-long-arrow-left"></i>{" "}
                            {/* <span className="ml-1">Back</span>{" "} */}
                          </Link>{" "}
                          <i className="fa fa-shopping-cart text-muted"></i>
                        </div>
                        <div className="mt-5 mb-2">
                          {" "}
                          {/* <span className="text-uppercase text-muted brand">
                            Orianz
                          </span> */}
                          <h5 className="text-uppercase detail_name">{this.state.pd.name}</h5>
                          <div className="price d-flex flex-row align-items-center mt-2">
                            {" "}
                            <span className="act-price pe-2">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.state.pd.price)}</span>
                            <div className="ml-2">
                              {" "}
                              <small className="dis-price">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.state.pd.price + this.state.pd.price * 0.4)}</small>{" "}
                              <span>40% Sales</span>{" "}
                            </div>
                          </div>
                        </div>
                        <div className="pd_info">
                          <p><span className="fw-bolder">Loại</span> {this.state.pd.type}</p>
                          <p> <span className="fw-bolder">Chất liệu</span> {this.state.pd.material}</p>
                        </div>
                        <p className="about">
                          <span className="fw-bolder">Mô tả</span>  {this.state.pd.description}    
                        </p>
                      
                      <div className="add_cart">
                          <div className="set_quant">
                            <button>-</button>
                            <input type="number" value='1'/>
                            <button>+</button>
                          </div>
                        <div className="cart align-items-center">
                          {" "}
                          <button className="button_add text-uppercase mr-2 px-4">
                            Thêm vào giỏ hàng
                          </button>{" "}
                          <i className="fa fa-share-alt text-muted"></i>{" "}
                        </div>

                      </div>

                      </div>
                    </div>
                  {/* </div> */}
                {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailProduct: state.getAllProducts.detail, 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

// export default ProductDetail
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);


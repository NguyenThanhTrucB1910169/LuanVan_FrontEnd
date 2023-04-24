import React from "react";
import { Fragment } from "react";
import "./productDetail.css";
import SubHeader from "../layouts/subHeader";
import Footer from "../home/footer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getCartItem } from "../../store/actions/cartAction";
import { toast } from "react-toastify";
import Toast from "../home/toast";
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pd: {},
      arrayImages: [],
      qty: 0,
    };
  }

  componentDidMount() {
    const pd = this.props.detailProduct;
    // console.log(pd);
    if (pd) {
      this.setState({
        pd: pd,
        arrayImages: pd.image.split(","),
      });
    }
  }

  addToCart = () => {
    if(this.state.qty === 0){
      toast.warning(<Toast message="Chọn số lượng"/>, {
        className: 'warning',
      })
    } else {
      this.props.handleAddToCart(this.props.detailProduct.id, this.state.qty).then(async() => {
        console.log(this.props.isAdd)
        if(this.props.isAdd) {
          toast.success(<Toast message="Đã thêm vào giỏ hàng"/>, {
            className: 'success',
          })
          this.setState({qty: 0})
          await this.props.loadCart()
        }
        else {
          toast.error(<Toast message="Đăng nhập để tiếp tục"/>, {
            className: 'fail',
          })
        }
    })
    }
  };

  render() {
    return (
      <Fragment>
        <SubHeader />
        <div className="pd-detail">
          <div className="mb-5 contain-detail">
            <div className="row d-flex justify-content-around h-100">
            
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
                  <div>
                    <Link
                      to="/products"
                      className="btn_back"
                    >
                      {" "}
                      <i className="fa fa-long-arrow-left"></i>{" "}
                    </Link>{" "}
                  </div>
                  <div className="mt-5 mb-2">
                    {" "}
                    
                    <h5 className="text-uppercase detail_name">
                      {this.state.pd.name}
                    </h5>
                    <div className="price d-flex flex-row align-items-center mt-2">
                      {" "}
                      <span className="act-price pe-2">
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(this.state.pd.price)}
                      </span>
                      <div className="ml-2">
                        {" "}
                        <small className="dis-price">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            this.state.pd.price + this.state.pd.price * 0.4
                          )}
                        </small>{" "}
                        <span>40% Sales</span>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="pd_info">
                    <p>
                      <span className="fw-bolder">Loại</span>{" "}
                      {this.state.pd.type}
                    </p>
                    <p>
                      {" "}
                      <span className="fw-bolder">Chất liệu</span>{" "}
                      {this.state.pd.material}
                    </p>
                  </div>
                  <p className="about">
                    <span className="fw-bolder">Mô tả</span>{" "}
                    {this.state.pd.description}
                  </p>

                  <div className="add_cart">
                    <div className="set_quant">
                      <button
                        onClick={() => {
                          if (this.state.qty === 0)
                          toast.warning(
                              <Toast message="Không thể giảm" />,
                              {
                                className: "warning",
                              }
                            );
                          else
                            this.setState({
                              qty: this.state.qty - 1,
                            });
                        }}
                      >
                        -
                      </button>
                      <span>{this.state.qty}</span>
                      <button
                        onClick={() => {
                          if(this.props.detailProduct.count === 0) {
                            toast.warning(
                              <Toast message="Hết Hàng" />,
                              {
                                className: "warning",
                              }
                            );
                          }
                          else if (this.state.qty > this.props.detailProduct.count)
                            toast.warning(
                              <Toast message="Vượt quá số lượng" />,
                              {
                                className: "warning",
                              }
                            );
                          else
                            this.setState({
                              qty: this.state.qty + 1,
                            });
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart align-items-center">
                      {" "}
                      <button
                        className="button_add text-uppercase mr-2 px-4"
                        onClick={this.addToCart}
                      >
                        Thêm vào giỏ hàng
                      </button>{" "}
                      <i className="fa fa-share-alt text-muted"></i>{" "}
                    </div>
                  </div>
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

const mapStateToProps = (state) => {
  return {
    detailProduct: state.getAllProducts.detail,
    isAdd: state.cart.isAdd
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddToCart: (id, qt) => dispatch(addToCart(id, qt)),
    loadCart: () => dispatch(getCartItem())
  };
};

// export default ProductDetail
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

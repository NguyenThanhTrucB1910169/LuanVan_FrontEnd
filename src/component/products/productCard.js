import React from "react";
import { Fragment } from "react";
import "./productCard.css";
import { Link, withRouter } from "react-router-dom";
class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayImages: [],
      slideIndex: 0,
    };
  }

  handleAdd = () => {
    this.props.onSendProduct(this.props.cardItem.id);
  };

  nextSlide = () => {
    if (this.state.slideIndex !== this.state.arrayImages.length - 1) {
      this.setState({ slideIndex: this.state.slideIndex + 1 });
    } else if (this.state.slideIndex === this.state.arrayImages.length - 1) {
      this.setState({ slideIndex: 0 });
    }
  };

  prevSlide = () => {
    if (this.state.slideIndex !== 0) {
      this.setState({ slideIndex: this.state.slideIndex - 1 });
    } else if (this.state.slideIndex === 0) {
      this.setState({ slideIndex: this.state.arrayImages.length - 1 });
    }
  };

  configImage = (images) => {
    var myArrayImages = images.split(",");
    this.setState({
      arrayImages: myArrayImages,
    });
  };

  getDetail = () => {
    this.props.getDetailPd(this.props.cardItem);
    this.props.history.push("/product/detail");
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.cardItem !== this.props.cardItem) {
      this.configImage(this.props.cardItem.image);
    }
  };

  componentDidMount = () => {
    this.configImage(this.props.cardItem.image);
    setInterval(() => {
      if (this.state.slideIndex === this.state.arrayImages.length - 1)
        this.setState({ slideIndex: 0 });
      else this.setState({ slideIndex: this.state.slideIndex + 1 });
    }, 5000);
  };

  render() {
    return (
      <Fragment>
        <div className="my-3 product-card">
          <img src={this.state.arrayImages[1]} alt="" className="h-100 w-100" />
          <div className="product_hover">
            <div className="carditem">
              <div className="row img-slide">
                <button className="col-1 text-center" onClick={this.prevSlide}>
                  <i className="fa fa-angle-left"></i>
                </button>
                <div className="col-10 p-0">
                  <img
                    src={this.state.arrayImages[this.state.slideIndex]}
                    className="image_slide"
                  />
                </div>
                <button className="col-1 text-center" onClick={this.nextSlide}>
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
              <div className="product_name">
                <h5 className="text-center mb-0">{this.props.cardItem.name}</h5>
              </div>
              <div className="btn_group">
                <button onClick={this.getDetail} className="button-detail">
                  Chi tiết
                  <i className="ms-1 fa-solid fa-angles-right"></i>
                </button>
                <button className="btn_add" onClick={this.handleAdd}>
                  <i className="fa-solid fa-cart-plus"></i>
                  <span>
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(this.props.cardItem.price)}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(ProductCard);

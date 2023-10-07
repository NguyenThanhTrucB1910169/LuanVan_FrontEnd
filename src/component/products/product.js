import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchProducts, saveDetail } from "../../store/actions/productsAction";
import { addToCart, getCartItem } from "../../store/actions/cartAction";
import "./product.css";
import Footer from "../home/footer";
import ProductCard from "./productCard";
import SubHeader from "../layouts/subHeader";
import { toast } from "react-toastify";
import Toast from "../home/toast";
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.listProduct,
      searchText: '',
      searchProduct: this.props.listProduct || [],
      filterProduct: [],
      isActive: "",
      material: ["bạch kim", "vàng hồng", "bạc", "đá quý", "ngọc trai"],
      type: ["hoa tai", "vòng cổ", "vòng tay", "nhẫn", "ghim cài"],
      option: false
    };
  }

  search = (value) => {
    if(value !== 'none'){
      this.setState({ searchText: value.toLowerCase() }, () => {
        let searchProduct = [...this.state.products].filter((item) =>
          item.name.toLowerCase().includes(this.state.searchText)
        );
        this.setState({ searchProduct: searchProduct });
      });
    }
  };

  clearSearch = () => {
    this.setState({ searchText: "" }, () => {
      this.setState({ searchProduct: this.state.products });
    });
  };

  componentDidMount() {
    this.props.fetchProductsRedux();
    console.log(this.props.match.params)
    if(this.props.match.params !== ''){
      this.search(this.props.match.params.search)
    }
  }

  addToCart = async (id) => {
    if (this.props.isLogin) {
      await this.props.handleAddToCart(id, 1);
      // console.log(this.props.messageAdded)
      if (this.props.messageAdded) {
        toast.success(<Toast message="Đã thêm vào giỏ hàng" />, {
          className: "success",
        });
        await this.props.loadCart();
      }
    } else {
      toast.warning(<Toast message="Đăng nhập để tiếp tục" />, {
        className: "warning",
      });
    }
  };

  sortProducts = (data) => {
    var sorted = [];
    console.log(data);
    if (data === "priceToHigh") {
      sorted = [...this.props.listProduct].sort((a, b) => a.price - b.price);
      this.setState({
        searchProduct: sorted,
      });
    } else if (data === "priceToLow") {
      sorted = [...this.props.listProduct].sort((a, b) => b.price - a.price);
      this.setState({
        searchProduct: sorted,
      });
    }
  };

  filterProducts = (type, data, e) => {
    var listPd = [];
    if (type === 1) {
      listPd = [...this.props.listProduct].filter(
        (product) => product.material.toLowerCase() === data.toLowerCase()
      );
      this.setState({ searchProduct: listPd });
    } else {
      listPd = [...this.props.listProduct].filter(
        (product) => product.type.toLowerCase() === data.toLowerCase()
      );
      this.setState({ searchProduct: listPd });
    }
  };

  allProducts = () => {
    this.setState({
      searchProduct: this.state.products,
    });
  };

  showOption = (op) => {
    console.log(op);
    this.setState({option: op});
  }

  render() {
    return (
      <Fragment>
        <SubHeader show={this.showOption}/>
        <div className={this.state.option ? "contain_bottom" + " contain" : "" + " contain"}>
          <div className="products_title">
            <h1 className="text-center">fine jewelry</h1>
          </div>
          <div className="row align-items-md-end nav_products m-0">
            <div className="col-md-12 col-xl-7 col-xxl-6 row justify-content-between">
              <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-4 ms-3 btn_sort">
                <span className="me-2">Lọc theo giá</span>
                <i className="fa-solid fa-caret-down"></i>
                <ul className="dropdown_sort">
                  <li>
                    <button onClick={() => this.sortProducts("priceToLow")}>
                      Từ cao đến thấp{" "}
                      <i className="fa-solid fa-arrow-down-wide-short"></i>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => this.sortProducts("priceToHigh")}>
                      Từ thấp đến cao{" "}
                      <i className="fa-solid fa-arrow-down-short-wide"></i>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="ms-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 btn_material">
                <span className="me-2">Chất Liệu</span>
                <i className="fa-solid fa-caret-down"></i>
                <ul className="dropdown_material">
                  {this.state.material.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={(e) => this.filterProducts(1, item, e)}
                        className="text-capitalize"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ms-sm-3 col-md-2 col-lg-2 col-xl-2 col-xxl-2 btn_type">
                <span className="me-2">Loại</span>
                <i className="fa-solid fa-caret-down"></i>
                <ul className="dropdown_type">
                  {this.state.type.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => this.filterProducts(0, item)}
                        className={`my-xl-3 mx-xl-0 text-capitalize ${
                          this.state.isActive === item ? "active_btn" : ""
                        }`}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ms-sm-4 col-md-2 col-lg-2 col-xl-2 col-xxl-1 p-0">
                <button className="btn_all" onClick={this.allProducts}>
                  Tất cả
                </button>
              </div>
            </div>
            <div className="me-md-3 search_btn">
              <i className="fa-solid fa-magnifying-glass icon_search"></i>
              <div className="dropdown_search">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm ...."
                  value={this.state.searchText}
                  onChange={(e) => this.search(e.target.value)}
                />
                <button onClick={this.clearSearch}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="row justify-content-sm-around mx-3 justify-content-lg-start">
            {this.state.searchProduct.length > 0 &&
            this.state.searchProduct !== null ? (
              this.state.searchProduct.map((product, index) => (
                <div
                  className="col-sm-11 col-md-6 col-lg-5 col-xl-4 col-xxl-3"
                  key={index}
                >
                  <ProductCard
                    cardItem={product}
                    onSendProduct={this.addToCart}
                    getDetailPd={(pd) => this.props.saveDetailInfo(pd)}
                  />
                </div>
              ))
            ) : (
              <div className="text-center">
                <img src="./noproduct.gif" alt="" className="img_emptypd" />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listProduct: state.getAllProducts.products,
    messageAdded: state.cart.isAdd,
    isLogin: state.login.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductsRedux: () => dispatch(fetchProducts()),
    handleAddToCart: (id, qt) => dispatch(addToCart(id, qt)),
    saveDetailInfo: (pd) => dispatch(saveDetail(pd)),
    loadCart: () => dispatch(getCartItem()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

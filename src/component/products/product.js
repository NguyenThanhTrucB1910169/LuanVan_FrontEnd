import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchProducts, saveDetail } from "../../store/actions/productsAction";
import { addToCart, getCartItem } from "../../store/actions/cartAction";
import "./product.css";
import Footer from "../home/footer";
import ProductCard from "./productCard";
// import SubHeader from "../layouts/subHeader";
import isEqual from "lodash/isEqual";
import Header from "../home/header";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.listProduct,
      searchText: "",
      searchProduct: this.props.listProduct || [],
      filterProduct: [],
      isActive: "",
      option: false,
      filter: false,
      materialOptions: [],
      // categoryOptions: [],
      typeOptions: [],
      // category: [],
      material: ["bạch kim", "vàng hồng", "bạc", "đá quý", "ngọc trai"],
      type: ["hoa tai", "vòng cổ", "vòng tay", "nhẫn", "ghim cài"],
      typAccessories: ["Kính mắt", "Thắt lưng", "Ruy băng", "Móc khóa"],
      priceOption: "",
      price: ["asc", "desc"],
    };

    this.category = {
      1: "jewelry",
      2: "watch",
      3: "wedding",
      4: "accessories",
    };
    this.categoryName = {
      1: "trang sức đơn",
      2: "Đồng Hồ",
      3: "Trang Sức Cưới",
      4: "Phụ Kiện",
    };
  }

  search = (value) => {
    if (value !== "none") {
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
    if (this.props.match.params !== "") {
      this.search(this.props.match.params.search);
    }
  }
  handleCheckboxClick = (e) => {
    const {
      materialOptions,
      material,
      // categoryOptions,
      type,
      typeOptions,
      priceOption,
    } = this.state;
    console.log(e.target.value);
    if (material.includes(e.target.value)) {
      if (materialOptions.includes(e.target.value)) {
        const updatedOptions = materialOptions.filter(
          (option) => option !== e.target.value
        );
        this.setState({ materialOptions: updatedOptions });
      } else {
        this.setState({
          materialOptions: [...materialOptions, e.target.value],
        });
      }
    }
    //  else if (Object.values(this.category).includes(e.target.value)) {
    //   if (categoryOptions.includes(e.target.value)) {
    //     const updatedOptions = categoryOptions.filter(
    //       (option) => option !== e.target.value
    //     );
    //     this.setState({ categoryOptions: updatedOptions });
    //   } else {
    //     this.setState({
    //       categoryOptions: [...categoryOptions, e.target.value],
    //     });
    //   }
    // }
    else if (type.includes(e.target.value)) {
      if (typeOptions.includes(e.target.value)) {
        const updatedOptions = typeOptions.filter(
          (option) => option !== e.target.value
        );
        this.setState({ typeOptions: updatedOptions });
      } else {
        this.setState({ typeOptions: [...typeOptions, e.target.value] });
      }
    } else {
      if (priceOption === e.target.value) {
        this.setState({ priceOption: "" });
      } else {
        this.setState({ priceOption: e.target.value });
      }
    }
  };

  removeFilter = () => {
    // Đặt lại tất cả các tùy chọn về giá trị mặc định
    this.setState({
      materialOptions: [],
      priceOption: "",
      typeOptions: [],
    });
  
    // Khôi phục mảng searchProduct bằng mảng products ban đầu
    this.setState({
      searchProduct: [...this.state.products],
    });
  };
  


  appplyFilter = () => {
    const { materialOptions, priceOption, typeOptions, products } = this.state;
    console.log("materialOptions ", materialOptions);
    console.log("priceOption ", priceOption);
    console.log("typeOptions ", typeOptions);
    // Bắt đầu với mảng sản phẩm gốc
    let searchProduct = [...products];
    console.log(searchProduct);

    // Áp dụng điều kiện cho các lựa chọn từ người dùng
    if (materialOptions.length > 0) {
      // Lọc theo loại chất liệu
      searchProduct = searchProduct.filter((product) =>
        materialOptions.some(
          (material) =>
            material.toLowerCase() === product.material.toLowerCase()
        )
      );

      console.log(searchProduct);
    }

    if (priceOption !== "") {
      // Lọc theo giá
      // searchProduct = searchProduct.filter(product => product.price <= priceOption);

      if (priceOption === "asc") {
        searchProduct = searchProduct.sort((a, b) => a.price - b.price);
      } else if (priceOption === "desc") {
        searchProduct = searchProduct.sort((a, b) => b.price - a.price);
      }
    }

    if (typeOptions.length > 0) {
      // Lọc theo loại sản phẩm
      searchProduct = searchProduct.filter((product) =>
        typeOptions.some(
          (type) =>
            type.toLowerCase() === product.type.toLowerCase()
        )
      );
    }
    console.log("searchProduct", searchProduct);
    // Kết quả lọc được lưu trong searchProduct
    this.setState({ searchProduct }, () => {
      console.log(this.state.searchProduct);
    });
  };

  componentDidUpdate = (prevProps, nextProps) => {
    if (!isEqual(this.props.listProduct, prevProps.listProduct)) {
      this.props.fetchProductsRedux();
    }
  };

  addToCart = async (id) => {
    if (this.props.isLogin === 0) {
      await this.props.handleAddToCart(id, 1);
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

  toggleRadio = (radio) => {
    if (radio.checked) {
      radio.checked = false; // Bỏ chọn nếu đã được chọn
    } else {
      radio.checked = true; // Chọn nếu chưa được chọn
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
    this.setState({ option: op });
  };

  showFilter = () => {
    this.setState((prevState) => ({ filter: !prevState.filter }));
  };

  getCategoryName = (categoryId) => {
    return this.categoryName[categoryId] || categoryId; // Sử dụng tên tiếng Việt hoặc ID nếu không tìm thấy
  };

  render() {
    // this.state.category.map((categoryId) => console.log(categoryId));
    return (
      <Fragment>
        <Header type={0} option={this.showOption} />
        <div
          className={
            this.state.option ? "contain_bottom" + " contain" : "" + " contain"
          }
        >
          <div className="products_title">
            <h1 className="text-center title_products">fine jewelry</h1>
          </div>
          <div className="row align-items-md-end nav_products m-0">
            <div className="">
              <button
                className="d-inline-block filter_btn"
                onClick={this.showFilter}
              >
                <span className="me-2">FILTER</span>
                <span>
                  {!this.state.filter ? (
                    <ArrowRightIcon style={{ fontSize: "30px" }} />
                  ) : (
                    <ArrowDropDownIcon style={{ fontSize: "30px" }} />
                  )}
                </span>
              </button>
              <div className={`filter_div ${this.state.filter ? "show" : ""}`}>
                <div className="w-100 filter_cate">
                  <h1 className="title_cate">
                    <FiberSmartRecordIcon className="icon_dot" />
                    Danh mục trang sức
                  </h1>
                  <div>
                    {Object.keys(this.category).map((categoryId) => (
                      <Link to={`/category/${this.category[categoryId]}`}>
                        {this.getCategoryName(categoryId)}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="row">
                  <div className="col-3">
                    <h1 className="title_filter">
                      <FiberSmartRecordIcon className="icon_dot" />
                      Chất liệu
                    </h1>
                    <div>
                      {this.state.material.map((item, index) => (
                        <label
                          key={index}
                          className="text-capitalize d-block"
                          style={{ fontSize: "18px" }}
                        >
                          <input
                            type="checkbox"
                            value={item}
                            checked={this.state.materialOptions.includes(item)}
                            className="custom-checkbox"
                            onChange={this.handleCheckboxClick}
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="col-3">
                    <h1 className="title_filter">Loại trang sức</h1>
                    <div>
                      {this.state.type.map((item, index) => (
                        <label
                          key={index}
                          className="text-capitalize d-block"
                          style={{ fontSize: "18px" }}
                        >
                          <input
                            type="checkbox"
                            value={item}
                            checked={this.state.typeOptions.includes(item)}
                            className="custom-checkbox"
                            onChange={this.handleCheckboxClick}
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="col-3">
                    <h1 className="title_filter">Giá thành</h1>
                    <div>
                      {this.state.price.map((item, index) => (
                        <label
                          key={index}
                          className="text-capitalize d-block"
                          style={{ fontSize: "18px" }}
                        >
                          <input
                            type="checkbox"
                            value={item}
                            checked={this.state.priceOption === item}
                            className="custom-checkbox"
                            onChange={this.handleCheckboxClick}
                          />
                          <span>
                            {item === "asc" ? "Tăng dần" : "Giảm dần"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="apply_div text-end">
                  <button className="appply_btn" onClick={this.appplyFilter}>
                    Tìm Kiếm
                  </button>
                  <button className="remove_filter" onClick={this.removeFilter}>
                    <FilterAltOffIcon style={{fontSize: '16px', marginRight: '5px'}}/>
                    Xóa Filter
                  </button>
                </div>
                <div className="me-md-3 filter_search_btn">
                  <i className="fa-solid fa-magnifying-glass icon_search d-inline-block"></i>
                  <div className="d-inline-block position-relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm ...."
                      value={this.state.searchText}
                      onChange={(e) => this.search(e.target.value)}
                      className="filter_search_input"
                    />
                    {/* <button onClick={this.clearSearch} className="filter_search_clear">
                      <i className="fa-solid fa-xmark"></i>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-md-12 col-xl-7 col-xxl-6 row justify-content-between">
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
            </div> */}
          </div>
          <div className="filter_div_contain"></div>
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
    isLogin: state.login.role,
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

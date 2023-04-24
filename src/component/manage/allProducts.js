import React, { Fragment } from "react";
import { connect } from "react-redux";
import "./allProducts.css";
import SideBar from "./sideBar";
import { fetchProducts, deleteProduct } from "../../store/actions/productsAction";
import { Link } from "react-router-dom";

class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  deleteProduct = (id) => {
    this.props.deleteProduct(id);
  };

  componentDidMount = () => {
    this.props.getAllProducts();
    if(this.props.allProducts){
      this.props.allProducts.map((product, index) => {
        var myArrayImages = product.image.split(",");
        this.setState((prev) => ({
          images: [...prev.images, myArrayImages[1]],
        }));
      });
    }
  };

  render() {
    return (
      <Fragment>
        <div className="row justify-content-between">
          <SideBar />
          <div className="col-8 mt-3 me-5 main_side">
            <h1 className="text-uppercase text-center">tất cả sản phẩm</h1>
            <div className="row ad_pdhead">
              <div className="col-2">Mã SP</div>
              <div className="col-sm-4 col-lg-3">Tên Sản Phẩm</div>
              <div className="col-sm-4 col-lg-3 text-center">Mô Tả</div>
            </div>
            <div>
              {this.props.allProducts.map((product, index) => (
                <div key={product.id} className="row ad_itempd">
                  {/* <div className="col-3 ad_img">
                            <img src={this.state.images[index]} alt="" />
                        </div> */}
                  <div className="col-2">{product.id}</div>
                  <div className="col-sm-4 col-lg-3">{product.name}</div>
                  <div className="d-sm-none d-sm-block col-3">
                    <div>Chất Liệu: {product.material}</div>
                    <div>Loại: {product.type}</div>
                  </div>
                  <div className="col-sm-4 col-lg-2">
                    <div>
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </div>
                    <div>Số Lượng: {product.count}</div>
                  </div>
                  <div className="col-sm-1 col-lg-2 position-relative">
                    <i className="fa-solid fa-sort-down icon_display"></i>
                    <div className="edit_frame">
                      <div onClick={() => this.deleteProduct(product.id)}>
                        <i className="fa-solid fa-trash d-sm-none d-lg-block"></i>Xóa
                      </div>
                      <div>
                        <Link
                          to={{
                            pathname: "/ad/editpd",
                            state: {pd: product},
                          }}
                        >
                        <i className="fa-solid fa-pen d-sm-none d-lg-block"></i>Thay Đổi
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.getAllProducts.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(fetchProducts()),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);

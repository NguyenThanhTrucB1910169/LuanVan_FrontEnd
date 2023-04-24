import React, { Fragment } from "react";
import "./newProduct.css";
import { createProduct } from "../../store/actions/productsAction";
import { getIdProducts } from "../../store/actions/adminAction";
import { connect } from "react-redux";
import SideBar from "./sideBar";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import { withRouter } from "react-router-dom";

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      price: 0,
      count: 0,
      image: [],
      nameImage: [],
      imageUrl: [],
      description: "",
      type: "",
      material: "",
      validate: true,
      error: "",
    };
    this.categories = [
      "Vòng tay",
      "Nhẫn",
      "Hoa Tai",
      "Lắc Tay",
      "Chuỗi Ngọc Trai",
      "Vòng Cổ",
      "Ghim Cài",
    ];
    this.materials = [
      "Bạc",
      "Vàng Hồng",
      "Ngọc Trai",
      "Bạch Kim",
      "Đá Quý",
      "Pha Lê",
    ];
    // this.imageArray = [];
  }

  componentDidMount = () => {
    this.props.getIdProducts();
  };

  uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "jkit6nzk");
    data.append("cloud_name", "dylpbe4y8");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dylpbe4y8/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const fileitem = await res.json();
    this.setState((prevurl) => ({
      imageUrl: [...prevurl.imageUrl, fileitem.url],
    }));
  };

  submitProductHandler = async (e) => {
    e.preventDefault();
    if (this.state.validate) {
      const imageFiles = this.state.image;
      for (let i = 0; i < imageFiles.length; i++) {
        await this.uploadImage(imageFiles[i]);
      }
      await this.props.createNewProduct(this.state);
      if (this.props.result) {
        toast.success(<Toast message="Thêm sản phẩm thành công" />, {
          className: "success",
        });
      }
      this.setState({
        id: "",
        name: "",
        price: 0,
        count: 0,
        image: [],
        imageUrl: [],
        description: "",
        type: "",
        material: "",
        nameImage: [],
      });
    }
  };

  validateForm = (e) => {
    if (this.props.listId.some((item) => item.id === e.target.value)) {
      this.setState({ error: "Mã Sản Phẩm Bị Trùng", validate: false });
    } else this.setState({ id: e.target.value, error: "", validate: true });
  };

  render() {
    console.log(this.state);
    return (
      <Fragment>
        <div className="row justify-content-between">
          <SideBar />
          <form
            className="mt-4 col-6 form_add main_side"
            encType="multipart/form-data"
            onSubmit={this.submitProductHandler}
          >
            <h1 className="text-uppercase text-center ad_title">
              thêm sản phẩm
            </h1>
            <div className="row">
              <div className="mb-3 col-4">
                <input
                  type="text"
                  placeholder="Mã Sản Phẩm"
                  required
                  className="form_add_item"
                  value={this.state.id}
                  onChange={this.validateForm}
                />
                <div className="error_ad">
                  {this.state.error ? this.state.error : null}
                </div>
              </div>
              <div className="mb-3 col-8">
                <input
                  type="text"
                  placeholder="Tên Sản Phẩm"
                  required
                  className="form_add_item"
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-6">
                <select
                  className="form_add_item"
                  required
                  value={this.state.material}
                  onChange={(e) => {
                    this.setState({ material: e.target.value });
                  }}
                >
                  <option value="">Chất Liệu</option>
                  {this.materials.map((mate) => (
                    <option key={mate} value={mate}>
                      {mate}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col-6">
                <select
                  className="form_add_item"
                  required
                  value={this.state.type}
                  onChange={(e) => {
                    this.setState({ type: e.target.value });
                  }}
                >
                  <option value="">Loại Trang Sức</option>
                  {this.categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-7">
                <input
                  type="number"
                  placeholder="Giá Sản Phẩm"
                  required
                  value={this.state.price}
                  className="form_add_item"
                  onChange={(e) => {
                    this.setState({ price: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3 col-5">
                <input
                  className="form_add_item"
                  type="number"
                  placeholder="Số Lượng"
                  value={this.state.count}
                  required
                  onChange={(e) => {
                    this.setState({ count: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <textarea
                placeholder="Mô Tả Sản Phẩm"
                className="form_add_des"
                required
                value={this.state.description}
                onChange={(e) => {
                  this.setState({ description: e.target.value });
                }}
                cols="30"
                rows="7"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="inputField" className="label_field">
                Ảnh Sản Phẩm
              </label>
              <input
                id="inputField"
                type="file"
                name="image"
                required
                style={{ display: "none" }}
                onChange={(e) => {
                  this.setState({ image: e.target.files }, () => {
                    Array.from(this.state.image).forEach((key) => {
                      this.setState((prev) => ({
                        nameImage: [...prev.nameImage, key.name],
                      }));
                    });
                  });
                  this.setState({ nameImage: [] });
                }}
                multiple
                accept="image/png , image/jpeg, image/webp"
              />
              <div className="row justify-content-between list_review">
                {this.state.nameImage
                  ? this.state.nameImage.map((name, index) => (
                      <img
                        src={`/products/${name}`}
                        alt=""
                        className="col-3"
                        key={index}
                      />
                    ))
                  : null}
              </div>
            </div>
            <div className="text-center mb-3">
              <button type="submit" className="btn_ad_create">
                Thêm
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.getAllProducts.message)
  return {
    result: state.getAllProducts.message,
    listId: state.admin.idproducts,
  };
};

const mapDispatchToPro = (dispatch) => {
  return {
    createNewProduct: (val) => dispatch(createProduct(val)),
    getIdProducts: () => dispatch(getIdProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToPro)(CreateProduct);

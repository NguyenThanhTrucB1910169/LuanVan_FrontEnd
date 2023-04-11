import React, { Fragment } from "react";
import SideBar from "./sideBar";
import './editProduct.css'
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { updateProduct } from "../../store/actions/productsAction";
import { toast } from "react-toastify";
import Toast from "../home/toast";

class EditProduct extends React.Component {
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
            currentImages: [],
            validate: true,
            error: ''
          };
          this.categories = [
            "Vòng tay",
            "Nhẫn",
            "Hoa Tai",
            "Lắc Tay",
            "Chuỗi Ngọc Trai",
            "Vòng Cổ",
          ];
          this.materials = [
            "Bạc",
            "Vàng Hồng",
            "Ngọc Trai",
            "Bạch Kim",
            "Đá Quý",
            "Pha Lê",
          ];
    }
    uploadImage = async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "jkit6nzk");
      data.append("cloud_name", "dylpbe4y8");
      // this.setState({loading: true})
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
    componentDidMount = () => {
      if(this.props.location.state){
      var pd = this.props.location.state.pd
      var newImages = pd.image.split(",");
      // console.log(pd)
      this.setState({
        id: pd.id,
        name: pd.name,
        price: pd.price,
        count: pd.count,
        currentImages: newImages,
        description: pd.description,
        type: pd.type,
        material: pd.material,
      })
      }
    }

submitEdit = async(e) => {
  e.preventDefault();
  // console.log(this.state)
  if(this.state.image.length > 0) {
    const imageFiles = this.state.image;
    for (let i = 0; i < imageFiles.length; i++) {
      // console.log(imageFiles[i])
      await this.uploadImage(imageFiles[i]);
    }
    this.props.updateProduct(this.state);
  } else {
    // console.log("Uploading image")
    this.setState({imageUrl: this.state.currentImages}, () => {
      this.props.updateProduct(this.state);
    })
  }

  // if(this.props.isUpdate){
  //   console.log(this.props.isUpdate)
  //   toast.success(<Toast message='Cập nhật sản phẩm thành công'/>, {className: 'success'})
  // }
  // console.log(this.state)
  // console.log(this.state)
  // await this.props.updateProduct(this.state);
}

componentDidUpdate = (prevProps) => {
  // console.log('current', this.props.isUpdate)
  // console.log('before', prevProps.isUpdate)
  if (JSON.stringify(prevProps.isUpdate) !== JSON.stringify(this.props.isUpdate) ) {
        toast.success(<Toast message='Cập nhật thành công'/>, {className: 'success'})
  }
}

validateForm = (e) => {
  if(this.props.listId.some(item => item.id === e.target.value)){
    if(e.target.value === this.props.location.state.pd.id){
      this.setState({id: e.target.value, error: '', validate: true})
    }
   else this.setState({error: 'Mã Sản Phẩm Bị Trùng', validate: false})   
  }
   else this.setState({id: e.target.value, error: '', validate: true})
 }

    render() {
        // const detail = this.props.location.state.pd 
        // console.log(this.state)
        return (
            <Fragment>
                   <div className="row justify-content-between">
          <SideBar />
          <form
            className="mt-4 col-6 form_add main_side"
            encType="multipart/form-data"
            onSubmit={this.submitEdit}
          >
            <h1 className="text-uppercase text-center ad_title">Tùy chỉnh sản phẩm</h1>
            <div className="row">
              <div className="mb-3 col-2 edit_id">
                <i className="fa-solid fa-link"></i>
                <span>{this.state.id}</span>                
              </div>
              <div className="mb-3 col-10">
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
            <label htmlFor="inputField" className="label_field">Ảnh Sản Phẩm</label>
              <input
                id="inputField"
                type="file"
                name="image"
                // required
                style={{display: 'none'}}
                onChange={(e) => {
                  this.setState({ image: e.target.files }, () => {
                    Array.from(this.state.image).forEach((key) => {
                      this.setState((prev) => ({
                        nameImage: [...prev.nameImage, key.name]
                      }))
                    })
                  });
                  this.setState({nameImage: []})
                }}
                multiple
                accept="image/png , image/jpeg, image/webp"
              />
               <div className="row justify-content-between list_review">
                {this.state.currentImages.length === 0 || this.state.nameImage.length !== 0 ? '' : 
                this.state.currentImages.map((image, index) => (
                  <img src={image} alt="" className="col-3" key={index}/>
                ))
                }
              </div>
            <div className="row justify-content-between list_review">
            {this.state.nameImage ? 
              this.state.nameImage.map((name, index) => (
                <img src={`/products/${name}`} alt="" className="col-3" key={index}/>
              )) : null
            }
            </div>
            </div>
            <div className="row justify-content-between mb-4">
            <Link to="/ad/listpd" className="col-2 btn_ad_return">
            <i className="fa-solid fa-chevron-left"></i>
            Trở về</Link>
            <button type="submit" className="col-3 btn_ad_create">
              Cập Nhật
            </button>
            </div>
          </form>
        </div>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
    isUpdate: state.getAllProducts.update
    };
  };
  
  const mapDispatchToPro = (dispatch) => {
    return {
      updateProduct: (pd) => dispatch(updateProduct(pd))
    };
  };
  
export default connect(mapStateToProps, mapDispatchToPro)(withRouter(EditProduct));
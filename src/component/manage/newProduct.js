import React, { Fragment } from "react";
// import "./newProduct.css";
import { createProduct } from "../../store/actions/productsAction";
// import { useDispatch } from "react-redux";
// import Resizer from 'react-image-file-resizer';
import { connect } from "react-redux";
// const cloudinary = require("cloudinary");
// cloudinary.config({ 
//   cloud_name: 'dylpbe4y8', 
//   api_key: '319716919847427', 
//   api_secret: 'CKshUB94UwkRepsSDaTXv73fJQY',
// });
class CreateProduct extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        id: "",
      name: "",
      price: 0,
      count: 0,
      image: [],
      imageUrl: [],
      description: "",
      type: "",
      material: "",
      // loading: false,
    };
    this.categories = [
      "Bracelet",
      "Ring",
      "Eardrop",
      "Bangles",
      "Pearlchain",
      "Choker",
    ];
    this.materials = [
        "gold", 
        "silver",
        "platinum",
        "gemstone",
        "crystal"
    ]
    // this.imageArray = [];
  }

    uploadImage = async(file) => {
      const data = new FormData();
      data.append('file', file)
      data.append('upload_preset','jkit6nzk')
      data.append('cloud_name',"dylpbe4y8")
      // this.setState({loading: true})
      const res = await fetch("https://api.cloudinary.com/v1_1/dylpbe4y8/image/upload", {
        method: 'POST',
        body: data
      })

      const fileitem = await res.json()
      // console.log(fileitem)
      this.setState(prevurl => ({
        imageUrl: [...prevurl.imageUrl,fileitem.url]
      }))
    }

  submitProductHandler = async(e) => {
  
        e.preventDefault();
        console.log(111)
        const imageFiles = this.state.image
        for(let i =0; i< imageFiles.length;i++){
          // console.log(imageFiles[i])
          await this.uploadImage(imageFiles[i]);
        }
        // console.log(this.state)
        // console.log(this.state)
        await this.props.createNewProduct(this.state);
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
        })
        // console.log(e.target.value);
        // console.log(111)
//    console.log(e.target)
    // console.log(this.state.image)
    // console.log(this.state);
    // console.log(this)
    // const dispatch = useDispatch();
    // dispatch(createProduct, )
  // for (let i = 0; i < this.state.image.length; i++) {
  //   const result = await cloudinary.v2.uploader.upload(this.state.image[i], {
  //     folder: "products",
  //   }, (err, result) => {
  //     console.log(result)
  //   }
  //   );
  //   console.log(result)
  // console.log(this.state.image[i])
  // }
    // this.props.createNewProduct(this.state);
    // this.setState({image: []})
    // <Link to='/products'></Link>
    // if (this.props.result) {
    //   this.props.history.push("/products");
      // <Link to="/products"/>
      // console.log(this.props.history.location.pathname('/products'))
    // }
  };
    // resizeFile = (file) => new Promise(resolve => {
    // Resizer.imageFileResizer(file, 225, 225, 'PNG', 100, 0,
    // uri => {
    //   resolve(uri);
    // },
    // 'base64'
    // );
    // });
  
  onSelected = (e) => {
    // const files = Array.from(e.target.files);

    // files.forEach((file) => {
    //   // const reader = new FileReader();
    //     // const image = await this.resizeFile(file);
    //     // console.log(file);
    //   // reader.onload = () => {
    //    this.setState(prevState => ({
    //     image: [...prevState.image, reader.result]
    //   }))
    //   // };

    //   // reader.readAsDataURL(file)
    // });
    // console.log(this.imagesArray)
  }

  render() {
    return (
      <Fragment>
        <form className="ms-5"  encType="multipart/form-data" onSubmit={this.submitProductHandler}>
        <h1>thêm sp</h1>
        <div className="mb-3">
            <input
              type="text"
              placeholder="Product id"
              // required
              value={this.state.id}
              onChange={(e) => {
                this.setState({ id: e.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Product Name"
              // required
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <select
              onChange={(e) => {
                this.setState({ material : e.target.value });
              }}
            >
              <option value="">Choose materials</option>
              {this.materials.map((mate) => (
                <option key={mate} value={mate}>
                  {mate}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Price"
              // required
              onChange={(e) => {
                this.setState({ price: e.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Product Description"
              //   value={description}
              onChange={(e) => {
                this.setState({ description: e.target.value });
              }}
              cols="30"
              rows="1"
            ></textarea>
          </div>
          <div className="mb-3">
            <select
              onChange={(e) => {
                this.setState({ type: e.target.value });
              }}
            >
              <option value="">Choose Category</option>
              {this.categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Count"
              // required
              onChange={(e) => {
                this.setState({ count: e.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              name="image"
              onChange={(e) => {
                this.setState({ image: e.target.files});
              }}
              multiple
              accept="image/png , image/jpeg, image/webp"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.getAllProducts.message)
  return {
    result: state.getAllProducts.message,
  };
};

const mapDispatchToPro = (dispatch) => {
  return {
    createNewProduct: (val) => dispatch(createProduct(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToPro)(CreateProduct);

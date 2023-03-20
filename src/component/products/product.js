import React, { Fragment } from "react";
import {connect} from "react-redux";
import {fetchProducts, saveDetail} from "../../store/actions/productsAction"
import {addToCart} from "../../store/actions/cartAction"
import './product.css';
import Footer from "../home/footer";
import ProductCard from "./productCard";
import SubHeader from "../layouts/subHeader";
import { toast } from "react-toastify";
import Toast from '../home/toast'
class Product extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     arrayImages: [],
  //   }
  // };

  

  async componentDidMount() {
    // console.log(2222);
    await this.props.fetchProductsRedux()
    // this.configImage(this.props.listProduct)  
  }

  addToCart = (id) => {
    // console.log(id)
    // this.props
    this.props.handleAddToCart(id, 1)
    if(this.props.messageAdded){
      toast.success(<Toast message="Đã thêm vào giỏ hàng"/>, {
        className: 'success',
      })
    }
  }

  render() {
    // console.log(typeof this.props.listProduct[0].image)
    // console.log(this.props.listProduct[0].image)
    // console.log(this.state.arrayImages)
    return (
        <Fragment>
        <SubHeader />
        <div className="contain">
        <h1>tất cả sản phẩm</h1>
        <div className="row mx-3">
        {
          this.props.listProduct.map((product, index) => 
            (
              <div className="col-3" key={index}>
    
                <ProductCard cardItem={product} onSendProduct={this.addToCart} getDetailPd={(pd) => this.props.saveDetailInfo(pd)}/>
              </div>
            )
          )
        }
        </div>

        </div>
   
        <Footer />
      </Fragment>
    );
  }
  
};


const mapStateToProps = (state) => {
  // console.log(state.getAllProducts)
  return {
    listProduct: state.getAllProducts.products,
    messageAdded: state.cart.message
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductsRedux: () => dispatch(fetchProducts()),
    handleAddToCart: (id, qt) => dispatch(addToCart(id, qt)),
    saveDetailInfo: (pd) => dispatch(saveDetail(pd))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Product);
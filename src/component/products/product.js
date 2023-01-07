import React, { Fragment } from "react";
import {connect} from "react-redux";
import {fetchProducts} from "../../store/actions/productsAction"
import './product.css';
import Footer from "../home/footer";
import ProductCard from "./productCard";
class Product extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {

  //   // }
  // };
  componentDidMount() {
    console.log(2222);
    this.props.fetchProductsRedux()
  }
  render() {
    // console.log(this.props.listProduct)
    return (
        <Fragment>
        <div className="contain">
        <div className="row mx-5">
        {
          this.props.listProduct.map((product) => 
            (
              <div className="col-3">
                <ProductCard cardItem={product}/>
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
    listProduct: state.getAllProducts.products
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductsRedux: () => dispatch(fetchProducts())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Product);
import * as Types from "../constants/actionType";
// import {getAllProducts} from "../services/products";
// import {getAllProducts} from "../../services/products"
import axios from "axios";
const fetchProducts = () => {
    return async (dispatch, getState) => {
    try {
        let res = await axios.get('http://localhost:3005/api/products');
        // console.log(res.data);
      if (res) {
        dispatch({
          type: Types.FETCH_PRODUCTS,
          products: res.data,
        });
      }
      else {
        dispatch({ type: Types.FETCH_PRODUCTS_FAIL})
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const createProduct = (req) => {
  return async (dispatch) => {
    try {
      console.log(req)
      await axios.post('http://localhost:3005/api/products', req)
      .then ((res) => {
        dispatch({
          type: Types.CREATE_PRODUCT,
          message: 'Product successfully',
        })
      })
      .catch((err) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error);
    }
  }
}

const saveDetail = (pd) => {
  return (dispatch) => {
    dispatch({
      type: Types.DETAIL_PRODUCT,
      payload: pd
    })
  }
}

export {
  fetchProducts,
  createProduct,
  saveDetail
}
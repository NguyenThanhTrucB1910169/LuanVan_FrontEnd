import * as Types from "../constants/actionType";
// import {getAllProducts} from "../services/products";
// import {getAllProducts} from "../../services/products"
import axios from "axios";
const fetchProducts = () => {
    return async (dispatch, getState) => {
    try {
        let res = await axios.get('http://localhost:3005/api/products');
        // console.log(res);
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
          type: Types.CREATE_PRODUCT_SUCCESS,
          message: true,
        })
      })
      .catch((err) => {
        dispatch({
          type: Types.CREATE_PRODUCT_FAILED,
          message: err,
        })
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

const deleteProduct = (id) => {
  return async(dispatch) => {
    try {
      await axios.delete('http://localhost:3005/api/deleteproduct',{data: {id: id}, withCredentials: true}).then((res) => {
        if (res.data) {
          axios.get('http://localhost:3005/api/products').then((pd) => {
            dispatch({
              type: Types.FETCH_PRODUCTS,
              products: pd.data,
            });
          })
        } else {
          dispatch({
            type: Types.DELETE_PRODUCT_FAILED,
            payload: res.data,
          });
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}

const updateProduct = (pd) => {
  return async (dispatch) => {
    try {
      console.log(pd)
      axios.put('http://localhost:3005/api/products', pd, {withCredentials: true }).then((response) => {
        if (response.data){
          // fetchProducts()
          dispatch({
            type: Types.UPDATE_PRODUCT_SUCCESS,
            payload: response.data
          })          
        }
      })
    } catch (error) {
      dispatch({
        type: Types.UPDATE_PRODUCT_FAILED,
        payload: error
      })     
    }
  }
}

export {
  fetchProducts,
  createProduct,
  saveDetail,
  deleteProduct,
  updateProduct
}
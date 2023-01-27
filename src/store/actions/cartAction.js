import * as Types from "../constants/actionType";
import axios from "axios";

let addToCart = (idproduct, qt) => {
  return async (dispatch, getState) => {
    let user = JSON.parse(localStorage.getItem("isactive"));
    let isCart = JSON.parse(localStorage.getItem(`cart${user.id}`));
    let product = await axios.get(
      `http://localhost:3001/api/product/${idproduct}`
    );
    let data = {
      productId: product.data.id,
      productName: product.data.name,
      productPrice: product.data.price,
      productImage: product.data.image,
      productType: product.data.type,
      quantity: qt,
    };
    if (isCart) {
      let isExist = false;
      isCart.map((cart) => {
        // console.log(cart)
        if (cart.productId === idproduct) {
          isExist = true;
          cart.quantity = cart.quantity + 1;
        }
        // console.log(cart.productId === idproduct)
      });
      if (isExist) {
        dispatch({
          type: Types.ADD_TO_CART,
          payload: isCart,
        });
        localStorage.setItem(`cart${user.id}`, JSON.stringify(isCart));
      } else {
        let cartnew = [...isCart, data];
        dispatch({
          type: Types.ADD_TO_CART,
          payload: cartnew,
        });
        localStorage.setItem(`cart${user.id}`, JSON.stringify(cartnew));
        // localStorage.setItem(`cart${user.id}`,null);
      }
    } else {
      localStorage.setItem(
        `cart${user.id}`,
        JSON.stringify(getState().cart.cartItem)
      );
    }

    // let cart = JSON.parse(localStorage.getItem('cartItem'))
    // cart.splice(0, 3)
    // let getToken = localStorage.getItem("isactive")
    // let token = await JSON.parse(getToken).user
    // console.log(token)
    // await axios.get(`http://localhost:3001/api/cart/${token}/${product.data.id}/${1}`)
  };
};

const getCartItem = () => {
  return (dispatch, getState) => {
    let user = JSON.parse(localStorage.getItem("isactive"));
    let cart = JSON.parse(localStorage.getItem(`cart${user.id}`));
    if (cart) {
      dispatch({
        type: Types.LOAD_CART_SUCCESS,
        payload: cart,
      });
    } else {
      dispatch({
        type: Types.LOAD_CART_FAILED,
        message: "dont have item",
      });
    }
  };
};

const updateCartAmount = (id, qt) => {
  return (dispatch, getState) => {
    let user = JSON.parse(localStorage.getItem("isactive"));
    let cart = JSON.parse(localStorage.getItem(`cart${user.id}`));
    cart.map((cartItem) => {
      if(cartItem.productId === id) {
        cartItem.quantity = qt
      }
    })
    dispatch({
      type: Types.UPDATE_CART_SUCCESS,
      payload: cart
    })
    localStorage.setItem(`cart${user.id}`, JSON.stringify(cart))
  };
};

const removeItem = (id) => {
  return (dispatch, getState) => {
    let user = JSON.parse(localStorage.getItem("isactive"));
    let cart = JSON.parse(localStorage.getItem(`cart${user.id}`));
    cart.map((item, index) => {
      if(item.productId === id) {
        cart.splice(index, 1);
      }
    })
    // console.log(cart)
    dispatch({
      type: Types.REMOVE_ITEM_SUCCESS,
      payload: cart
    })
    localStorage.setItem(`cart${user.id}`, JSON.stringify(getState().cart.cartItem))
  }
}

// use database
// const getCartItem = (idToken) => {
//   return async(dispatch, getState) => {
//     await axios.get(`http://localhost:3001/api/cartload/${idToken}`).then((res) => {
//       dispatch({
//         type: Types.LOAD_CART_SUCCESS,
//         payload: res.data
//       })
//     })
//     .catch((err) => {
//       dispatch({
//         type: Types.LOAD_CART_FAILED,
//         message: err.message,
//       })
//     })
//   }
// }

// const getProductInCart = (productId) => {
//   return (dispatch, getState) => {
//     console.log(productId)
//   }
// }

// const updateCartAmount  = (amount, idproduct) => {
//   return async(dispatch, getState) => {
//     let getToken = localStorage.getItem("isactive")
//     let token = await JSON.parse(getToken).user
//     // console.log(idproduct)
//     let item = {
//       quantity: amount,
//       id: idproduct,
//     }
//     // console.log(item.quantity)
//     await axios.put(`http://localhost:3001/api/updateamount/${token}`, item)
//   }
// }

export { addToCart, getCartItem, updateCartAmount, removeItem };

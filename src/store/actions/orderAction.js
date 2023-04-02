import axios from "axios";
import * as Types from '../constants/actionType'

const createOrder = (data) => {
    return (dispatch) => {
        try {
            // console.log(data);
            axios.post('http://localhost:3005/api/order/', data, {withCredentials: true})
            .then((response) => {
                if(response.data){
                    dispatch({
                        type: Types.ORDER_SUCCESS,
                        payload: response.data
                    })
            }})
            .catch((error) => {
                dispatch({
                    type: Types.ORDER_FAILED,
                    payload: error
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
}


const getOrderByUser = () => {
    return (dispatch) => {
        try {
            // console.log(1)
            axios.get('http://localhost:3005/api/order/', {withCredentials: true})
            .then((data) => {
                // console.log(data.data)
                dispatch({
                    type: Types.GET_ORDERS_SUCCESS,
                    payload: data.data,
                })
            })
        } catch (error) {
            dispatch({
                type: Types.GET_ORDERS_FAILED,
                payload: error
            })
        }
    }
}

const getDetailProduct = (id) => {
return (dispatch) => {
    try {
        axios.get(`http://localhost:3005/api/order/${id}`, {withCredentials: true}).then((val) => {
            console.log(val.data)
            dispatch({
                type: Types.DETAIL_ORDER_SUCCESS,
                payload: val.data
            })
        })
    } catch (error) {
        dispatch({
            type: Types.DETAIL_ORDER_FAILED,
            payload: error.message
        })
    }
}
}

export {createOrder, getOrderByUser, getDetailProduct}
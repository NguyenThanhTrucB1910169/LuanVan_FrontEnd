import * as Types from "../constants/actionType";
import axios from "axios";

const paymentHandle = (req) => {
  return async (dispatch) => {
    try {
        console.log(req)
      await axios.post("http://localhost:3005/api/payment", req, {
        withCredentials: true,
      }).then((val) => {
      console.log(val)  
      // if (val === true) {
        //   dispatch({
        //     type: Types.SEND_SERVER_SUCCESS,
        //   });
        // } else {
        //   dispatch({
        //     type: Types.SEND_SERVER_FAILED,
        //   });
        // }
      });
    } catch (error) {
      dispatch({
        type: Types.SEND_SERVER_FAILED,
      });
    }
  };
};

export { paymentHandle };

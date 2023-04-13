import React from "react";
import { Fragment } from "react";
import './completeOrder.css'
import StepLayout from "./stepLayout";
import { Link } from "react-router-dom";

class CompleteOrder extends React.Component {
    render() {
        return (
            <Fragment>
            <StepLayout activeStep={2} />
            <div className="order_complete_img">
                <img src="./completed.gif" className="text-center" alt="" />
            </div>
                <h1 className="text-center text-capitalize my-3 success_order">Hoàn thành đặt hàng</h1>
                <div className="row justify-content-around btn_group_complete">
                <Link to="/" className="col-4 text-end"><i className="fa-solid fa-caret-left"></i> <span className="ms-3">Về Trang chủ</span></Link>
                <Link to="/vieworder" className="text-capitalize col-4"><i className="fa-solid fa-list-ol"></i><span className="ms-3">Xem lịch sử đặt hàng</span> </Link>
                </div>
            </Fragment>
        )
    }
}

export default CompleteOrder;
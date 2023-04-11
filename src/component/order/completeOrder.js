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
                <img src="./completed.gif" className="text-center" alt="" />
                <h1 className="text-center">Hoàn thành đặt hàng</h1>
                <Link to="/vieworder" className="text-capitalize">Xem lịch sử đặt hàng</Link>
            </Fragment>
        )
    }
}

export default CompleteOrder;
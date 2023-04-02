import React from "react";
import { Fragment } from "react";
import './completeOrder.css'
import StepLayout from "./stepLayout";

class CompleteOrder extends React.Component {
    render() {
        return (
            <Fragment>
            <StepLayout activeStep={2} />

                <h1>Hoàn thành đặt hàng</h1>
            </Fragment>
        )
    }
}

export default CompleteOrder;
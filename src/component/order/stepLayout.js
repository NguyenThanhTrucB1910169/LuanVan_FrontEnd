import React, { useState } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import "./stepLayout.css";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import DoneIcon from "@material-ui/icons/Done";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";

const StepLayout = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Thông tin giao hàng</Typography>,
      icon: <LocalShippingIcon />,
      iconComplete: <DoneIcon />,
    },
    {
      label: <Typography>Xác nhận đặt hàng</Typography>,
      icon: <AccountBalanceIcon />,
      iconComplete: <DoneIcon />,
    },
    {
      label: <Typography>Thanh Toán</Typography>,
      icon: <CreditCardIcon />,
      iconComplete: <DoneIcon />,
    },
    {
      label: <Typography>Hoàn thành đặt hàng</Typography>,
      icon: <CheckCircleIcon />,
      iconComplete: <DoneIcon />,
    },
  ];
  const [step, setStep] = useState(activeStep);
  const linkActiveStep = (step) => {
    setStep(step);
  };
  return (
    <div className="row w-100">
      <div className="col-1 text-center pt-4">
        <Link to="/cart" className="btn_exit">
          <i className="fa-solid fa-circle-xmark"></i>Thoát
        </Link>
      </div>
      <div className="col-11">
        <Stepper alternativeLabel activeStep={step}>
          {steps.map((item, index) => (
            <button className="btn_step" onClick={() => linkActiveStep(index)}>
              <Step
                key={index}
                active={step === index ? true : false}
                completed={step >= index ? true : false}
                // completed={true}
                className="step_box"
              >
                <StepLabel
                  // style={{
                  //   color: activeStep >= index ? "#198754" : "rgba(0, 0, 0, 0.649)",
                  // }}
                  className={
                    step >= index
                      ? "step_label_active"
                      : "step_label_disabled"
                  }
                  icon={step - 1 >= index ? item.iconComplete : item.icon}
                >
                  {item.label}
                </StepLabel>
              </Step>
            </button>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default StepLayout;

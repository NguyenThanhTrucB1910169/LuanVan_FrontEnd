import React from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import './stepLayout.css'
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PaymentIcon from '@material-ui/icons/Payment';
import DoneIcon from '@material-ui/icons/Done';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
class StepLayout extends React.Component {
    steps = [
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
          label: <Typography>Hoàn thành đặt hàng</Typography>,
          icon: <CheckCircleIcon />,
          iconComplete: <DoneIcon />,
        }
        // {
        //   label: <Typography>Thanh toán</Typography>,
        //   icon: <PaymentIcon />,
        //   iconComplete: <DoneIcon />,
        // },
      ];
    render() {
        return(
            <Stepper alternativeLabel activeStep={this.props.activeStep}>
            {console.log(this.props.activeStep)}
            {this.steps.map((item, index) => (
              <Step
                key={index}
                active={this.props.activeStep === index ? true : false}
                completed={this.props.activeStep >= index ? true : false}
                // completed={true}
                className="step_box"
              >
                
                <StepLabel
                  // style={{
                  //   color: this.props.activeStep >= index ? "#198754" : "rgba(0, 0, 0, 0.649)",
                  // }}
                  className={this.props.activeStep >= index ? "step_label_active" : "step_label_disabled"}
                  icon={this.props.activeStep -1 >= index ? item.iconComplete : item.icon}
                >
                  {item.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )
    }
}

export default StepLayout;


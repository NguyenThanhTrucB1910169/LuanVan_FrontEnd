import React from "react";
import { Fragment } from "react";
import SideBar from "./sideBar";
import './dashBoard.css'

class DashBoard extends React.Component {
    render() {
        return (
            <Fragment>
            <div className="row ad_dash">
            <SideBar />
            <div className="col-7 container pt-4">
            <div>DashBoard</div>
          </div>
            </div>
            </Fragment>
        )
    }
}

export default DashBoard;
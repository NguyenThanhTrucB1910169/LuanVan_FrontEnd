import React from "react"
import './toast.css'
class Toast extends React.Component {
    render() {
        return (
            <h6>{this.props.message}</h6>
        )
    }
}

export default Toast;
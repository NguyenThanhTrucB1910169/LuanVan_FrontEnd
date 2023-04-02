import React from "react";
import { Fragment } from "react";
import './orderDetail.css'
import SubHeader from "../layouts/subHeader";
import Footer from "../home/footer";
import { withRouter } from "react-router-dom";
import { getDetailProduct } from "../../store/actions/orderAction";

import { connect } from "react-redux";
class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
        }
    }
    componentWillMount = async() => {
        this.props.getDetailProduct(this.props.location.params.id)
    }

    
    render() {
        console.log(this.state.images)
        console.log(this.props.detailsOrder)
        return (
            <Fragment>
            <SubHeader />
            <div className="view_detail"></div>
            <div className="row justify-content-between">
                <div className="col-1 text-center">
                    <i class="fa-solid fa-angles-left"></i>
                </div>
                <h1 className="col-11 text-center">Chi Tiết Đơn hàng</h1>
            </div>
                <div className="d-flex flex-column">
                    <h3>Mã đơn hàng:  {this.props.detailsOrder[0].id.toString().length == 1 ? `#0${this.props.detailsOrder[0].id}` : `#${this.props.detailsOrder[0].id}`}</h3>
                    <p>Ngày đặt: {Date.parse(this.props.detailsOrder[0].createdAt)} </p>
                </div>
                <div className="">
                {
                    this.props.detailsOrder.map((detail, index) => (
                        <div className="row justify-content-around detail_card" key={index}>
                        <div className="col-2 img_detail p-0 text-center">
                            <img src={detail.image.split(',')[0]} alt="" />
                        </div>
                        <div className="col-6 title_detail p-0">
                            <h2>{detail.name}</h2>
                            <p>Mã sản phẩm: {detail.productId}</p>
                        </div>
                        <div className="col-4 price_detail">
                            <h3>Giá: {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detail.price)}</h3>
                            <p>Qty: {detail.quantity}</p>
                        </div>
                    </div>
                    ))
                }
                   
                   
                </div>
                <div className="sum_detail">
                    <div className="row justify-content-end">
                        <div className="col-3">
                    <h1>Tổng đơn hàng</h1>
                            <div className="row justify-content-between">
                                <div className="col-3">Tổng đơn</div>
                                <div className="col-4">10.000.000đ</div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-3">Phí</div>
                                <div className="col-4">Miễn Phí</div>
                            </div>
                            <div className="border_sum"></div>
                            <div className="row justify-content-between">
                                <div className="col-3">Tổng cộng</div>
                                <div className="col-4">10.000.000đ</div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        detailsOrder: state.orderInfo.detail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDetailProduct: (id) => dispatch(getDetailProduct(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderDetail));
import React, { Fragment, useEffect, useState } from "react";
import "./notify.css";
import { useHistory } from "react-router-dom";
// import { useAlert } from "react-alert";
// import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

const Notify = ({ lengthNotiList }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.role);
  const userName = useSelector((state) => state.login.user);
  const allOrders = useSelector((state) => state.orderInfo.listOrder);
  const [listNoti, setListNoti] = useState([]);
  const [previousOrders, setPreviousOrders] = useState(allOrders);

  useEffect(async () => {
    if (allOrders.length > 0) {
      // const previousOrdersCopy = [...allOrders];
      console.log("previousOrdersCopy ", previousOrders);
      const updatedListNoti = allOrders.map((order) => {
        return {
          id: order.id,
          status: order.status,
        };
      });
      console.log('length of changed func ', await getChangedOrderCount(allOrders, updatedListNoti).length)
      if (getChangedOrderCount(allOrders, updatedListNoti).length > 0) {
        const newList = await getChangedOrderCount(updatedListNoti);
        console.log("newList ", newList);
        setPreviousOrders(updatedListNoti)
        setListNoti(newList);
        lengthNotiList(newList.length);
      } else {
        setListNoti([]);
        lengthNotiList(null);
      }
    }

    console.log(listNoti);
  }, [allOrders]);
  const getChangedOrderCount = (currentOrders) => {
    console.log(currentOrders);
    console.log(previousOrders);
    var newAlert = [];
    for(const current of currentOrders){
      for(const previous of previousOrders){
        if(current.id === previous.id){
          if(current.status !== previous.status){
            newAlert = [...newAlert, current];
          }
        }
      }
    }
    console.log(newAlert);
    return newAlert;
  };

  useEffect(() => {
    console.log("listNoti ", listNoti);
  }, [listNoti]);

  return (
    <Fragment>
      <div className="notify">
        {login === 0 ? (
          listNoti.length > 0 ? (
            listNoti.map((order) => (
              <div
                className="row justify-content-around card_noti"
                key={order.id}
              >
                <div className="col-2 p-0 text-center">
                  <img
                    src={
                      order.status === 0
                        ? "/wait.png"
                        : order.status === 1
                        ? "/delivery.png"
                        : order.status === 2
                        ? "/complete.png"
                        : order.status === 3
                        ? "/cancel.png"
                        : ""
                    }
                    alt=""
                    className="img_noti"
                  />
                </div>
                <div className="col-10 ps-3 pe-0">
                  <div className="title">
                    <p className="text-uppercase mb-2">
                      Đơn hàng #{order.id} của bạn
                    </p>
                  </div>
                  <div className="des">
                    <p className="mb-0">
                      {`${userName.fullname} ơi. Đơn hàng #${
                        order.id
                      } của bạn ${
                        order.status === 0
                          ? "đang chờ xác nhận từ cửa hàng. Hãy giữ theo dõi trạng thái của đơn hàng."
                          : order.status === 1
                          ? "đang trên đường giao đến. Vui lòng chọn đã nhận hàng khi nhận được hàng."
                          : order.status === 2
                          ? "đã được giao thành công. Bạn có thể đánh giá về sản phẩm."
                          : order.status === 3
                          ? "đã được hủy."
                          : ""
                      }`}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center" style={{marginTop: '50%'}}>
            <NotificationImportantIcon style={{fontSize: '25px'}}/>
            <h6>Không có thông báo</h6>
            </div>
          )
        ) : (
          <div className="text-center pt-5">
            <img src="/alert.png" alt="" className="alert_icon" />
            <p className="">Đăng nhập để nhận thông báo!</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Notify;

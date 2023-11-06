import React, { useEffect, useState, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../home/toast";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AdRoute = (props) => {
  const role = useSelector((state) => state.login.role);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const isActive = JSON.parse(localStorage.getItem("isactive"));
    if (isActive) {
      if (role === 2 || role === 0) {
        toast.warning(
          <Toast
            message={
              role === 2
                ? "Đăng nhập để tiếp tục"
                : "Bạn không có quyền truy cập trang này"
            }
          />,
          {
            className: "warning",
          }
        );
        // setShouldRedirect(true);
      }

      // else {
      //   setShouldRedirect(false);
      // }
    } else {
      toast.warning(<Toast message="Đăng nhập để tiếp tục" />, {
        className: "warning",
      });
      // setShouldRedirect(true);
    }
  }, []);

  const isActive = JSON.parse(localStorage.getItem("isactive"));
  // if (shouldRedirect) {
  //   if (props.onRedirect) {
  //     props.onRedirect(); // Gọi hàm callback để chuyển hướng
  //   }
  //   return <Redirect to={`/login/${1}`} />;
  // }

  return (
    <React.Fragment>
      {isActive && role === 1 ? (
        <Route component={props.component}></Route>
      ) : isActive && role === 0 ? (
        <React.Fragment>
          <Redirect to="/" />;
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Redirect to={`/login/${1}`} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
// const AdRoute = (props) => {
//   const role = useSelector((state) => state.login.role);
//   const [shouldRedirect, setShouldRedirect] = useState(false);
//   const history = useHistory();

//   // Kiểm tra xem người dùng đã đăng nhập chưa
//   useEffect(() => {
//     const isActive = JSON.parse(localStorage.getItem("isactive"));
//     if (!isActive) {
//       toast.warning(<Toast message="Đăng nhập để tiếp tục" />, {
//         className: "warning",
//       });
//       setShouldRedirect(true);
//       return;
//     }

//     // Kiểm tra xem người dùng có quyền truy cập trang này không
//     if (role === 2 || role === 0) {
//       toast.warning(<Toast message="Bạn không có quyền truy cập trang này" />, {
//         className: "warning",
//       });
//       setShouldRedirect(true);
//       return;
//     }

//     // Nếu người dùng đã đăng nhập và có quyền truy cập trang này, thì đặt shouldRedirect thành false
//     setShouldRedirect(false);
//   }, [role]);

//   // Chuyển hướng người dùng nếu shouldRedirect là true
//   if (shouldRedirect) {
//     return <Redirect to={`/login/${1}`} />;
//   }

//   // Render component được truyền vào
//   return <Route component={props.component}></Route>;
// };

// const AdRoute = ({ component: Component, ...rest }) => {
//   const { role } = useSelector((state) => state.login);
//   const [showLoginWarning, setShowLoginWarning] = useState(false);
//   const [showAccessWarning, setShowAccessWarning] = useState(false);

//   useEffect(() => {
//     if (role === 0) {
//       setShowAccessWarning(true);
//     } else if (role === 2) {
//       setShowLoginWarning(true);
//     }
//   }, [role]);

//   return (
//     <Fragment>
//       <Route
//         {...rest}
//         render={(props) => {
//           if (showAccessWarning) {
//             toast.warning(<Toast message="Bạn không có quyền truy cập trang này" />, {
//               className: "warning",
//             });
//             return <Redirect to="/" />;
//           }
//           if (showLoginWarning) {
//             toast.warning(<Toast message="Đăng nhập để tiếp tục" />, {
//               className: "warning",
//             });
//             return <Redirect to={`/login/${1}`} />;
//           }
//           return <Component {...props} />;
//         }}
//       />
//     </Fragment>
//   );
// };

export default AdRoute;

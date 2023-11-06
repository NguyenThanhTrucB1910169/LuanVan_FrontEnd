import React, { Fragment, useEffect, useRef, useState } from "react";
import "./reviewsManage.css";
import SideBar from "./sideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReviews,
  countTotalReviews,
  delReview,
} from "../../store/actions/adminAction";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import { Rating } from "@material-ui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  makeStyles,
} from "@material-ui/core";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ErrorIcon from "@mui/icons-material/Error";

const ReviewsManage = () => {
  // const useStyles = makeStyles((theme) => ({
  //   customRating: {
  //     "& .MuiRating-iconFilled": {
  //       color: "#ffd43b",
  //     },
  //   },
  // }));
  // const classes = useStyles();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.admin.reviews);
  const resultDelete = useSelector((state) => state.admin.delAction);
  // const resultUpdByUser = useSelector((state) => state.reviews.updByUser);
  const pageNumber = useSelector((state) => state.admin.count);
  // const [resultDelete, setResultDelete] = useState(null);

  // const [opEdits, setOpenEdits] = useState({});
  const [openDialogs, setOpenDialogs] = useState({});
  const [clickDel, setClickDel] = useState(false);
  const [page, setPage] = useState(1);
  // const [rating, setRating] = useState(0);
  // const [updClick, setUpdClick] = useState(false);
  // const [comment, setComment] = useState("");
  const totalPagesRef = useRef(null);
  // useEffect(() => {
  //     dispatch(getAllReviews())
  // },[])

  useEffect(() => {
    console.log("pageNumber ", pageNumber);
  }, []);

  useEffect(() => {
    dispatch(countTotalReviews()).then(() => {
      dispatch(getAllReviews(page));
    });
  }, [page]);

  useEffect(() => {
    if (pageNumber !== null) {
      if (pageNumber.totalPages !== totalPagesRef.current) {
        totalPagesRef.current = pageNumber || 0;

        if (page > pageNumber.totalPages) {
          setPage(pageNumber.totalPages || 0);
        }
      }
    }
  }, [page, pageNumber]);
  // const handleRatingChange = (event, newValue) => {
  //   setRating(newValue);
  // };

  const handleDelReview = async (id) => {
    const newOpenDialogs = { ...openDialogs };
    newOpenDialogs[id] = true;

    setOpenDialogs(newOpenDialogs);
    if (openDialogs[id]) {
      await dispatch(delReview(id));
    }
    setClickDel(true);
  };
  const handleDialogClose = (id) => {
    const newOpenDialogs = { ...openDialogs };
    newOpenDialogs[id] = false;

    setOpenDialogs(newOpenDialogs);
  };

  useEffect(() => {
    if (clickDel) {
      console.log("resultDelete ", resultDelete);
      if (resultDelete) {
        toast.success(<Toast message="Xóa đánh giá thành công" />, {
          onClose: async () => {
            await dispatch(countTotalReviews());
            await dispatch(getAllReviews(page));
          },
          className: "success",
        });
      } else {
        toast.error(<Toast message="Xóa đánh giá thất bại" />, {
          className: "fail",
        });
      }
      const updatedDialogs = {};
      for (const key in openDialogs) {
        if (openDialogs[key]) {
          updatedDialogs[key] = false;
        }
      }
      setOpenDialogs(updatedDialogs);
      setClickDel(false);
    }
  }, [clickDel]);

  // useEffect(() => {
  //   if (updClick) {
  //     if (resultUpdByUser) {
  //       toast.success(<Toast message="Cập nhật thành công" />, {
  //         onClose: () => {
  //           dispatch(countTotalReviews()).then(() => {
  //             dispatch(getAllReviews(page));
  //           });
  //         },
  //         className: "success",
  //       });
  //     } else {
  //       toast.error(<Toast message="Cập nhật thất bại" />, {
  //         className: "fail",
  //       });
  //     }
  //     const updatedDialogs = {};
  //     for (const key in opEdits) {
  //       if (opEdits[key]) {
  //         updatedDialogs[key] = false;
  //       }
  //     }
  //     setOpenEdits(updatedDialogs);
  //     setUpdClick(false);
  //   }
  // }, [updClick]);

  // const submitReviewToggle = (revi, open) => {
  //   setRating(revi.rating || 0);
  //   setComment(revi.reviewText || "");
  //   setOpenEdits({
  //     ...opEdits,
  //     [revi.id]: open,
  //   });
  // };

  // const reviewEditHandler = (id) => {
  //   const newOpenDialogs = { ...opEdits };
  //   newOpenDialogs[id] = true;
  //   setOpenEdits(newOpenDialogs);
  //   if (opEdits[id]) {
  //     dispatch(updateReviewByUser(id, { rating: rating, text: comment }));
  //   }
  //   setUpdClick(true);
  // };

  return (
    <Fragment>
      <div className="row justify-content-between">
        <SideBar />
        <div className="col-sm-7 col-lg-9 ad_reviews">
          <div className="reviews_title">Đánh Giá Về sản Phẩm</div>
          <div className="contain_reviews">
            <div style={{ minHeight: "29rem" }}>
              {reviews && reviews.length > 0 ? (
                reviews.map((review, index) => {
                  return !review.Product ? (
                    <div className="review_card_empty">
                      <div className="product-not-found-message">
                        <span
                          style={{ color: "#ff0000ba", marginRight: "5px" }}
                        >
                          <ErrorIcon
                            style={{
                              fontSize: "20px",
                              marginBottom: "4px",
                            }}
                          />
                        </span>
                        Sản phẩm của đánh giá này đã bị xóa.
                      </div>
                      <div>
                        {review.User ? (
                          <div>
                            <div
                              className="text-capitalize fw-semibold"
                              style={{
                                marginTop: "5px",
                                marginBottom: "7px",
                              }}
                            >
                              Đánh giá từ
                            </div>
                            <div className="row" style={{ height: "55px" }}>
                              <div className="img_div">
                                <img
                                  src={`http://localhost:3005/uploads/${review.User.avatar}`}
                                  alt="avatar"
                                  className="avatar_user"
                                />
                              </div>
                              <div className="col-7">
                                <h5
                                  style={{
                                    marginTop: "16px",
                                    fontStyle: "italic",
                                  }}
                                >
                                  {review.User.fullname}
                                </h5>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="review mt-3">
                        <Rating value={review.rating} readOnly />
                        <div style={{ fontSize: "14px" }}>
                          Đánh giá của sản phẩm này: "
                          <span
                            style={{ fontSize: "18px", fontStyle: "italic" }}
                          >
                            {review.reviewText}
                          </span>
                          "
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="review_card row justify-content-between"
                      key={index}
                    >
                      <div className="col-sm-3 col-md-3 col-lg-3 col-xl-2 col-xxl-2">
                        <img
                          src={`http://localhost:3005/uploads/${
                            review.Product.image.split(",")[0]
                          }`}
                          alt=""
                        />
                      </div>
                      <div className="col-sm-9 col-md-6 col-lg-5 col-xl-6 col-xxl-6 mt-3">
                        <div>
                          <span style={{ fontSize: "14px" }}>
                            #{review.Product.id}
                          </span>
                          <span className="fst-italic fw-semibold">
                            {review.Product.name}
                          </span>
                        </div>
                        <Rating
                          name="user-rating"
                          value={review.rating}
                          precision={0.5}
                          readOnly
                        />
                        <div>
                          Đánh giá của bạn: "
                          <span
                            className="fst-italic"
                            style={{ fontSize: "14px" }}
                          >
                            {review.reviewText}
                          </span>
                          "
                        </div>
                        <div className="user_contain mt-3">
                          {review.User ? (
                            <div>
                              <div
                                className="text-capitalize fw-semibold"
                                style={{
                                  marginTop: "30px",
                                  marginBottom: "8px",
                                }}
                              >
                                Đánh giá từ
                              </div>
                              <div className="row" style={{ height: "55px" }}>
                                <div className="img_div">
                                  <img
                                    src={`http://localhost:3005/uploads/${review.User.avatar}`}
                                    alt=""
                                    className="avatar_user"
                                  />
                                </div>
                                <div className="col-7">
                                  <h5
                                    style={{
                                      marginTop: "16px",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    {review.User.fullname}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-3 col-lg-4 col-xl-3 col-xxl-3 p-0 d-flex flex-column justify-content-end">
                        <div className="row m-0 p-0 mb-2 justify-content-end pb-lg-0">
                          <div
                            className="col-sm-12 col-lg-7 m-sm-0 p-sm-auto"
                            style={{ height: "3rem" }}
                          >
                            <button
                              className="btn_del_review"
                              onClick={() =>
                                setOpenDialogs({
                                  ...openDialogs,
                                  [review.id]: true,
                                })
                              }
                            >
                              <span>Gỡ</span>
                              <DeleteForeverIcon />
                            </button>
                            <Dialog
                              open={openDialogs[review.id] || false}
                              onClose={() => handleDialogClose(review.id)}
                              BackdropProps={{
                                style: {
                                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                                  opacity: "0.5",
                                },
                              }}
                            >
                              <DialogTitle>Xác nhận</DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Bạn có muốn gỡ đánh giá này?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={() =>
                                    setOpenDialogs({
                                      ...openDialogs,
                                      [review.id]: false,
                                    })
                                  }
                                  color="primary"
                                >
                                  No
                                </Button>
                                <Button
                                  onClick={() => handleDelReview(review.id)}
                                  color="primary"
                                >
                                  Yes
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                          {/* <div className="col-sm-12 col-lg-6">
                        <button
                          className="btn_edit_review"
                          onClick={() => submitReviewToggle(review, true)}
                        >
                          <span>Tùy chỉnh review</span>
                          <EditIcon />
                        </button>
                        <div
                          style={{
                            background: "rgb(0 0 0 / 27%)",
                            opacity: "0.1",
                          }}
                        ></div>
                      </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no_review">Không có bình luận nào</div>
              )}
            </div>
            <div className="text-center mb-3">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="change_page"
              >
                <KeyboardArrowLeftIcon style={{ fontSize: "28px" }} />
              </button>
              {pageNumber !== null
                ? Array.from({ length: pageNumber.totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setPage(index + 1)}
                      className={`page_btn ${
                        page === index + 1 ? "active" : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))
                : null}

              <button
                onClick={() => setPage(page + 1)}
                className="change_page"
                disabled={page === pageNumber?.totalPages}
              >
                <KeyboardArrowRightIcon style={{ fontSize: "28px" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <SideBar />
  <div className="main_side">
    <div>Bình luận</div>
    <div>
    {reviews && reviews.length > 0 ? 
    reviews.map(() => (
      <div className="card_reviews">
        <div className="card-header"></div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    ))
      
    :(
      <div>
        KHông có đánh giá nào
      </div>
    )}
    </div>
    <div className="text-center mb-3">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="change_page"
      >
        <KeyboardArrowLeftIcon style={{ fontSize: "28px" }} />
      </button>
      {pageNumber !== null
        ? Array.from({ length: pageNumber.totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              className={`page_btn ${page === index + 1 ? "active" : ""}`}
            >
              {index + 1}
            </button>
          ))
        : null}

      <button
        onClick={() => setPage(page + 1)}
        className="change_page"
        disabled={page === pageNumber?.totalPages}
      >
        <KeyboardArrowRightIcon style={{ fontSize: "28px" }} />
      </button>
    </div>
  </div> */}
    </Fragment>
  );
};

export default ReviewsManage;

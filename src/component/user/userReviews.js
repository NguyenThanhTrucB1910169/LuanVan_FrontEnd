import React, { Fragment, useEffect, useRef, useState } from "react";
import Header from "../home/header";
import { useDispatch, useSelector } from "react-redux";
import {
  getReviewsByUser,
  delReviewByUser,
  getTotalPage,
  updateReviewByUser,
} from "../../store/actions/reviewAction";
import { Rating } from "@material-ui/lab";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  makeStyles,
} from "@material-ui/core";
import "./userReviews.css";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
const UserReviews = () => {
  const useStyles = makeStyles((theme) => ({
    customRating: {
      "& .MuiRating-iconFilled": {
        color: "#ffd43b",
      },
    },
  }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const getReviews = useSelector((state) => state.reviews.getReviewsByUser);
  const resultDelByUser = useSelector((state) => state.reviews.delByUser);
  const resultUpdByUser = useSelector((state) => state.reviews.updByUser);
  const pageNumber = useSelector((state) => state.reviews.totalPage);
  const [opEdits, setOpenEdits] = useState({});
  const [openDialogs, setOpenDialogs] = useState({});
  const [clickDel, setClickDel] = useState(false);
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [updClick, setUpdClick] = useState(false);
  const [comment, setComment] = useState("");
  const totalPagesRef = useRef(null);

  useEffect(() => {
    dispatch(getTotalPage()).then(() => {
      dispatch(getReviewsByUser(page));
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
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleDelReview = (id) => {
    const newOpenDialogs = { ...openDialogs };
    newOpenDialogs[id] = true;

    setOpenDialogs(newOpenDialogs);
    if (openDialogs[id]) {
      dispatch(delReviewByUser(id));
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
      if (resultDelByUser) {
        toast.success(<Toast message="Xóa đánh giá thành công" />, {
          onClose: async () => {
            dispatch(getTotalPage()).then(() => {
              dispatch(getReviewsByUser(page));
            });
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

  useEffect(() => {
    if (updClick) {
      if (resultUpdByUser) {
        toast.success(<Toast message="Cập nhật thành công" />, {
          onClose: () => {
            dispatch(getTotalPage()).then(() => {
              dispatch(getReviewsByUser(page));
            });
          },
          className: "success",
        });
      } else {
        toast.error(<Toast message="Cập nhật thất bại" />, {
          className: "fail",
        });
      }
      const updatedDialogs = {};
      for (const key in opEdits) {
        if (opEdits[key]) {
          updatedDialogs[key] = false;
        }
      }
      setOpenEdits(updatedDialogs);
      setUpdClick(false);
    }
  }, [updClick]);

  const submitReviewToggle = (revi, open) => {
    setRating(revi.rating || 0);
    setComment(revi.reviewText || "");
    setOpenEdits({
      ...opEdits,
      [revi.id]: open,
    });
  };

  const reviewEditHandler = (id) => {
    const newOpenDialogs = { ...opEdits };
    newOpenDialogs[id] = true;
    setOpenEdits(newOpenDialogs);
    if (opEdits[id]) {
      dispatch(updateReviewByUser(id, { rating: rating, text: comment }));
    }
    setUpdClick(true);
  };

  return (
    <Fragment>
      <Header />
      <div className="contain_reviews">
        <div style={{ minHeight: "29rem" }}>
          {getReviews && getReviews.length > 0 ? (
            getReviews.map((review, index) => {
              return !review.Product ? (
                <div className="review_card_empty">
                  <div className="product-not-found-message">
                    Sản phẩm bạn đã đánh giá không còn tồn tại. Đánh giá của bạn
                    vẫn được lưu trữ.
                  </div>
                  <div className="review">
                    <Rating value={review.rating} readOnly />
                    <div style={{ fontSize: "14px" }}>
                      Đánh giá của bạn cho sản phẩm này: "
                      <span style={{ fontSize: "18px", fontStyle: "italic" }}>
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
                      {review.Product.id}:{" "}
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
                      <span className="fst-italic" style={{ fontSize: "14px" }}>
                        {review.reviewText}
                      </span>
                      "
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 col-lg-4 col-xl-3 col-xxl-3 p-0 d-flex flex-column justify-content-end">
                    <div className="row m-0 p-0 mb-2 justify-content-end pb-lg-0">
                      <div className="col-sm-12 col-lg-5 m-lg-auto m-sm-0 p-sm-auto" style={{height: '3rem'}}>
                        <button
                          className="btn_del_review"
                          onClick={() =>
                            setOpenDialogs({
                              ...openDialogs,
                              [review.id]: true,
                            })
                          }
                        >
                          <span>Xóa review</span>
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
                              Bạn có muốn xóa review này?
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
                      <div className="col-sm-12 col-lg-6">
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
                        >
                          <Dialog
                            aria-labelledby="simple-dialog-title"
                            open={opEdits[review.id] || false}
                            onClose={() => submitReviewToggle(review, false)}
                            BackdropProps={{
                              style: {
                                backgroundColor: "rgba(0, 0, 0, 0.27)",
                                opacity: "0.5",
                              }, // Điều chỉnh màu nền ở đây
                            }}
                          >
                            <div className="title_review">
                              <DialogTitle>
                                <div
                                  className="d-inline-block me-2"
                                  style={{ width: "10%" }}
                                >
                                  {/* <ReviewsIcon></ReviewsIcon> */}
                                  <img src="/review.png" alt="" />
                                </div>
                                Đánh giá của bạn
                              </DialogTitle>
                            </div>
                            <DialogContent className="submitDialog">
                              <div className="rating_frame">
                                <Rating
                                  name="custom-rating"
                                  className={classes.customRating}
                                  onChange={handleRatingChange}
                                  value={rating}
                                  size="large"
                                  icon={
                                    <i
                                      className="fa-regular fa-star"
                                      style={{
                                        fontSize: "25px",
                                        marginLeft: "7px",
                                      }}
                                    ></i>
                                  }
                                />
                              </div>
                              <div className="text_frame">
                                <p className="add_review_text">
                                  Chỉnh sửa đánh giá
                                </p>
                                <textarea
                                  className="submitDialogTextArea"
                                  cols="30"
                                  rows="5"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                              </div>
                            </DialogContent>
                            <DialogActions className="justify-content-between mt-4">
                              <div className="btn_review_cancel">
                                <Button
                                  onClick={() =>
                                    submitReviewToggle(review, false)
                                  }
                                >
                                  Thoát
                                </Button>
                              </div>
                              <div className="btn_review_submit me-2">
                                <Button
                                  onClick={() => reviewEditHandler(review.id)}
                                >
                                  Hoàn Tất
                                </Button>
                              </div>
                            </DialogActions>
                          </Dialog>
                        </div>
                      </div>
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
      </div>
    </Fragment>
  );
};

export default UserReviews;

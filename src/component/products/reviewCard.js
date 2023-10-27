import { Rating } from "@material-ui/lab";
import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { getReviewsByProduct } from "../../store/actions/reviewAction";
import { addNewReview } from "../../store/actions/reviewAction";
import { getUserById } from "../../store/actions/usersAction";
import RatingChart from "../layouts/ratingChart";
import "./reviewCard.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import { useEffect } from "react";
const ReviewCard = ({ productId }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [postReview, setPostReview] = useState(false);
  const user = useSelector((state) => state.login.user);
  const reviews = useSelector((state) => state.reviews.reviewsByProduct);
  const create = useSelector((state) => state.reviews.create);
  const post = useSelector((state) => state.reviews.create);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const itemsPerPage = 4;
  const useStyles = makeStyles((theme) => ({
    customRating: {
      "& .MuiRating-iconFilled": {
        color: "#ffd43b",
      },
    },
  }));
  const classes = useStyles();

  const reviewSubmitHandler = () => {
    const data_review = {
      rating: rating,
      reviewText: comment,
      productId: productId,
    };
    dispatch(addNewReview(data_review));
    setOpen(false);
    setPostReview(true);
    setRating(0);
    setComment("");
  };

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  // const currentReviews = reviews.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  const updateDisplayedReviews = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    console.log(reviews);
    setDisplayedReviews(reviews.slice(startIndex, endIndex));
  };

  // Hàm xử lý sự kiện chuyển trang
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const submitReviewToggle = () => {
    if (user && user.role === 0) {
      open ? setOpen(false) : setOpen(true);
    } else {
      toast.warning(<Toast message="Đăng nhập để tiếp tục đánh giá" />, {
        className: "warning",
      });
    }
  };

  useEffect(() => {
    // dispatch(getReviewsByProduct(productId));
    if (postReview) {
      if (post) {
        toast.success(<Toast message="Hoàn thành đánh giá" />, {
          className: "success",
        });
      } else {
        toast.error(<Toast message="Đánh giá thất bại" />, {
          className: "fail",
        });
      }
      dispatch(getReviewsByProduct(productId));
      setPostReview(false);
    }
  }, [post, postReview, dispatch, create, reviews]);

  useEffect(() => {
    dispatch(getReviewsByProduct(productId));
  }, [postReview]);
  useEffect(() => {
    updateDisplayedReviews();
  }, [currentPage, reviews, postReview]);

  return (
    <Fragment>
      <div className="review_contain">
        <div className="reviews_heading">
          <h3 className="">Đánh giá sản phẩm</h3>
        </div>
        <div className="row m-0">
          <div className="list_reviews col-7">
            <div className="min_h_reviews">
              {displayedReviews.length > 0 ? (
                displayedReviews.map((review, index) => (
                  <div class="review_customer_section">
                    <div class="image_review">
                      <div class="customer_image">
                        <img
                          src={
                            review.user.avatar
                              ? review.user.avatar
                              : "/avatar_default.png"
                          }
                          alt="customer image"
                        />
                      </div>

                      <div class="customer_name_review_status">
                        <div class="customer_name">{review.user.fullname}</div>
                        <div class="customer_review">
                          <Rating
                            name="user-rating"
                            value={review.reviewData.rating}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div class="customer_comment">
                      {review.reviewData.reviewText}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mt-5">
                  <img src="/no_chat.png" alt="" style={{ width: "15%" }} />
                  <p className="no_comment">Không có bình luận!</p>
                </div>
              )}
            </div>
            <div className="pagination ms-5 justify-content-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <div key={page} className="page">
                    <button
                      className={`${currentPage === page ? "active" : ""}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="review_content col-5">
            <div className="statis">
              <RatingChart />
            </div>
            <div className="text-center mt-5">
              <p className="fst-italic m-0">Bạn có đánh giá về sản phẩm?</p>
              <img
                src="/to_right.png"
                alt=""
                style={{ width: "4%", marginLeft: "10px" }}
              />
              <button onClick={submitReviewToggle} className="submitReview">
                Thêm đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <div className="title_review">
            <DialogTitle>
              <div className="d-inline-block me-2" style={{ width: "10%" }}>
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
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
                icon={
                  <i
                    className="fa-regular fa-star"
                    style={{ fontSize: "25px", marginLeft: "7px" }}
                  ></i>
                }
              />
            </div>
            <div className="text_frame">
              <p className="add_review_text">Thêm nhận xét</p>
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
              <Button onClick={submitReviewToggle}>Hủy</Button>
            </div>
            <div className="btn_review_submit me-2">
              <Button onClick={reviewSubmitHandler}>Đăng</Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  );
};

export default ReviewCard;

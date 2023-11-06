import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Rating } from "@material-ui/lab";
import "./ratingChart.css";
import StarIcon from "@mui/icons-material/Star";

function RatingChart() {
  const data = useSelector((state) => state.reviews.reviewsByProduct);

  const listStar = [1, 2, 3, 4, 5];
  const [reviewsByRating, setReviewsByRating] = useState({});
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const list = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  useEffect(async () => {
    if (data.length > 0) {
      // const updatedReviewsByRating = { ...reviewsByRating }; // Tạo một bản sao của đối tượng
      await data.forEach((review) => {
        console.log('review at char ', review)
        list[review.rating]++;
      });
      setReviewsByRating(list);
    } else {
      setReviewsByRating({});
      setTotal(0);
      setAverage(0);
    }
  }, [data, total]);
  useEffect(() => {
    console.log(list);
    const totalValues = Object.values(reviewsByRating).reduce(
      (acc, value) => acc + value,
      0
    );
    setTotal(totalValues);
    console.log(total);
    if (total > 0) {
      var rating = 0;
      listStar.map((star) => {
        console.log(star);
        rating += reviewsByRating[star] * star;
        console.log(
          "reviewsByRating[star] * star ",
          reviewsByRating[star] * star
        );
        console.log("reviewsByRating[star] ", reviewsByRating[star]);
      });
      console.log("rating ", rating);
      console.log("total ", total);
      setAverage(rating / total);
    }
  }, [reviewsByRating, total, average]);

  return (
    <div>
      <div className={`div_average ${total > 0 ? "d-block" : "d-none"}`}>
        <span className="average_num">{average.toFixed(1)}/5</span>
        <div className="ms-3 d-inline-block">
          <Rating
            name="average-rating"
            value={average}
            precision={0.5}
            readOnly
            icon={<StarIcon style={{ fontSize: "1.8rem" }} />}
          />
        </div>
      </div>
      <div className="rating_contain">
        {total > 0 ? (
          listStar.map((rating) => (
            <div key={rating}>
              <span className="me-4">
                {rating} <StarIcon style={{ color: "#ff5501" }} />
              </span>
              <LinearProgress
                variant="determinate"
                value={(reviewsByRating[rating] / total) * 100}
                className="process"
              />
              <span className="ms-4">
                {((reviewsByRating[rating] / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
}

export default RatingChart;

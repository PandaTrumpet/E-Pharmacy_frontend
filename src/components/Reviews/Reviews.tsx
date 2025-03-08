import css from "./Reviews.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getReviews } from "../../redux/reviews/opertaion";
import { reviewsSelector } from "../../redux/reviews/selector";
import { fotosReviewers } from "../../reviewsFoto";

interface IReviews {
  _id: string;
  name: string;
  testimonial: string;
}
const Reviews = () => {
  const reviews: IReviews[] | null = useSelector(reviewsSelector);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);
  return (
    <section className={css.sectionCont}>
      <div className={css.mainReviews}>
        <h2 className={css.reviewsTitle}>Reviews</h2>
        <p className={css.sectionText}>
          Search for Medicine, Filter by your location
        </p>
        <ul className={css.reviewsList}>
          {reviews &&
            reviews.length > 0 &&
            reviews.map((review, index) => {
              return (
                <li className={css.reviewItem} key={review._id}>
                  <div className={css.reviewCont}>
                    <h3>{review.name}</h3>
                    <p>{review.testimonial}</p>
                    <img src={fotosReviewers[index]} alt="Reviewer" />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default Reviews;

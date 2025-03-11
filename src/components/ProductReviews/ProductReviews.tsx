import css from "./ProductReviews.module.css";
import firstUser from "../../images/firstUser.png";
import secondUser from "../../images/secondUser.png";
import thirdUser from "../../images/thirdUser.png";
import star from "../../images/star.svg";
import emptyStar from "../../images/emptyStar.svg";
const ProductReviews = () => {
  return (
    <section>
      <ul className={css.reviewslist}>
        <li className={css.reviewsItem}>
          <div className={css.userCont}>
            <div className={css.userFotoCont}>
              <img src={firstUser} alt="" className={css.userFoto} />
              <div className={css.infoUser}>
                <h3 className={css.name}>Leroy Jenkins</h3>
                <p>2 days ago</p>
              </div>
            </div>
            <div className={css.ratingCont}>
              <ul className={css.starsList}>
                <li className={css.active}>
                  <img src={star} alt="" />
                </li>
                <li className={css.notActive}>
                  <img src={star} alt="" />
                </li>
                <li className={css.notActive}>
                  <img src={star} alt="" />
                </li>
                <li className={css.notActive}>
                  <img src={star} alt="" />
                </li>
                <li className={css.notActive}>
                  <img src={emptyStar} alt="" />
                </li>
              </ul>
              <p>4</p>
            </div>
          </div>
          <p className={css.reviewText}>
            I've been using Moringa powder in my smoothies for a few weeks now.
            My energy levels are up, and I feel great. I followed the
            recommended dosage, and it seems to be a perfect addition to my
            daily routine. Highly recommend!
          </p>
        </li>
        <li className={css.reviewsItem}>
          <div className={css.userCont}>
            <div className={css.userFotoCont}>
              <img src={secondUser} alt="" className={css.userFoto} />
              <div className={css.infoUser}>
                <h3 className={css.name}>Leroy Jenkins</h3>
                <p>2 days ago</p>
              </div>
            </div>
            <div className={css.ratingCont}>
              <ul className={css.starsList}>
                <li className={css.active}>
                  <img src={star} alt="" />
                </li>
                <li className={css.notActive}>
                  <img src={star} alt="" />
                </li>
                <li className={css.notActive}>
                  <img src={star} alt="" />
                </li>
                <li className={css.notActive}>
                  <img src={star} alt="" />
                </li>
                <li className={css.notActive}>
                  <img src={emptyStar} alt="" />
                </li>
              </ul>
              <p>4</p>
            </div>
          </div>
          <p className={css.reviewText}>
            I've been using Moringa powder in my smoothies for a few weeks now.
            My energy levels are up, and I feel great. I followed the
            recommended dosage, and it seems to be a perfect addition to my
            daily routine. Highly recommend!
          </p>
        </li>
        <li className={css.reviewsItem}>
          <div className={css.userCont}>
            <div className={css.userFotoCont}>
              <img src={thirdUser} alt="" className={css.userFoto} />
              <div className={css.infoUser}>
                <h3 className={css.name}>Leroy Jenkins</h3>
                <p>2 days ago</p>
              </div>
            </div>
            <div className={css.ratingCont}>
              <ul className={css.starsList}>
                <li className={css.active}>
                  <img src={star} alt="" />
                </li>
                <li className={css.notActive}>
                  <img src={star} alt="" />
                </li>
                <li className={css.notActive}>
                  <img src={star} alt="" />
                </li>
                <li className={css.notActive}>
                  <img src={star} alt="" />
                </li>
                <li className={css.notActive}>
                  <img src={emptyStar} alt="" />
                </li>
              </ul>
              <p>4</p>
            </div>
          </div>
          <p className={css.reviewText}>
            I've been using Moringa powder in my smoothies for a few weeks now.
            My energy levels are up, and I feel great. I followed the
            recommended dosage, and it seems to be a perfect addition to my
            daily routine. Highly recommend!
          </p>
        </li>
      </ul>
    </section>
  );
};

export default ProductReviews;

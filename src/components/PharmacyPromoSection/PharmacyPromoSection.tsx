import css from "./PharmacyPromoSection.module.css";
import foto from "../../images/promoSectionImage.png";
import foto768 from "../../images/promoSectionImage_768.png";
import foto1440 from "../../images/promoSectionImage_1440.png";
import featureIcon from "../../images/featureIcon.svg";
import { useNavigate } from "react-router-dom";
const PharmacyPromoSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className={css.mainSection}>
        <div className={css.mainPromoSectionCont}>
          <div className={css.infoCont}>
            <h2>Add the medicines you need online now</h2>
            <p>
              Enjoy the convenience of having your prescriptions filled from
              home by connecting with your community pharmacy through our online
              platform.
            </p>
            <button
              className={css.mainPromoSectionBtn}
              onClick={() => navigate("/medicine-store")}
            >
              Buy medicine
            </button>
          </div>
          <div className={css.fotoCont}>
            <picture>
              <source media="(min-width: 768px)" srcSet={foto768} />
              <source media="(min-width: 1440px)" srcSet={foto1440} />
              <img src={foto} alt="Foto" className={css.foto} />
            </picture>
          </div>
        </div>
      </section>
      <section className={css.featureSection}>
        <ul className={css.featureList}>
          <li className={css.featureItem}>
            <img src={featureIcon} alt="" />
            <p>Take user orders form online</p>
          </li>
          <li className={css.featureItem}>
            <img src={featureIcon} alt="" />
            <p>Create your shop profile</p>
          </li>
          <li className={css.featureItem}>
            <img src={featureIcon} alt="" />
            <p>Manage your store</p>
          </li>
          <li className={css.featureItem}>
            <img src={featureIcon} alt="" />
            <p>Get more orders</p>
          </li>
          <li className={css.featureItem}>
            <img src={featureIcon} alt="" />
            <p>Storage shed</p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default PharmacyPromoSection;

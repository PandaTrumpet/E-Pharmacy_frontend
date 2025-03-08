import css from "./MedicineNearestStores.module.css";
import star from "../../images/star.svg";
import location from "../../images/location.svg";
import phone from "../../images/phone.svg";
const MedicineNearestStores = () => {
  return (
    <section className={css.mainSection}>
      <div className={css.titleCont}>
        <h2>Your Nearest Medicine Store</h2>
        <p>Search for Medicine, Filter by your location</p>
      </div>
      <ul className={css.storeList}>
        <li className={css.storeItem}>
          <div className={css.storeCont}>
            <div className={css.flexCont}>
              <p className={css.storeName}>Huge Sale</p>
              <div className={css.storeInfo}>
                <div className={css.storeRating}>
                  <img src={star} alt="Rating icon" />
                  <p className={css.ratingNumber}>2</p>
                </div>
                <p className={css.storeStatus}>Open</p>
              </div>
            </div>

            <ul className={css.infoList}>
              <li className={css.locationItem}>
                <img
                  src={location}
                  alt="Location  icon"
                  className={css.locationIcon}
                />
                <div className={css.addressCont}>
                  <p className={css.address}>Kretoria F45</p>
                  <p className={css.city}>Castlerea</p>
                </div>
              </li>
              <li className={css.phoneItem}>
                <img src={phone} alt="Phone icon" className={css.phoneIcon} />
                <p className={css.phone}>595-08-2102</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default MedicineNearestStores;

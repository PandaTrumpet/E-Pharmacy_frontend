import css from "./MedicineNearestStores.module.css";
import star from "../../images/star.svg";
import location from "../../images/location.svg";
import phone from "../../images/phone.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getNearestStores } from "../../redux/medicineNearestStore/operation";
import { nearestStorsSelector } from "../../redux/medicineNearestStore/selector";
import firstElement from "../../images/firstElementStore.svg";
import secondElement from "../../images/secondElementStore.svg";
import thirdElement from "../../images/thirdElementStore.svg";
import clsx from "clsx";
const MedicineNearestStores = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getNearestStores());
  }, [dispatch]);
  const stores = useSelector(nearestStorsSelector) || [];
  const filteredStores = stores.filter((_, index) => index <= 5);

  return (
    <section className={css.mainSection}>
      <div className={css.titleCont}>
        <h2>Your Nearest Medicine Store</h2>
        <p>Search for Medicine, Filter by your location</p>
      </div>
      <ul className={css.storeList}>
        {filteredStores &&
          filteredStores.length > 0 &&
          filteredStores.map((store) => {
            return (
              <li className={css.storeItem} key={store._id}>
                <div className={css.storeCont}>
                  <div className={css.flexCont}>
                    <p className={css.storeName}>{store.name}</p>
                    <div className={css.storeInfo}>
                      <div className={css.storeRating}>
                        <img src={star} alt="Rating icon" />
                        <p className={css.ratingNumber}>{store.rating}</p>
                      </div>
                      <p
                        className={clsx(
                          store.status === "open"
                            ? css.storeStatus
                            : css.storeStatusClose
                        )}
                      >
                        {store.status}
                      </p>
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
                        <p className={css.address}>{store.address}</p>
                        <p className={css.city}>{store.city}</p>
                      </div>
                    </li>
                    <li className={css.phoneItem}>
                      <img
                        src={phone}
                        alt="Phone icon"
                        className={css.phoneIcon}
                      />
                      <p className={css.phone}>{store.phone}</p>
                    </li>
                  </ul>
                </div>

                <img src={firstElement} alt="" className={css.firstElement} />
                <img src={secondElement} alt="" className={css.secondElement} />
                <img src={thirdElement} alt="" className={css.thirdElement} />
              </li>
            );
          })}
        {/* <li className={css.storeItem}>
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
        </li> */}
      </ul>
    </section>
  );
};

export default MedicineNearestStores;

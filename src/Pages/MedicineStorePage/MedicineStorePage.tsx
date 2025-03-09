import css from "./MedicineStorePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getStores } from "../../redux/medicineStore/operation";
import { storeSelector } from "../../redux/medicineStore/selector";
import clsx from "clsx";
import upperElement from "../../images/upperElement.png";
import middleElement from "../../images/middleElement.png";
import downElement from "../../images/downElement.png";
import star from "../../images/star.svg";
import location from "../../images/location.svg";
import phone from "../../images/phone.svg";

const MedicineStorePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);
  const stores = useSelector(storeSelector) || [];
  console.log(stores);

  return (
    <section className={css.mainSection}>
      <h2 className={css.title}>Medicine store</h2>
      <ul className={css.storeList}>
        {stores &&
          stores.length > 0 &&
          stores.map((store) => {
            return (
              <li className={css.storeItem}>
                <div className={css.storeCont}>
                  <div className={css.flexCont}>
                    <div>
                      <p className={css.storeName}>{store.name}</p>
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

                          <img
                            src={upperElement}
                            alt=""
                            className={css.firstElement}
                          />
                          <img
                            src={middleElement}
                            alt=""
                            className={css.secondElement}
                          />
                          <img
                            src={downElement}
                            alt=""
                            className={css.thirdElement}
                          />
                        </li>
                      </ul>
                      <button className={css.visitBtn}>Viisit Store</button>
                    </div>

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
                </div>
              </li>
            );
          })}
      </ul>
      {/* <li className={css.storeItem}>
        <div className={css.storeCont}>
          <div className={css.flexCont}>
            <div>
              <p className={css.storeName}>Huge Sale</p>
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

                  <img src={upperElement} alt="" className={css.firstElement} />
                  <img
                    src={middleElement}
                    alt=""
                    className={css.secondElement}
                  />
                  <img src={downElement} alt="" className={css.thirdElement} />
                </li>
              </ul>
              <button className={css.visitBtn}>Viisit Store</button>
            </div>

            <div className={css.storeInfo}>
              <div className={css.storeRating}>
                <img src={star} alt="Rating icon" />
                <p className={css.ratingNumber}>2</p>
              </div>
              <p className={css.storeStatus}>Open</p>
            </div>
          </div>
        </div>
      </li> */}
    </section>
  );
};

export default MedicineStorePage;

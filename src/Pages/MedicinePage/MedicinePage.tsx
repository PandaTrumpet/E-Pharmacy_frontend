import css from "./MedicinePage.module.css";
import searchIcon from "../../images/search.svg";
import filterIcon from "../../images/filter.svg";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../redux/products/operation";
import { productsSelector } from "../../redux/products/selector";
import { AppDispatch } from "../../redux/store";
const MedicinePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const products = useSelector(productsSelector) || [];
  console.log(products);

  return (
    <section className={css.mainSection}>
      <h2 className={css.pageTitle}>Medicine</h2>
      <div className={css.filterMainCont}>
        <div className={css.filterInputs}>
          <select name="" id="" className={css.filterSelect}>
            <option value="">sfsdf</option>
          </select>
          <div className={css.searchInputCont}>
            <input
              type="text"
              placeholder="Search medicine"
              className={css.searchInput}
            />
            <img src={searchIcon} alt="" className={css.inputSearchIcon} />
          </div>
        </div>
        <button className={css.filterBtn}>
          <img src={filterIcon} alt="" className={css.filterBtnIcon} />
          Filter
        </button>
      </div>
      <ul className={css.productsList}>
        {products &&
          products.length > 0 &&
          products.map((product) => {
            return (
              <li key={product._id} className={css.listItem}>
                <div
                  className={css.productImage}
                  style={{ backgroundImage: `url(${product.photo})` }}
                ></div>
                <div className={css.mainInfoCont}>
                  <div className={css.infoCont}>
                    <div className={css.descriptionCont}>
                      <h3>{product.name}</h3>
                      <p>{product.suppliers}</p>
                    </div>
                    <p className={css.price}>৳{product.price}</p>
                  </div>
                  <div className={css.functionalCont}>
                    <button className={css.addBtn}>Add to cart</button>
                    <Link
                      to={`/product/${product._id}`}
                      className={css.detailsLink}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default MedicinePage;

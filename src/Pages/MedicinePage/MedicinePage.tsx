import css from "./MedicinePage.module.css";
import searchIcon from "../../images/search.svg";
import filterIcon from "../../images/filter.svg";
import { Link } from "react-router-dom";
import productImage from "../../images/productImage.png";
const MedicinePage = () => {
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
      <ul></ul>

      <li>
        <div
          className={css.productImage}
          style={{ backgroundImage: `url(${productImage})` }}
        ></div>
        <div className={css.mainInfoCont}>
          <div className={css.infoCont}>
            <div className={css.descriptionCont}>
              <h3>Antimonium</h3>
              <p>Structural (Fabrication)</p>
            </div>
            <p className={css.price}>৳24</p>
          </div>
          <div className={css.functionalCont}>
            <button className={css.addBtn}>Add to cart</button>
            <Link to="/product/:productId" className={css.detailsLink}>
              Details
            </Link>
          </div>
        </div>
      </li>
    </section>
  );
};

export default MedicinePage;

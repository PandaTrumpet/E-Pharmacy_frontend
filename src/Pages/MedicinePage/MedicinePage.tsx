import css from "./MedicinePage.module.css";
import searchIcon from "../../images/search.svg";
import filterIcon from "../../images/filter.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../redux/products/operation";
import { productsSelector } from "../../redux/products/selector";
import { AppDispatch } from "../../redux/store";
import toast from "react-hot-toast";

const MedicinePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const products = useSelector(productsSelector) || [];

  useEffect(() => {
    dispatch(
      getProducts({
        name: searchTerm.trim() || undefined,
        category: category || undefined,
      })
    );
  }, [dispatch, category]); // Фильтрация по select при изменении категории

  const handleFilterClick = () => {
    dispatch(
      getProducts({
        name: searchTerm.trim() || undefined,
        category: category || undefined,
      })
    )
      .unwrap()
      .catch(() => toast.error("There are no products with this name!"));
  };

  return (
    <section className={css.mainSection}>
      <h2 className={css.pageTitle}>Medicine</h2>
      <div className={css.filterMainCont}>
        <div className={css.filterInputs}>
          {/* Фильтр по категории (onChange) */}
          <select
            className={css.filterSelect}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Medicine">Medicine</option>
            <option value="Heart">Heart</option>
            <option value="Head">Head</option>
            <option value="Hand">Hand</option>
            <option value="Leg">Leg</option>
          </select>

          {/* Поиск по названию (по кнопке) */}
          <div className={css.searchInputCont}>
            <input
              type="text"
              placeholder="Search medicine"
              className={css.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={searchIcon} alt="" className={css.inputSearchIcon} />
          </div>
        </div>

        {/* Кнопка запуска поиска по имени */}
        <button className={css.filterBtn} onClick={handleFilterClick}>
          <img src={filterIcon} alt="" className={css.filterBtnIcon} />
          Filter
        </button>
      </div>

      <ul className={css.productsList}>
        {products.length > 0 ? (
          products.map((product) => (
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
          ))
        ) : (
          <p className={css.noResults}>No products found</p>
        )}
      </ul>
    </section>
  );
};

export default MedicinePage;

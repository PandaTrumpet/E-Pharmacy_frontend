import css from "./MedicinePage.module.css";
import searchIcon from "../../images/search.svg";
import filterIcon from "../../images/filter.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../redux/products/operation";
import {
  productsSelector,
  totalProductsSelector,
} from "../../redux/products/selector";
import { AppDispatch } from "../../redux/store";
import toast from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import clsx from "clsx";
import EllipsisText from "react-ellipsis-text";
import { updateOrder } from "../../redux/orders/operation";
import fotoPill from "../../images/productPill.jpg";
import { isLoggedSelector } from "../../redux/auth/selector";
import { openModalWindow } from "../../redux/modal/slice";
import { IProduct } from "../../redux/products/slice";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
const MedicinePage = () => {
  const isLogged = useSelector(isLoggedSelector);
  const dispatch = useDispatch<AppDispatch>();
  const handleAddCart = (product: IProduct) => {
    if (!isLogged) {
      toast.error("You must be logged in to add product to cart");
      dispatch(openModalWindow({ modalType: "login" }));
      return;
    }
    dispatch(updateOrder({ ordersProduct: [product] }))
      .unwrap()
      .then(() => toast.success("Product added to cart!"));
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const limit = 12;
  const products = useSelector(productsSelector) || [];
  const totalProducts = useSelector(totalProductsSelector) || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [category, searchTerm]);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    dispatch(
      getProducts({
        name: searchTerm.trim() || undefined,
        category: category || undefined,
        page,
        limit,
      })
    )
      .unwrap()
      .catch(() => toast.error("Failed to load products!"));
  }, [dispatch, category, searchTerm, page]);

  const handleFilterClick = () => {
    setPage(1);
  };

  const handlePrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const getVisiblePages = () => {
    if (!isMobile) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    if (totalPages <= 3) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    if (page === 1) {
      return [1, 2, 3];
    } else if (page === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [page - 1, page, page + 1];
    }
  };

  return (
    <section className={css.mainSection}>
      <h2 className={css.pageTitle}>Medicine</h2>

      <div className={css.filterMainCont}>
        <div className={css.filterInputs}>
          <div className={css.selectCont}>
            <select
              className={css.filterSelect}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onClick={() => setFilterOpen((prev) => !prev)}
              onBlur={() => setFilterOpen(false)}
            >
              <option value="">All Categories</option>
              <option value="Medicine">Medicine</option>
              <option value="Heart">Heart</option>
              <option value="Head">Head</option>
              <option value="Hand">Hand</option>
              <option value="Leg">Leg</option>
            </select>
            <div className={css.upCont}>
              {filterOpen ? <FaAngleUp /> : <FaAngleDown />}
            </div>
          </div>

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
                style={{ backgroundImage: `url(${fotoPill})` }}
              ></div>
              <div className={css.mainInfoCont}>
                <div className={css.infoCont}>
                  <div className={css.descriptionCont}>
                    <h3>
                      <EllipsisText text={product.name} length={12} />
                    </h3>
                    <p>{product.suppliers}</p>
                  </div>
                  <p className={css.price}>UA {product.price}</p>
                </div>
                <div className={css.functionalCont}>
                  <button
                    className={css.addBtn}
                    onClick={() => handleAddCart(product)}
                  >
                    Add to cart
                  </button>
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

      {totalProducts > limit && (
        <ul className={css.paginationList}>
          <ul className={css.leftPaginationList}>
            <li>
              <button
                disabled={page === 1}
                className={css.paginationBtn}
                onClick={() => setPage(1)}
              >
                <FaAnglesLeft />
              </button>
            </li>
            <li>
              <button
                className={css.paginationBtn}
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                <FaChevronLeft />
              </button>
            </li>
          </ul>
          <ul className={css.middlePaginationList}>
            {getVisiblePages().map((p) => (
              <li key={p}>
                <button
                  className={clsx(css.paginationBtnNumber, {
                    [css.activePage]: page === p,
                  })}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              </li>
            ))}
          </ul>
          <ul className={css.rightPaginationList}>
            <li>
              <button
                className={css.paginationBtn}
                onClick={handleNextPage}
                disabled={page >= totalPages}
              >
                <FaChevronRight />
              </button>
            </li>
            <li>
              <button
                className={css.paginationBtn}
                disabled={page >= totalPages}
                onClick={() => setPage(totalPages)}
              >
                <FaAnglesRight />
              </button>
            </li>
          </ul>
        </ul>
      )}
    </section>
  );
};

export default MedicinePage;

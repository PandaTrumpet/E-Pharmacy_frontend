import css from "./ProductPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { Suspense, useEffect } from "react";
import { getProductById } from "../../redux/products/operation";
import { productSelectorById } from "../../redux/products/selector";
import plusIcon from "../../images/plus.svg";
import minusIcon from "../../images/minus.svg";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { isLoggedSelector } from "../../redux/auth/selector";
import toast from "react-hot-toast";
const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>(); // Явно указываем тип параметра
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const product = useSelector(productSelectorById);
  console.log(product?.photo);
  const isLogged = useSelector(isLoggedSelector);
  const handleAddToCart = () => {
    if (isLogged) {
      toast.success("Success");
    } else {
      toast.error("Not success!");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));

      if (location.pathname === `/product/${productId}`) {
        navigate("description", { replace: true });
      }
    }
  }, [dispatch, productId, navigate, location.pathname]);
  const activeClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <section className={css.mainSection}>
      <div className={css.mainTile}>
        <div className={css.productCont}>
          <div
            className={css.productImage}
            style={{ backgroundImage: `url(${product?.photo})` }}
          ></div>

          <div className={css.productDescriptionCont}>
            <div className={css.productDetailsCont}>
              <div className={css.nameCont}>
                <h3>Moringa</h3>
                <p>Brand: Roofing (Asphalt)</p>
              </div>
              <p className={css.price}>৳{product?.price}</p>
            </div>
            <div className={css.productFunctional}>
              <div className={css.countCont}>
                <button className={css.plusBtn}>
                  <img
                    src={plusIcon}
                    alt="Plus Icon"
                    className={css.plusIcon}
                  />
                </button>
                <p className={css.count}>1</p>
                <button className={css.minusBtn}>
                  <img
                    src={minusIcon}
                    alt="Minus Icon"
                    className={css.minusIcon}
                  />
                </button>
              </div>
              <button className={css.addBtn} onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className={css.descriptionAndReviewsCont}>
          <ul className={css.navList}>
            <li>
              <NavLink to="description" className={activeClass}>
                Description
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" className={activeClass}>
                Reviews
              </NavLink>
            </li>
          </ul>
          <div>
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;

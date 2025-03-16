import css from "./ProductPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { Suspense, useEffect, useState } from "react";
import { getProductById } from "../../redux/products/operation";
import { productSelectorById } from "../../redux/products/selector";
import plusIcon from "../../images/plus.svg";
import minusIcon from "../../images/minus.svg";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { isLoggedSelector } from "../../redux/auth/selector";
import { updateOrder } from "../../redux/orders/operation";
import toast from "react-hot-toast";
import { openModalWindow } from "../../redux/modal/slice";
import { addedProductsSelector } from "../../redux/orders/selector";
import { IProduct } from "../../redux/products/slice";
const ProductPage = () => {
  const addedProducts = useSelector(addedProductsSelector);
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const productById = useSelector(productSelectorById);

  const isLogged = useSelector(isLoggedSelector);

  const addCart = (product: IProduct) => {
    if (!isLogged) {
      toast.error("You must be logged in to add product to cart");
      dispatch(openModalWindow({ modalType: "login" }));
    }
    dispatch(updateOrder({ ordersProduct: [product] }));
  };
  const [quantityByProduct, setQuantityByProduct] = useState<number>(
    productById?.quantity || 1
  );

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

  const handleIncrement = () => {
    setQuantityByProduct((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantityByProduct((prev) => prev - 1);
  };

  const addProductHandle = (prodId: string) => {
    const existingProduct = addedProducts.find((el) => el._id === prodId);

    if (!existingProduct) {
      if (productById) {
        addCart({
          ...productById,
          quantity: quantityByProduct,
        });
      }
    } else {
      if (productById) {
        addCart({
          ...productById,

          quantity: existingProduct.quantity! + quantityByProduct,
        });
      }
    }
  };

  return (
    <section className={css.mainSection}>
      <div className={css.mainTile}>
        <div className={css.productCont}>
          <div
            className={css.productImage}
            style={{ backgroundImage: `url(${productById?.photo})` }}
          ></div>

          <div className={css.productDescriptionCont}>
            <div className={css.productDetailsCont}>
              <div className={css.nameCont}>
                <h3>{productById?.name}</h3>
                <p>
                  Brand: {}
                  {productById?.suppliers}
                </p>
              </div>
              <p className={css.price}>UA {productById?.price}</p>
            </div>
            <div className={css.productFunctional}>
              <div className={css.countCont}>
                <button className={css.plusBtn} onClick={handleIncrement}>
                  <img
                    src={plusIcon}
                    alt="Plus Icon"
                    className={css.plusIcon}
                  />
                </button>
                <p className={css.count}>{quantityByProduct}</p>
                <button
                  className={css.minusBtn}
                  onClick={handleDecrement}
                  disabled={quantityByProduct === 1}
                >
                  <img
                    src={minusIcon}
                    alt="Minus Icon"
                    className={css.minusIcon}
                  />
                </button>
              </div>
              <button
                className={css.addBtn}
                onClick={() => addProductHandle(productId!)}
              >
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

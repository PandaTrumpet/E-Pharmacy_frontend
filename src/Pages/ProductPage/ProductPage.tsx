import css from "./ProductPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getProductById } from "../../redux/products/operation";
import { productSelectorById } from "../../redux/products/selector";
import plusIcon from "../../images/plus.svg";
import minusIcon from "../../images/minus.svg";
const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>(); // Явно указываем тип параметра
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector(productSelectorById);
  console.log(product?.photo);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

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
              <button className={css.addBtn}>Add to cart</button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default ProductPage;

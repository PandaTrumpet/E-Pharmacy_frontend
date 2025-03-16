import { useState } from "react";
import React from "react";
import css from "./CartItem.module.css";
import plusIcon from "../../images/plus.svg";
import minusIcon from "../../images/minus.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateOrder } from "../../redux/orders/operation";
import { IProduct } from "../../redux/products/slice";
import EllipsisText from "react-ellipsis-text";
import fotoPill from "../../images/productPill.jpg";
interface CartItemProps {
  product: IProduct;
  onRemove: (_id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, onRemove }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [quantity, setQuantity] = useState<number>(product.quantity);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(
      updateOrder({
        ordersProduct: [{ ...product, quantity: newQuantity }],
      })
    );
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(
        updateOrder({
          ordersProduct: [{ ...product, quantity: newQuantity }],
        })
      );
    }
  };

  return (
    <li className={css.productItem}>
      <div
        className={css.fotoCont}
        style={{ backgroundImage: `url(${fotoPill})` }}
      ></div>
      <div className={css.detailsCont}>
        <div className={css.infoCont}>
          <div className={css.nameAndDesc}>
            <h3>
              <EllipsisText text={product.name} length={12} />
            </h3>
            <p>{product.suppliers}</p>
          </div>
          <p className={css.price}>UA {product.price}</p>
        </div>
        <div className={css.functionalCont}>
          <ul className={css.btnList}>
            <li>
              <button className={css.funcBtn} onClick={handleIncrement}>
                <img src={plusIcon} alt="Plus" />
              </button>
            </li>
            <li>
              <p className={css.counter}>{quantity}</p>
            </li>
            <li>
              <button
                className={css.funcBtn}
                disabled={quantity === 0}
                onClick={handleDecrement}
              >
                <img src={minusIcon} alt="Minus" />
              </button>
            </li>
          </ul>
          <button
            className={css.removeBtn}
            onClick={() => onRemove(product._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;

import { useState } from "react";
import React from "react";
import css from "./CartItem.module.css"; // Создайте отдельный CSS-файл или используйте общий
import plusIcon from "../../images/plus.svg";
import minusIcon from "../../images/minus.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateOrder } from "../../redux/orders/operation";

export interface IOrderProduct {
  _id: string;
  name: string;
  photo: string;
  suppliers: string;
  quantity: number;
  price: number;
  category: string;
}

interface CartItemProps {
  product: IOrderProduct;
  onRemove: (_id: string) => void;
  // Если нужно обновлять количество глобально, можно добавить колбэк onQuantityChange
}

const CartItem: React.FC<CartItemProps> = ({ product, onRemove }) => {
  const dispatch = useDispatch<AppDispatch>();
  // Инициализируем локальное состояние количеством продукта
  const [quantity, setQuantity] = useState<number>(product.quantity || 1);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(
      updateOrder({
        // Передаём массив с одним продуктом, у которого обновлён quantity
        ordersProduct: [{ ...product, quantity: newQuantity }],
        // Если в payload требуются и другие поля (например, name, email и т.д.),
        // их можно добавить или сделать опциональными в интерфейсе UpdateOrderPayload
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
        style={{ backgroundImage: `url(${product.photo})` }}
      ></div>
      <div className={css.detailsCont}>
        <div className={css.infoCont}>
          <div className={css.nameAndDesc}>
            <h3>{product.name}</h3>
            <p>{product.suppliers}</p>
          </div>
          <p className={css.price}>৳ {product.price}</p>
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

export default React.memo(CartItem);

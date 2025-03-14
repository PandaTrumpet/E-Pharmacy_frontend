import css from "./CartPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useForm } from "react-hook-form";
import { updateOrder } from "../../redux/orders/operation";
import {
  addedProductsSelector,
  totalPriceSelector,
} from "../../redux/orders/selector";
import CartItem from "../../components/CartItem/CartItem";
import { IOrderProduct } from "../../redux/orders/slice";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
}

const CartPage = () => {
  const addedProducts = useSelector(addedProductsSelector);
  const totalPrice = useSelector(totalPriceSelector);
  // console.log(addedProducts);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      paymentMethod: "cash",
    },
  });

  const onSubmit = (data: FormData) => {
    // dispatch(
    //   updateOrder({
    //     name: data.name,
    //     email: data.email,
    //     phone: data.phone,
    //     address: data.address,
    //     paymentMethod: data.paymentMethod,
    //   })
    // );
  };

  const dispatch = useDispatch<AppDispatch>();
  const handleRemove = (id: string) => {
    const updatedProducts = addedProducts.filter(
      (product: IOrderProduct) => product._id !== id
    );

    dispatch(
      updateOrder({
        ordersProduct: updatedProducts,
      })
    );
  };
  return (
    <section className={css.mainSection}>
      <h2 className={css.title}>Cart</h2>
      <div className={css.mainCont}>
        <div className={css.formCont}>
          <h3 className={css.formTitle}>Enter shipping info</h3>
          <p className={css.formText}>
            Enter your delivery address where you get the product. You can also
            send any other location where you send the products.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={css.styleContFirst}>
              <div className={css.labelCont}>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter text"
                  {...register("name")}
                />
              </div>
              <div className={css.labelCont}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter text"
                  {...register("email")}
                />
              </div>
            </div>
            <div className={css.styleContSecond}>
              <div className={css.labelCont}>
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Enter text"
                  {...register("phone")}
                />
              </div>
              <div className={css.labelCont}>
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Enter text"
                  {...register("address")}
                />
              </div>
            </div>
            <div className={css.paymentCont}>
              <h3 className={css.paymentTitle}>Payment method</h3>
              <p className={css.paymentText}>
                You can pay us in a multiple way in our payment gateway system.
              </p>
              <div className={css.radioInputCont}>
                {/* Cash On Delivery */}
                <label className={css.radioWrapper}>
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    className={css.radioInput}
                  />
                  <div className={css.radioCustom}></div>
                  <span>Cash On Delivery</span>
                </label>
                {/* Bank */}
                <label className={css.radioWrapper}>
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    className={css.radioInput}
                  />
                  <div className={css.radioCustom}></div>
                  <span>Bank</span>
                </label>
              </div>
            </div>
            <div className={css.orderDetailsCont}>
              <h3 className={css.orderDetailsTitle}>Order Details</h3>
              <p className={css.orderText}>
                Shipping and additional costs are calculated based on values you
                have entered.
              </p>
              <div className={css.priceCont}>
                <p>Total:</p>
                <p>৳ {totalPrice}</p>
              </div>
            </div>
            <button type="submit" className={css.orderBtn}>
              Place order
            </button>
          </form>
        </div>
        <div className={css.productCont}>
          <ul className={css.productList}>
            {addedProducts &&
              addedProducts.length > 0 &&
              addedProducts.map((product) => {
                return (
                  <CartItem
                    product={product}
                    key={product._id}
                    onRemove={handleRemove}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CartPage;

{
  /* <li className={css.productItem}>
              <div
                className={css.fotoCont}
                style={{ backgroundImage: `url(${productImage})` }}
              ></div>
              <div className={css.detailsCont}>
                <div className={css.infoCont}>
                  <div className={css.nameAndDesc}>
                    <h3>Vitamin C Medicine</h3>
                    <p>Antioxidant Aid for Heart Health</p>
                  </div>
                  <p className={css.price}>৳ 90.00</p>
                </div>
                <div className={css.functionalCont}>
                  <ul className={css.btnList}>
                    <li>
                      <button
                        className={css.funcBtn}
                        onClick={() => setQuantity((prev) => prev + 1)}
                      >
                        <img src={plusIcon} alt="Plus" />
                      </button>
                    </li>
                    <li>
                      <p className={css.counter}>{quantity}</p>
                    </li>
                    <li>
                      <button
                        disabled={quantity === 0}
                        className={css.funcBtn}
                        onClick={() => setQuantity((prev) => prev - 1)}
                      >
                        <img src={minusIcon} alt="Minus" />
                      </button>
                    </li>
                  </ul>
                  <button className={css.removeBtn}>Remove</button>
                </div>
              </div>
            </li> */
}

import { useState } from "react";
import css from "./CartPage.module.css";
import porductImage from "../../images/productImage.png";
import plusIcon from "../../images/plus.svg";
import minusIcon from "../../images/minus.svg";
const CartPage = () => {
  const [selected, setSelected] = useState("cash");
  const [quantity, setQuantity] = useState(1);
  return (
    <section className={css.mainSection}>
      <h2 className={css.title}>Cart</h2>
      <div className={css.mainCont}>
        <div className={css.formCont}>
          <h3 className={css.formTitle}>Enter shipping info </h3>
          <p className={css.formText}>
            Enter your delivery address where you get the product. You can also
            send any other location where you send the products.
          </p>

          <form>
            <div className={css.styleContFirst}>
              <div className={css.labelCont}>
                <label htmlFor="">Name</label>
                <input type="text" placeholder="Enter text" />
              </div>
              <div className={css.labelCont}>
                <label htmlFor="">Email</label>
                <input type="email" placeholder="Enter text" />
              </div>
            </div>
            <div className={css.styleContSecond}>
              <div className={css.labelCont}>
                <label htmlFor="">Phone</label>
                <input type="text" placeholder="Enter text" />
              </div>
              <div className={css.labelCont}>
                <label htmlFor="">Address</label>
                <input placeholder="Enter text" />
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
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={selected === "cash"}
                    onChange={() => setSelected("cash")}
                    className={css.radioInput}
                  />
                  <div className={css.radioCustom}></div>
                  <span>Cash On Delivery</span>
                </label>

                {/* Bank */}
                <label className={css.radioWrapper}>
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={selected === "bank"}
                    onChange={() => setSelected("bank")}
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
                Shipping and additionnal costs are calculated based on values
                you have entered.
              </p>
              <div className={css.priceCont}>
                <p>Toital:</p>
                <p>৳ 122.00</p>
              </div>
            </div>
            <button type="submit" className={css.orderBtn}>
              Place order
            </button>
          </form>
        </div>
        <div className={css.productCont}>
          <ul className={css.productList}>
            <li className={css.productItem}>
              <div
                className={css.fotoCont}
                style={{ backgroundImage: `url(${porductImage})` }}
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
                        <img src={plusIcon} alt="" />
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
                        <img src={minusIcon} alt="" />
                      </button>
                    </li>
                  </ul>
                  <button className={css.removeBtn}>Remove</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CartPage;

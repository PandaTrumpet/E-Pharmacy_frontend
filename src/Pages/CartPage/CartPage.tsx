import css from "./CartPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { cartValidationSchema } from "../../validation";
import { checkoutCart, updateOrder } from "../../redux/orders/operation";
import {
  addedProductsSelector,
  totalPriceSelector,
  totalProductsCountSelector,
} from "../../redux/orders/selector";
import CartItem from "../../components/CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
}

const CartPage = () => {
  const count = useSelector(totalProductsCountSelector);
  const addedProducts = useSelector(addedProductsSelector);
  const totalPrice = useSelector(totalPriceSelector);
  const updatePrice =
    typeof totalPrice === "number" ? Number(totalPrice.toFixed(2)) : 0;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(cartValidationSchema),
    defaultValues: {
      paymentMethod: "cash",
    },
  });

  const onSubmit = (data: FormData) => {
    if (addedProducts.length > 0) {
      dispatch(
        checkoutCart({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          paymentMethod: data.paymentMethod,
          ordersProduct: addedProducts || [],
          totalPrice: updatePrice,
          status: "Confirmed",
          productsCount: count,
          totalProducts: count,
        })
      )
        .unwrap()
        .then(() => {
          navigate("/");
          localStorage.removeItem("orderId");
          toast.success("Successfull sendet order!");
          reset();
        })
        .catch(() => toast.error("Сheck the correctness of the data"));
    } else {
      toast.error("You have not added any products to the cart");
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = (_id: string) => {
    dispatch(
      updateOrder({
        ordersProduct: [
          {
            isRemoved: true,
            _id,
            name: "",
            photo: "",
            suppliers: "",
            quantity: 0,
            price: 0,
            category: "",
          },
        ],
      })
    )
      .unwrap()
      .then(() => toast.success("Product removed from cart!"));
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
                {errors.name && (
                  <p className={css.error}>{errors.name.message}</p>
                )}
              </div>
              <div className={css.labelCont}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter text"
                  {...register("email")}
                />
                {errors.email && (
                  <p className={css.error}>{errors.email.message}</p>
                )}
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
                {errors.phone && (
                  <p className={css.error}>{errors.phone.message}</p>
                )}
              </div>
              <div className={css.labelCont}>
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Enter text"
                  {...register("address")}
                />
                {errors.address && (
                  <p className={css.error}>{errors.address.message}</p>
                )}
              </div>
            </div>
            <div className={css.paymentCont}>
              <h3 className={css.paymentTitle}>Payment method</h3>
              <p className={css.paymentText}>
                You can pay us in a multiple way in our payment gateway system.
              </p>
              <div className={css.radioInputCont}>
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
                <p>UA {updatePrice}</p>
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

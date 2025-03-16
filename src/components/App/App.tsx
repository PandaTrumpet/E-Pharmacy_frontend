import { Route, Routes } from "react-router-dom";
import SharedLayout from "../SharedLayout/SharedLayout";
import HomePage from "../../Pages/HomePage/HomePage";
import MedicineStorePage from "../../Pages/MedicineStorePage/MedicineStorePage";
import MedicinePage from "../../Pages/MedicinePage/MedicinePage";
import ProductPage from "../../Pages/ProductPage/ProductPage";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import RegisterPage from "../../Pages/RegisterPage/RegisterPage";
import Description from "../Description/Description";
import { Toaster } from "react-hot-toast";
import ProductReviews from "../ProductReviews/ProductReviews";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { selectModalType } from "../../redux/modal/selector";
import SimpleModal from "../SimpleModal/SimpleModal";
import CartPage from "../../Pages/CartPage/CartPage";
import { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getOrders } from "../../redux/orders/operation";
import { totalProductsCountSelector } from "../../redux/orders/selector";
import { isLoggedSelector } from "../../redux/auth/selector";
import PrivateRoute from "../PrivateRoute";

const App = () => {
  const isLogged = useSelector(isLoggedSelector);
  const modalTypeSelect = useSelector(selectModalType);
  const totalProducts = useSelector(totalProductsCountSelector) || 0;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!isLogged) {
      return;
    } else {
      const orderId = localStorage.getItem("orderId");
      if (orderId) {
        dispatch(getOrders());
      }
    }
  }, [dispatch, totalProducts]);
  return (
    <>
      <Routes>
        <Route element={<SharedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/medicine-store" element={<MedicineStorePage />} />
          <Route path="/medicine" element={<MedicinePage />} />
          <Route path="/product/:productId" element={<ProductPage />}>
            <Route path="description" element={<Description />} />
            <Route path="reviews" element={<ProductReviews />} />
          </Route>

          <Route
            path="/cart"
            element={
              <PrivateRoute component={<CartPage />} redirectTo="/login" />
            }
          />
          {/* <Route path="/cart" element={<CartPage />} /> */}
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Toaster position="top-center" toastOptions={{ duration: 1000 }} />

      {modalTypeSelect === "login" && (
        <SimpleModal>
          <LoginModal />
        </SimpleModal>
      )}
      {modalTypeSelect === "register" && (
        <SimpleModal>
          <RegisterModal />
        </SimpleModal>
      )}
    </>
  );
};

export default App;

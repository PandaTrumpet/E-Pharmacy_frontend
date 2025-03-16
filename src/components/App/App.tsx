import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getOrders } from "../../redux/orders/operation";
import { totalProductsCountSelector } from "../../redux/orders/selector";
import { isLoggedSelector } from "../../redux/auth/selector";
import { selectModalType } from "../../redux/modal/selector";
import SimpleModal from "../SimpleModal/SimpleModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import PrivateRoute from "../PrivateRoute";
import { lazy } from "react";
const SharedLayout = lazy(() => import("../SharedLayout/SharedLayout"));
const HomePage = lazy(() => import("../../Pages/HomePage/HomePage"));
const MedicineStorePage = lazy(
  () => import("../../Pages/MedicineStorePage/MedicineStorePage")
);
const MedicinePage = lazy(
  () => import("../../Pages/MedicinePage/MedicinePage")
);
const ProductPage = lazy(() => import("../../Pages/ProductPage/ProductPage"));
const CartPage = lazy(() => import("../../Pages/CartPage/CartPage"));
const LoginPage = lazy(() => import("../../Pages/LoginPage/LoginPage"));
const RegisterPage = lazy(
  () => import("../../Pages/RegisterPage/RegisterPage")
);
const NotFoundPage = lazy(() => import("../../Pages/NotFoundPage"));
const Description = lazy(() => import("../Description/Description"));
const ProductReviews = lazy(() => import("../ProductReviews/ProductReviews"));

const App = () => {
  const isLogged = useSelector(isLoggedSelector);
  const modalTypeSelect = useSelector(selectModalType);
  const totalProducts = useSelector(totalProductsCountSelector) || 0;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isLogged) {
      const orderId = localStorage.getItem("orderId");
      if (orderId) {
        dispatch(getOrders());
      }
    }
  }, [dispatch, totalProducts, isLogged]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Suspense>

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

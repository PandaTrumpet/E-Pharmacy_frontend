import { Route, Routes } from "react-router-dom";
import SharedLayout from "../SharedLayout/SharedLayout";
import HomePage from "../../Pages/HomePage/HomePage";
import MedicineStorePage from "../../Pages/MedicineStorePage/MedicineStorePage";
import MedicinePage from "../../Pages/MedicinePage/MedicinePage";
import ProductPage from "../../Pages/ProductPage/ProductPage";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import RegisterPage from "../../Pages/RegisterPage/RegisterPage";
import CartPage from "../../Pages/CartPage/CartPage";
import Description from "../Description/Description";
import Reviews from "../Reviews/Reviews";

import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Routes>
        {/* Маршруты, для которых нужен общий макет */}
        <Route element={<SharedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/medicine-store" element={<MedicineStorePage />} />
          <Route path="/medicine" element={<MedicinePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="product/:productId" element={<CartPage />}>
            <Route path="description" element={<Description />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>

        {/* Отдельные маршруты для логина и регистрации */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Toaster position="top-center" toastOptions={{ duration: 1000 }} />
    </>
  );
};

export default App;

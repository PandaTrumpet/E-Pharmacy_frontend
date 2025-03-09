import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import css from "./SharedLayout.module.css";

const SharedLayout = () => {
  return (
    <>
      <div className={css.layoutContainer}>
        <Header />
        <Outlet />
      </div>
      <div className={css.footer}>
        <Footer />
      </div>
    </>
  );
};

export default SharedLayout;

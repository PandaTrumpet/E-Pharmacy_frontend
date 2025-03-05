// import Footer from "../Footer/Footer";
// import Header from "../Header/Header";

// const SharedLayout = ({ children }) => {
//   return (
//     <div>
//       <Header />
//       {children}
//       <Footer />
//     </div>
//   );
// };

// export default SharedLayout;

import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import css from "./SharedLayout.module.css";
const SharedLayout = () => {
  return (
    <div className={css.layoutContainer}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SharedLayout;

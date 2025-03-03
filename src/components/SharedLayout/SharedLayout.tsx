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

const SharedLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SharedLayout;

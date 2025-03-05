import { Link } from "react-router-dom";
import css from "./Header.module.css";
import logo from "../../images/logo.png";
import logo1440 from "../../images/logo_1440.png";
import logo768 from "../../images/logo_768.png";
import market from "../../images/shopping-cart.png";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
const Header = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const handleToggle = () => {
    setIsMobile(!isMobile);
  };
  const [registered, setRegistered] = useState(true);
  return (
    <div className={css.headerContainer}>
      <div className={css.headerMain}>
        <Link to="/">
          <div className={css.logoCont}>
            <picture>
              <source media="(min-width: 1440px)" srcSet={logo1440} />
              <source media="(min-width: 768px)" srcSet={logo768} />
              <img src={logo} alt="Logo" className={css.logo} />
            </picture>

            <p>E-Pharmacy</p>
          </div>
        </Link>
        {registered ? (
          <ul className={css.navRegisteredElement}>
            <li>
              <div className={css.marketIconCont}>
                <img src={market} alt="Shop icon" className={css.marketIcion} />

                <div className={css.quantityShop}>
                  <p>0</p>
                </div>
              </div>
            </li>
            <li className={css.i}>
              <p>I</p>
            </li>
            <li>
              <button
                className={isMobile ? css.mobileClose : css.mobileMenuIcon}
                onClick={handleToggle}
              >
                {isMobile ? (
                  <IoCloseOutline size={24} />
                ) : (
                  <IoIosMenu size={24} />
                )}
              </button>
            </li>
          </ul>
        ) : (
          <button
            className={isMobile ? css.mobileClose : css.mobileMenuIcon}
            onClick={handleToggle}
          >
            {isMobile ? <IoCloseOutline size={24} /> : <IoIosMenu size={24} />}
          </button>
        )}
      </div>
      {isMobile && (
        <div className={css.mobileMenu}>
          <div className={css.darkTileMobile}></div>
          <div className={css.mainTileMobile}>
            <button
              className={css.mobileMenuClose}
              onClick={() => setIsMobile(false)}
            >
              <IoCloseOutline size={24} />
            </button>
            <ul className={css.mobileMenuList}>
              <li>
                <Link to="/" className={css.link}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/medicine-store" className={css.link}>
                  Medicine store
                </Link>
              </li>
              <li>
                <Link to="/medicine" className={css.link}>
                  Medicine
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

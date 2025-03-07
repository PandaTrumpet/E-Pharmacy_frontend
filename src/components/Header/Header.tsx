import css from "./Header.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";
import logo1440 from "../../images/logo_1440.png";
import logo768 from "../../images/logo_768.png";
import logoWhite from "../../images/footer_logo.png";
import logoWite1440 from "../../images/footer_logo_1440.png";
import logoWite768 from "../../images/footer_logo_768.png";
import market from "../../images/shopping-cart.png";
import { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";

const Header = () => {
  const [homeLocation, setHomeLocation] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const handleToggle = () => {
    setIsMobile(!isMobile);
  };

  const [registered, setRegistered] = useState(false);
  const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(css.link, isActive && css.active);
  };
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setHomeLocation(true);
    } else {
      setHomeLocation(false);
    }
  }, [location.pathname, setHomeLocation]);
  return (
    <header className={clsx(css.headerContainer, homeLocation && css.homePage)}>
      <div className={css.headerMain}>
        <Link to="/">
          <div className={css.logoCont}>
            <picture>
              <source
                media="(min-width: 1440px)"
                srcSet={homeLocation ? logoWite1440 : logo1440}
              />
              <source
                media="(min-width: 768px)"
                srcSet={homeLocation ? logoWite768 : logo768}
              />
              <img
                src={homeLocation ? logoWhite : logo}
                alt="Logo"
                className={css.logo}
              />
            </picture>

            <p className={clsx(homeLocation ? css.logoTextHome : css.logoText)}>
              E-Pharmacy
            </p>
          </div>
        </Link>
        <nav>
          <ul className={css.navMenu}>
            <li className={css.homeLink}>
              <NavLink
                to="/"
                // className={clsx(css.link, css.first)}
                className={buildLinkClass}
              >
                Home
              </NavLink>
            </li>
            <li className={css.storeLink}>
              <NavLink
                to="/medicine-store"
                // className={clsx(css.link, css.second)}
                className={buildLinkClass}
              >
                Medicine store
              </NavLink>
            </li>
            <li className={css.medicinelink}>
              <NavLink to="/medicine" className={buildLinkClass}>
                Medicine
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={css.desktopRegistered}>
          {registered && (
            <ul className={css.navRegisteredElementDesktop}>
              <li>
                <div className={css.marketIconCont}>
                  <img
                    src={market}
                    alt="Shop icon"
                    className={css.marketIcion}
                  />

                  <div className={css.quantityShop}>
                    <p>0</p>
                  </div>
                </div>
              </li>
              <li className={css.i}>
                <p>I</p>
              </li>
            </ul>
          )}
          <ul className={css.registerListDesktop}>
            {registered ? (
              <li>
                <button className={css.logoutBtn}>Log out</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/register" className={css.registerBtn}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" className={css.loginBtn}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
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
              <button className={css.mobileMenuIcon} onClick={handleToggle}>
                <IoIosMenu size={24} />
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
        <nav className={clsx(css.mobileMenu, isMobile && css.active)}>
          <div className={css.darkTileMobile}></div>
          <div className={css.mainTileMobile}>
            <button
              className={css.mobileMenuClose}
              onClick={() => setIsMobile(false)}
            >
              <IoCloseOutline size={24} />
            </button>
            <ul className={css.mobileMenuList}>
              <li className={css.homeLink} onClick={() => setIsMobile(false)}>
                <NavLink
                  to="/"
                  // className={clsx(css.link, css.first)}
                  className={buildLinkClass}
                >
                  Home
                </NavLink>
              </li>
              <li className={css.storeLink} onClick={() => setIsMobile(false)}>
                <NavLink
                  to="/medicine-store"
                  // className={clsx(css.link, css.second)}
                  className={buildLinkClass}
                >
                  Medicine store
                </NavLink>
              </li>
              <li
                className={css.medicinelink}
                onClick={() => setIsMobile(false)}
              >
                <NavLink to="/medicine" className={buildLinkClass}>
                  Medicine
                </NavLink>
              </li>
            </ul>
            {registered ? (
              <ul className={css.registerList}>
                <li>
                  <button className={css.logoutBtn}>Log out</button>
                </li>{" "}
              </ul>
            ) : (
              <ul className={css.registerList}>
                <li>
                  <Link to="/register" className={css.registerBtn}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" className={css.loginBtn}>
                    Login
                  </Link>
                </li>
              </ul>
            )}
            {/* <ul className={css.registerList}>
              {registered ? (
                <li>
                  <button className={css.logoutBtn}>Log out</button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/register" className={css.registerBtn}>
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className={css.loginBtn}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul> */}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;

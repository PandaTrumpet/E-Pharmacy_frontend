import css from "./Footer.module.css";
import { Link } from "react-router-dom";
import logo from "../../images/footer_logo.png";
import logo1440 from "../../images/footer_logo_1440.png";
import logo768 from "../../images/footer_logo_768.png";
import instagramIcon from "../../images/instagram.svg";
import facebook from "../../images/facebook.svg";
import youtube from "../../images/youtube.svg";
const Footer = () => {
  return (
    <footer className={css.footerCont}>
      <div className={css.mainFooter}>
        <div className={css.navFooterCont}>
          <div>
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
            <p className={css.footerText}>
              Get the medicine to help you feel better, get back to your active
              life, and enjoy every moment.
            </p>
          </div>
          <div className={css.linkCont}>
            <ul className={css.navList}>
              <li>
                <Link to="/" className={css.navLinks}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/medicine-store" className={css.navLinks}>
                  Medicine store
                </Link>
              </li>
              <li>
                <Link to="/medicine" className={css.navLinks}>
                  Medicine
                </Link>
              </li>
            </ul>
            <ul className={css.socialLinksList}>
              <li>
                <a href="">
                  <img src={facebook} alt="" />
                </a>
              </li>
              <li>
                <a href="">
                  <img src={instagramIcon} alt="" />
                </a>
              </li>
              <li>
                <a href="">
                  <img src={youtube} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={css.privacyCont}>
          <ul className={css.privacyList}>
            <li>
              <p className={css.privacyItem}>
                © E-Pharmacy 2023. All Rights Reserved
              </p>
            </li>
            <li>
              <p className={css.privacyElement}></p>
            </li>
            <li>
              <p className={css.privacyItem}>Privacy Policy</p>
            </li>
            <li>
              <p className={css.privacyElement}></p>
            </li>
            <li>
              <p className={css.privacyItem}>Terms & Conditions</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

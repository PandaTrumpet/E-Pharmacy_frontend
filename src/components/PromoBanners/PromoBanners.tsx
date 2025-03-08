import css from "./PromoBanners.module.css";
const PromoBanners = () => {
  return (
    <section className={css.mainSection}>
      <ul className={css.banerList}>
        <li className={css.banerItem}>
          <div className={css.banerCont}>
            <div className={css.banerNameCont}>
              <p className={css.banerNumber}>1</p>
              <h4 className={css.banerName}>Huge Sale</h4>
            </div>
            <div className={css.btnCont}>
              <p className={css.sale}>70%</p>
              <button>Shop now</button>
            </div>
          </div>
        </li>
        <li className={css.banerItem}>
          <div className={css.banerCont}>
            <div className={css.banerNameCont}>
              <p className={css.banerNumber}>2</p>
              <h4 className={css.banerName}>Secure delivery</h4>
            </div>
            <div className={css.btnCont}>
              <p className={css.sale}>100%</p>
              <button>Read more</button>
            </div>
          </div>
        </li>
        <li className={css.banerItem}>
          <div className={css.banerCont}>
            <div className={css.banerNameCont}>
              <p className={css.banerNumber}>3</p>
              <h4 className={css.banerName}>Off</h4>
            </div>
            <div className={css.btnCont}>
              <p className={css.sale}>35%</p>
              <button>Shop now</button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default PromoBanners;

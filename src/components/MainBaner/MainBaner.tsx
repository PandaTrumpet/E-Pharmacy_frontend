import css from "./MainBaner.module.css";

const MainBaner = () => {
  return (
    <section className={css.contentCont}>
      <div className={css.mainCont}>
        <h1>Your medication delivered</h1>
        <p>Say goodbye to all your healthcare worries with us</p>
      </div>
    </section>
  );
};

export default MainBaner;

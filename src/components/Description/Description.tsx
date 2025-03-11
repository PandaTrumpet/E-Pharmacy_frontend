import css from "./Description.module.css";

const Description = () => {
  return (
    <section>
      <ul className={css.sectionList}>
        <li>
          <p className={css.titelBegin}>
            Although it's typically considered safe, excessive consumption can
            lead to side effects. Therefore, it's recommended to consult a
            healthcare professional before using moringa, especially if you're
            pregnant, nursing, or taking other medications. This balanced
            approach allows for the benefits of moringa while recognizing the
            importance of proper usage and caution.
          </p>
        </li>
        <li>
          <p>
            <span className={css.titelBegin}>
              Medicinal Uses: Antioxidant Properties:
            </span>
            &nbsp; Moringa is packed with antioxidants that help fight oxidative
            stress and inflammation in the body.
          </p>
        </li>
        <li>
          <p>
            <span className={css.titelBegin}> Anti-Diabetic Effects:</span>
            &nbsp; Some studies have shown that moringa leaves might lower blood
            sugar levels, making it a valuable supplement for managing diabetes.
          </p>
        </li>
        <li>
          <p>
            <span className={css.titelBegin}>Heart Health:</span>
            &nbsp;The plant has been linked to reduced cholesterol levels, which
            is vital for heart health.
          </p>
        </li>
        <li>
          <p>
            <span className={css.titelBegin}> Anti-Cancer Properties:</span>
            &nbsp; Certain compounds in moringa, such as niazimicin, have been
            found to suppress the growth of cancer cells in laboratory studies.
          </p>
        </li>
        <li>
          <p>
            <span className={css.titelBegin}> Immune Support:</span>
            &nbsp; With its high vitamin C content, moringa can boost the immune
            system.
          </p>
        </li>
        <li>
          <p>
            <span className={css.titelBegin}> Digestive Aid:</span>
            &nbsp; Moringa can help in treating digestive disorders due to its
            anti-inflammatory properties.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default Description;

import css from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import logo1440 from "../../images/logo_1440.png";
import logo768 from "../../images/logo_768.png";
import pill from "../../images/pill.png";
import pill768 from "../../images/pill_768.png";
import pill1440 from "../../images/pill_1440.png";
import downElement from "../../images/registerPageDownElement.png";
import downElement1440 from "../../images/downElement_1440.png";
import downElement768 from "../../images/downElement_768.png";
import { ILoginFormInput } from "../../types.tsx";
import { useForm, SubmitHandler } from "react-hook-form";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();
  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    console.log(data);
  };
  return (
    <div className={css.loginContainer}>
      <div className={css.loginMain}>
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
        <div className={css.loginDesktopCont}>
          <div className={css.titleCont}>
            <h1>
              Your medication, delivered Say goodbye to all
              <span> your healthcare </span> worries with us
            </h1>

            <picture>
              <source media="(min-width: 1440px)" srcSet={pill1440} />
              <source media="(min-width: 768px)" srcSet={pill768} />
              <img src={pill} alt="Pill" className={css.pillFoto} />
            </picture>
          </div>
          <form className={css.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={css.inputCont}>
              <input {...register("email")} placeholder="Email address" />
              <input {...register("password")} placeholder="Password" />
            </div>
            <div className={css.loginBtnCont}>
              <button type="submit">Register</button>
              <Link to="/register" className={css.link}>
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
        <picture>
          <source media="(min-width: 1440px)" srcSet={downElement1440} />
          <source media="(min-width: 768px)" srcSet={downElement768} />
          <img src={downElement} alt="Element" className={css.downElement} />
        </picture>
      </div>
    </div>
  );
};

export default LoginPage;

import { Link } from "react-router-dom";
import css from "./RegisterPage.module.css";
import logo from "../../images/logo.png";
import pill from "../../images/pill.png";
import downElement from "../../images/registerPageDownElement.png";
import { IRegisterFormInput } from "../../types.tsx";
import { useForm, SubmitHandler } from "react-hook-form";
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInput>();
  const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
    console.log(data);
  };
  return (
    <div className={css.registerContainer}>
      <div className={css.main}>
        <Link to="/">
          <div className={css.logoCont}>
            <img src={logo} alt="Logo" className={css.logo} />
            <p>E-Pharmacy</p>
          </div>
        </Link>
        <div className={css.desktopCont}>
          <div className={css.titleCont}>
            <h1>
              Your medication, delivered Say goodbye to all
              <span> your healthcare </span> worries with us
            </h1>
            <img src={pill} alt="Pill" className={css.pillFoto} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={css.registerForm}>
            <div className={css.nameAddress}>
              <input {...register("name")} placeholder="User Name" />
              <input {...register("email")} placeholder="Email address" />
            </div>
            <div className={css.phonePassword}>
              <input {...register("phoneNumber")} placeholder="Phone number" />
              <input {...register("password")} placeholder="Password" />
            </div>
            <div className={css.registerBtnCont}>
              <button type="submit">Register</button>
              <Link to="/login" className={css.link}>
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
        <img src={downElement} alt="Element" className={css.downElement} />
      </div>
    </div>
  );
};

export default RegisterPage;

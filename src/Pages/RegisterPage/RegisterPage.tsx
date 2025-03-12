import { Link, useNavigate } from "react-router-dom";
import css from "./RegisterPage.module.css";
import logo from "../../images/logo.png";
import logo1440 from "../../images/logo_1440.png";
import logo768 from "../../images/logo_768.png";
import pill from "../../images/pill.png";
import pill768 from "../../images/pill_768.png";
import pill1440 from "../../images/pill_1440.png";
import downElement from "../../images/registerPageDownElement.png";
import downElement1440 from "../../images/downElement_1440.png";
import downElement768 from "../../images/downElement_768.png";
import { IRegisterFormInput } from "../../types.tsx";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store.tsx";
import { registerUser } from "../../redux/auth/operation.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validation.ts";
import toast from "react-hot-toast";
const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterFormInput>({
    resolver: yupResolver(registerSchema),
    mode: "onSubmit",
  });
  const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
    dispatch(
      registerUser({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
        phoneNumber: data.phoneNumber.trim(),
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Successfully registered!");
        navigate("/login");
      })
      .catch(() => toast.error("Check the data is correct!"));
  };
  return (
    <div className={css.registerContainer}>
      <div className={css.main}>
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
        <div className={css.desktopCont}>
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
          <form onSubmit={handleSubmit(onSubmit)} className={css.registerForm}>
            <div className={css.nameAddress}>
              <div className={css.inputCont}>
                <input {...register("name")} placeholder="User Name" />
                {errors.name && (
                  <p className={css.error}>{errors.name.message}</p>
                )}
              </div>
              <div className={css.inputCont}>
                <input {...register("email")} placeholder="Email address" />
                {errors.email && (
                  <p className={css.error}>{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className={css.phonePassword}>
              <div className={css.inputCont}>
                <input
                  {...register("phoneNumber")}
                  placeholder="Phone number"
                />
                {errors.phoneNumber && (
                  <p className={css.error}>{errors.phoneNumber.message}</p>
                )}
              </div>
              <div className={css.inputCont}>
                <input {...register("password")} placeholder="Password" />
                {errors.password && (
                  <p className={css.error}>{errors.password.message}</p>
                )}
              </div>
            </div>
            <div className={css.registerBtnCont}>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </button>
              <Link to="/login" className={css.link}>
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

export default RegisterPage;

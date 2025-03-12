import css from "./LoginModal.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { closeModalWindow, openModalWindow } from "../../redux/modal/slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginFormInput } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation";
import { loginUser } from "../../redux/auth/operation";
import toast from "react-hot-toast";

const LoginModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleToogle = () => {
    dispatch(openModalWindow({ modalType: "register" }));
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormInput>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });
  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    // console.log(data);

    dispatch(loginUser({ email: data.email, password: data.password }))
      .unwrap()
      .then(() => {
        toast.success("Successfull login!");
        dispatch(closeModalWindow());
      })
      .catch(() => toast.error("Email or password are wrong!"));
  };
  return (
    <div className={css.mainCont}>
      <div className={css.titleCont}>
        <h2>Log in to your account</h2>
        <p>Please login to your account before continuing.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputCont}>
          <div className={css.emailInput}>
            <input {...register("email")} placeholder="Email address" />
            {errors.email && (
              <p className={css.errorMail}>{errors.email.message}</p>
            )}
          </div>
          <div className={css.passwordlInput}>
            <input {...register("password")} placeholder="Password" />
            {errors.password && (
              <p className={css.errorPassword}>{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className={css.buttonCont}>
          <button
            className={css.loginBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <button className={css.toogleBtn} onClick={handleToogle}>
            Don't have an account?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;

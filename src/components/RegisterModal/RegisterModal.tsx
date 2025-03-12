import css from "./RegisterModal.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { openModalWindow } from "../../redux/modal/slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterFormInput } from "../../types";
import { registerSchema } from "../../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../redux/auth/operation";
import toast from "react-hot-toast";
// import { MdClose } from "react-icons/md";
const RegisterModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleToogle = () => {
    dispatch(openModalWindow({ modalType: "login" }));
  };
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

        dispatch(openModalWindow({ modalType: "login" }));
      })
      .catch(() => toast.error("Check the data is correct!"));
  };
  return (
    <div className={css.mainCont}>
      <div className={css.titleCont}>
        <h2>Sign Up</h2>
        <p>Before proceeding, please register on our site.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputCont}>
          <div className={css.nameCont}>
            <input {...register("name")} placeholder="User Name" />
            {errors.name && (
              <p className={css.nameError}>{errors.name.message}</p>
            )}
          </div>
          <div className={css.emailCont}>
            <input {...register("email")} placeholder="Email address" />
            {errors.email && (
              <p className={css.emailError}>{errors.email.message}</p>
            )}
          </div>
          <div className={css.phoneCont}>
            <input {...register("phoneNumber")} placeholder="Phone number" />
            {errors.phoneNumber && (
              <p className={css.phoneError}>{errors.phoneNumber.message}</p>
            )}
          </div>
          <div className={css.passwordCont}>
            <input {...register("password")} placeholder="Password" />
            {errors.password && (
              <p className={css.passwordError}>{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className={css.buttonCont}>
          <button
            className={css.loginBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
          <button className={css.toogleBtn} onClick={handleToogle}>
            Already have an account?
          </button>
        </div>
      </form>
      {/* <button className={css.closeBtn}>
        <MdClose />
      </button> */}
    </div>
  );
};

export default RegisterModal;

import css from "./LoginModal.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { openModalWindow } from "../../redux/modal/slice";

const LoginModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleToogle = () => {
    dispatch(openModalWindow({ modalType: "register" }));
  };

  return (
    <div className={css.mainCont}>
      <div className={css.titleCont}>
        <h2>Log in to your account</h2>
        <p>Please login to your account before continuing.</p>
      </div>
      <form action="">
        <div className={css.inputCont}>
          <input type="email" placeholder="Email address" />
          <input type="password" placeholder="Password" />
        </div>
        <div className={css.buttonCont}>
          <button className={css.loginBtn}>Log in</button>
          <button className={css.toogleBtn} onClick={handleToogle}>
            Don't have an account?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;

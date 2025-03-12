import css from "./RegisterModal.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { openModalWindow } from "../../redux/modal/slice";
// import { MdClose } from "react-icons/md";
const RegisterModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleToogle = () => {
    dispatch(openModalWindow({ modalType: "login" }));
  };

  return (
    <div className={css.mainCont}>
      <div className={css.titleCont}>
        <h2>Sign Up</h2>
        <p>Before proceeding, please register on our site.</p>
      </div>
      <form action="">
        <div className={css.inputCont}>
          <input type="text" placeholder="User Name" />
          <input type="email" placeholder="Email address" />
          <input type="text" placeholder="Phone number" />
          <input type="password" placeholder="Password" />
        </div>
        <div className={css.buttonCont}>
          <button className={css.loginBtn}>Log in</button>
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

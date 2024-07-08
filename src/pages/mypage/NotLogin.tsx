import React from "react";
import { useSetRecoilState } from "recoil";
import { toggleLoginModalState, toggleSignModalState } from "../../store/atom";
import { Login } from "../login/Login";
import { Register } from "../register/Register";
import styles from "./MyPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const NotLogin = () => {
  const seLoginOpen = useSetRecoilState(toggleLoginModalState);
  const setSignOpen = useSetRecoilState(toggleSignModalState);

  return (
    <div className={styles.notLogin}>
      <div className={styles.notLoginWrap}>
        <div className={styles.notLoginIcon} />
      </div>
      <div className={styles.notLoginWrap}>
        <div className={styles.notLoginBanner} />
      </div>
      <div className={styles.notLoginWrap}>
        <div className={styles.hr} />
      </div>
      <div className={styles.notLoginbody}>
        <div className={styles.btn} onClick={() => seLoginOpen(true)}>
          <div className={styles.loginicon} />
          <span>로그인이 필요합니다</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div className={styles.btn} onClick={() => setSignOpen(true)}>
          <div className={styles.signicon} />
          <span>회원가입 하러가기</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
      <Login />
      <Register />
    </div>
  );
};

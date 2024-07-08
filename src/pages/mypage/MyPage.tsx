import React, { useEffect, useState } from "react";
import { getCookie } from "../../util/cookie";
import { NotLogin } from "./NotLogin";
import { Authentication } from "./Authentication";
import styles from "./MyPage.module.css";

export const MyPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (getCookie("Authorization")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div className={styles.inner}>
      {isLogin ? <Authentication /> : <NotLogin />}
    </div>
  );
};

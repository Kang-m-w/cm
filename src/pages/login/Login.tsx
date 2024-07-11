import React, { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/modal/Modal";
import { useRecoilState } from "recoil";
import { toggleLoginModalState } from "../../store/atom";
import { Button } from "../../components/button/Button";
import { Header } from "../../components/header/Header";
import styles from "./Login.module.css";
import { login } from "../../util/api/userApi";
import { setCookie } from "../../util/cookie";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { notifyError, notifySuccess } from "../../util/utils";

export const Login = () => {
  const [isOpen, setIsOpen] = useRecoilState(toggleLoginModalState);
  const [eye, setEye] = useState<{ type: string; boolean: boolean }>({
    type: "password",
    boolean: true,
  });
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const options = {
    style: {
      width: "400px",
      height: "600px",
      borderRadius: "10px",
    },
    option: {
      isRes: true,
    },
  };

  const submit = () => {
    if (!idRef.current?.value) {
      notifyError("아이디를 입력해 주세요");
      return;
    }

    if (!pwRef.current?.value) {
      notifyError("비밀번호를 입력해 주세요");
      return;
    }

    login({
      user_id: idRef.current.value,
      user_pw: pwRef.current.value,
    })
      .then((res) => {
        setCookie("Authorization", `${res.token}`, {path: '/'});
        notifySuccess("로그인에 성공하였습니다");
        navigate("/");
      })
      .catch((_err) => {
        notifyError("아이디 또는 비밀번호가 일치하지 않습니다");
      });
  };

  const chageEye = () => {
    setEye(
      !eye.boolean
        ? {
            type: "password",
            boolean: true,
          }
        : {
            type: "text",
            boolean: false,
          }
    );
  };

  useEffect(() => {
    idRef.current!.value = "";
    pwRef.current!.value = "";
  }, [isOpen])

  return (
    <Modal init={options} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.inner}>
        <div className={styles.close}>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </div>
        <div className={styles.header}>
          <Header txt="로그인" align="center" value="login" />
        </div>
        <div className={styles.body}>
          <div className={styles.id}>
            <input
              type="text"
              placeholder="아이디 입력"
              id={styles.input}
              ref={idRef}
            />
          </div>
          <div className={styles.pw}>
            <input
              type={eye.type}
              placeholder="비밀번호 입력"
              id={styles.input}
              ref={pwRef}
            />
            <div className={styles.eye}>
              {eye.boolean ? (
                <FontAwesomeIcon icon={faEye} onClick={chageEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} onClick={chageEye} />
              )}
            </div>
          </div>
          <div className={styles.btn}>
            <Button txt={"로그인"} onClick={submit} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

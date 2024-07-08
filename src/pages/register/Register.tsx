import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Register.module.css";
import { Modal } from "../../components/modal/Modal";
import { useRecoilState } from "recoil";
import { toggleSignModalState } from "../../store/atom";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "../../components/header/Header";
import { Button } from "../../components/button/Button";
import { createUser } from "../../util/api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export const Register = () => {
  const navigate = useNavigate();
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isOpen, setIsOpen] = useRecoilState(toggleSignModalState);
  const options = {
    style: {
      width: "400px",
      height: "700px",
      borderRadius: "10px",
    },
    option: {
      isRes: true,
    },
  };
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pwCheckRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const [eye, setEye] = useState<{ type: string; boolean: boolean }>({
    type: "password",
    boolean: true,
  });
  const [eye2, setEye2] = useState<{ type: string; boolean: boolean }>({
    type: "password",
    boolean: true,
  });

  const selectOption = [
    { value: "sw", label: "소프트웨어개발과" },
    { value: "ai", label: "인공지능개발과" },
    { value: "game", label: "게임개발과" },
  ];

  const monthOption = [
    { value: "1", label: "1월" },
    { value: "2", label: "2월" },
    { value: "3", label: "3월" },
    { value: "4", label: "4월" },
    { value: "5", label: "5월" },
    { value: "6", label: "6월" },
    { value: "7", label: "7월" },
    { value: "8", label: "8월" },
    { value: "9", label: "9월" },
    { value: "10", label: "10월" },
    { value: "11", label: "11월" },
    { value: "12", label: "12월" },
  ];

  const colourStyles = {
    control: (style: any, { isFocused }: any) => ({
      //current
      ...style,
      boxShadow: "none",
      backgroundColor: "#ffffff",
      outline: "none",
      fontSize: "13px",
    }),
    option: (style: any, { isFocused }: any) => {
      //option
      return {
        ...style,
        width: 300,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isFocused ? "#e2e2e2" : "#ffffff",
        color: "rgb(88, 88, 88)",
        borderRadius: "3px",
        fontSize: "13px",
      };
    },
  };

  const notifyError = (txt: string) => {
    toast.error(txt, {
      autoClose: 1500,
      position: "top-center",
      hideProgressBar: true,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const chageEye = (num: number) => {
    if (num === 1) {
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
    } else {
      setEye2(
        !eye2.boolean
          ? {
              type: "password",
              boolean: true,
            }
          : {
              type: "text",
              boolean: false,
            }
      );
    }
  };

  const handleMajor = (e: any) => {
    setSelectedMajor(e.value);
  };

  const dateRef = useRef<any>(null);

  const handleYear = (e: any) => {
    setSelectedYear(e.value);
  };

  const handleMonth = (e: any) => {
    setSelectedMonth(e.value);
  };

  const handleDate = (e: any) => {
    setSelectedDate(e.value);
  };

  const yearOption = useMemo(() => {
    const years = [];
    for (let i = 1960; i <= new Date().getFullYear(); i++) {
      years.push({ value: i.toString(), label: `${i}년` });
    }
    return years;
  }, []);

  useEffect(() => {
    idRef.current!.value = "";
    pwRef.current!.value = "";
  }, [isOpen]);

  const dayOption = useMemo(() => {
    const days = [{ value: "", label: "-" }];
    if (!selectedYear || !selectedMonth) {
      return days;
    }
    const date = new Date(Number(selectedYear), Number(selectedMonth), 0);
    for (let i = 1; i <= date.getDate(); i++) {
      days.push({ value: i.toString(), label: `${i}일` });
    }
    return days;
  }, [selectedYear, selectedMonth]);

  const create = () => {
    if (!nameRef.current?.value) {
      notifyError("이름을 입력해 주세요");
      return;
    }

    if (!idRef.current?.value) {
      notifyError("아이디를 입력해 주세요");
      return;
    }

    if (!pwRef.current?.value) {
      notifyError("비밀번호를 입력해 주세요");
      return;
    }

    if (
      !pwCheckRef.current?.value ||
      pwCheckRef.current.value !== pwRef.current?.value
    ) {
      notifyError("비밀번호가 일치하지 않습니다");
      return;
    }

    if (!emailRef.current?.value) {
      notifyError("이메일을 입력해 주세요");
      return;
    }

    if (!telRef.current?.value) {
      notifyError("전화번호를 입력해 주세요");
      return;
    }

    if (selectedYear === "" || selectedMonth === "" || selectedDate === "") {
      notifyError("생년월일을 입력해 주세요");
      return;
    }

    if (!selectedMajor) {
      notifyError("전공을 선택해 주세요");
      return;
    }

    createUser({
      user_name: nameRef.current.value,
      user_id: idRef.current.value,
      user_tel: telRef.current.value,
      user_birth: new Date(
        Number(selectedYear),
        Number(selectedMonth) - 1,
        Number(selectedDate)
      ),
      user_mail: emailRef.current.value,
      user_pw: pwRef.current.value,
      major: selectedMajor,
    })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          <Header txt="회원가입" align="center" value="login" />
        </div>
        <div className={styles.body}>
          <div className={styles.placeholder}>
            <span>이름</span>
          </div>
          <div className={styles.inputName}>
            <div className={`${styles.input} ${styles.name}`}>
              <input
                type="text"
                placeholder="이름 입력"
                id={styles.input}
                ref={nameRef}
              />
            </div>
          </div>
          <div className={styles.placeholder}>
            <span>아이디</span>
          </div>
          <div className={`${styles.inputId} ${styles.inputWrap}`}>
            <div className={`${styles.input} ${styles.id}`}>
              <input
                type="text"
                placeholder="아이디 입력"
                id={styles.input}
                ref={idRef}
              />
            </div>
            <div className={styles.duplication}>
              <button>중복 확인</button>
            </div>
          </div>
          <div className={styles.placeholder}>
            <span>비밀번호</span>
          </div>
          <div className={styles.inputWrap}>
            <div className={`${styles.input} ${styles.pw}`}>
              <input
                type={eye.type}
                placeholder="비밀번호 입력"
                id={styles.input}
                ref={pwRef}
              />
              <div className={styles.eye}>
                {eye.boolean ? (
                  <FontAwesomeIcon icon={faEye} onClick={() => chageEye(1)} />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    onClick={() => chageEye(1)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.input} ${styles.pw}`}>
              <input
                type={eye2.type}
                placeholder="비밀번호 재입력"
                id={styles.input}
                ref={pwCheckRef}
              />
              <div className={styles.eye}>
                {eye2.boolean ? (
                  <FontAwesomeIcon icon={faEye} onClick={() => chageEye(2)} />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    onClick={() => chageEye(2)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.placeholder}>
            <span>이메일</span>
          </div>
          <div className={styles.inputWrap}>
            <div className={`${styles.input} ${styles.email}`}>
              <input
                type="email"
                placeholder="이메일 입력"
                id={styles.input}
                ref={emailRef}
              />
            </div>
          </div>
          <div className={styles.placeholder}>
            <span>전화번호</span>
          </div>
          <div className={styles.inputWrap}>
            <div className={`${styles.input}`}>
              <input
                type="tel"
                placeholder="전화번호 입력 ( '-' 하이폰 제외 )"
                id={styles.input}
                ref={telRef}
              />
            </div>
          </div>
          <div className={styles.placeholder}>
            <span>생년월일</span>
          </div>
          <div className={styles.inputWrap}>
            <div className={`${styles.input} ${styles.birth}`}>
              <div className={styles.dateInput}>
                <Select
                  defaultValue={yearOption}
                  options={yearOption}
                  isMulti={false}
                  isSearchable={false}
                  onChange={handleYear}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
              <div className={styles.slash}>/</div>
              <div className={styles.dateInput}>
                <Select
                  defaultValue={monthOption}
                  options={monthOption}
                  isMulti={false}
                  isSearchable={false}
                  onChange={handleMonth}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
              <div className={styles.slash}>/</div>
              <div className={styles.dateInput}>
                <Select
                  defaultValue={dayOption}
                  options={dayOption}
                  isMulti={false}
                  isSearchable={false}
                  onChange={handleDate}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  ref={dateRef}
                />
              </div>
            </div>
          </div>
          <div className={styles.placeholder}>
            <span>전공</span>
          </div>
          <div className={styles.inputWrap}>
            <div className={`${styles.selector}`}>
              <Select
                defaultValue={selectOption}
                options={selectOption}
                isMulti={false}
                onChange={handleMajor}
                isSearchable={false}
                className={styles.majorSelect}
                styles={colourStyles}
              />
            </div>
          </div>
          <div className={styles.btn}>
            <Button txt="회원가입" onClick={create} />
          </div>
          <div className={styles.empty} />
        </div>
      </div>
    </Modal>
  );
};

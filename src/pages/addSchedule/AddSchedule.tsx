import React, { useState } from "react";
import styles from "./AddSchedule.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { Input } from "../../components/form/Input";
import { Button } from "../../components/button/Button";
import { createSchedule } from "../../util/api/schedule";
import { notifyError, notifySuccess } from "../../util/utils";

export const AddSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scName, setScName] = useState();
  const [scArea, setScArea] = useState();
  const [scDesc, setScDesc] = useState<string>();
  const [scDate, setScDate] = useState();

  const submit = () => {
    if (!scName) {
      notifyError("일정 이름을 입력하세요");
      return;
    }

    if (!scArea) {
      notifyError("일정 장소를 입력하세요");
      return;
    }

    if (!scDesc) {
      notifyError("일정 정보를 입력하세요");
      return;
    }

    if (!scDate) {
      notifyError("일정 시간을 입력하세요");
      return;
    }

    createSchedule({
      club_id: id!,
      schedule_area: scArea,
      schedule_date: scDate,
      schedule_desc: scDesc,
      schedule_name: scName,
    })
      .then((res) => {
        notifySuccess("일정을 추가하였습니다");
        navigate("/");
      })
      .catch((err) => {
        notifyError("다시 시도해주세요");
        console.log(err);
      });
  };

  return (
    <div className={styles.inner}>
      <div className={styles.header}>
        <Header txt="일정 추가" align="center" />
      </div>
      <div className={styles.body}>
        <div className={styles.form}>
          <Input
            type="text"
            label="일정 이름"
            id="sc_name"
            setEnter={setScName}
          />
          <Input
            type="text"
            label="일정 장소"
            id="sc_area"
            setEnter={setScArea}
          />
          <Input
            type="date"
            label="일정 시간"
            id="sc_date"
            setEnter={setScDate}
          />
          <div className={`${styles.input} ${styles.desc}`}>
            <label>일정 설명</label>
            <textarea
              onChange={(e) => {
                setScDesc(e.target.value);
              }}
            />
          </div>
          <div className={styles.btnWrap}>
            <div className={styles.btn}>
              <Button onClick={submit} txt="+" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

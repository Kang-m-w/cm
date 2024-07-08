import React, { useEffect, useState } from "react";
import styles from "./ModifyClub.module.css";
import { Header } from "../../components/header/Header";
import { Input } from "../../components/form/Input";
import { Button } from "../../components/button/Button";
import { useParams } from "react-router-dom";

export const ModifyClub = () => {
  const { id } = useParams();
  const [clubName, setClubName] = useState<string>();
  const [clubTeather, setClubTeacher] = useState<string>();
  const [clubMaster, setClubMaster] = useState<string>();
  const [stDate, setStDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [check, setCheck] = useState(false);

  const toggleCheck = () => {
    setCheck(!check);
  };

  useEffect(() => {
    console.log(stDate, endDate)
  }, [stDate, endDate])

  return (
    <div className={styles.inner}>
      <div className={styles.header}>
        <Header txt="동아리 수정" align="center" />
      </div>
      <div className={styles.body}>
        <div className={styles.form}>
          <Input
            type="text"
            label="동아리 이름"
            id="club_name"
            setEnter={setClubName}
          />
          <Input
            type="text"
            label="담당 선생님"
            id="club_teacher"
            setEnter={setClubTeacher}
          />
          <Input
            type="text"
            label="부장 이름"
            id="club_master"
            setEnter={setClubMaster}
          />
          <div className={styles.input}>
            <label>모집 여부</label>
            <label className={styles.switch}>
              <input role="switch" type="checkbox" onClick={toggleCheck} />
            </label>
          </div>
          <div
            className={styles.available}
            style={{
              display: check ? "block" : "none",
            }}
          >
            <div className={styles.input}>
              <label>모집 기간</label>
              <div className={styles.date}>
                <input
                  type="date"
                  onChange={(e) => {
                    setStDate(e.target.value);
                  }}
                />
                <span>~</span>
                <input
                  type="date"
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.btnWrap}>
            <div className={styles.btn}>
              <Button onClick={() => {}} txt="+" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

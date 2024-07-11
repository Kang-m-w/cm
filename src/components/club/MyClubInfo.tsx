import React, { useEffect, useState } from "react";
import styles from "./ClubInfo.module.css";
import { ClubType } from "../../types/clubType";
import { Button } from "../button/Button";
import { dateFormat } from "../../util/utils";
import { useNavigate } from "react-router-dom";

export const MyClubInfo = (props: { data: ClubType | undefined }) => {
  const navigate = useNavigate();
  const [recruitment, setRecruitment] = useState({
    flag: false,
    stdate: "",
    enddate: "",
  });

  useEffect(() => {
    if (props.data?.st_date || props.data?.end_date || new Date(props.data!.end_date).getTime() >= new Date().getTime()) {
      setRecruitment({
        flag: true,
        stdate: props.data!.st_date.toString(),
        enddate: props.data!.end_date.toString(),
      });
    }
  }, []);

  const modify = () => {
    navigate(`/modify/${props.data?.club_id}`);
  };

  return (
    <div className={styles.inner}>
      <div className={styles.poster}>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(/api/club/img/${props.data?.club_id})`,
          }}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>
          <span id={styles.name}>{props.data?.club_name}</span>
          <span id={styles.clf}>
            {props.data?.classification === "major" ? "전공" : "자율"} 동아리
          </span>
        </div>
        <div className={styles.master}>부장: {props.data?.club_master}</div>
        <div className={styles.date}>
          모집기간&nbsp;:&nbsp;
          {recruitment.flag
            ? `${dateFormat(new Date(recruitment.stdate))} ~ ${
                recruitment.flag
                  ? dateFormat(new Date(recruitment.enddate))
                  : ""
              }`
            : "모집 종료"}
        </div>
        <div className={styles.desc}>{props.data?.description}</div>
      </div>
      <div className={styles.btn}>
        <div className={styles.btnWrap}>
          <Button txt="수정하기" onClick={modify} />
        </div>
      </div>
      <div className={styles.empty} />
    </div>
  );
};

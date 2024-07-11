import React, { useEffect, useState } from "react";
import styles from "./ClubInfo.module.css";
import { ClubType } from "../../types/clubType";
import { Button } from "../button/Button";
import { dateFormat, notifyError, notifySuccess } from "../../util/utils";
import { joinClub } from "../../util/api/clubApi";
import { getMyId } from "../../util/api/userApi";

export const ClubInfo = (props: { data: ClubType | undefined }) => {
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

  const requireJoinClub = async () => {
    let myId = "";
    await getMyId()
      .then((res) => {
        myId = res.data;
      })
      .catch((err) => {});

    if (recruitment.flag) {
      joinClub(myId, props.data!.club_id)
        .then((res) => {
          notifySuccess("신청에 성공하였습니다");
        })
        .catch((err) => {
          notifyError("이미 가입되어있습니다");
        });
    } else {
      notifyError("신청 기간이 아닙니다");
    }
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
          <Button
            txt="가입신청"
            onClick={requireJoinClub}
            extra_class={recruitment.flag ? "" : "recruit"}
          />
        </div>
      </div>
      <div className={styles.empty} />
    </div>
  );
};

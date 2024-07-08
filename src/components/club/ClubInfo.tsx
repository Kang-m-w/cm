import React, { useEffect, useState } from "react";
import styles from "./ClubInfo.module.css";
import { ClubType } from "../../types/clubType";
import { Button } from "../button/Button";
import { toast } from "react-toastify";
import { dateFormat } from "../../util/utils";

export const ClubInfo = (props: { data: ClubType | undefined }) => {
  const [recruitment, setRecruitment] = useState({
    flag: false,
    stdate: "",
    enddate: "",
  });

  useEffect(() => {
    if (props.data?.st_date || props.data?.end_date) {
      setRecruitment({
        flag: true,
        stdate: props.data.st_date.toString(),
        enddate: props.data.end_date.toString(),
      });
    }
  }, []);

  const notifyError = (txt: string) => {
    toast.error(txt, {
      autoClose: 1500,
      position: "top-center",
      hideProgressBar: true,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notifyOk = (txt: string) => {
    toast.success(txt, {
      autoClose: 1500,
      position: "top-center",
      hideProgressBar: true,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const requireJoinClub = () => {
    if (recruitment.flag) {
      notifyOk('신청에 성공하였습니다')
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
            backgroundImage:
              "url('https://www.gasw.or.kr/data/file/group/3554937711_smjNdpAL_1e90c0999882d84722b1c01dda3a40e97e021cca.jpg')",
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
    </div>
  );
};

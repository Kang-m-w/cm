import React, { useEffect, useState } from "react";
import styles from "./ClubItem.module.css";
import { ClubType } from "../../types/clubType";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../util/utils";

export const ClubItem = (props: { item: ClubType }) => {
  const navigate = useNavigate();
  const [clubTag, setClubTag] = useState("");
  const [recruit, setRecruit] = useState({
    st_date: "",
    end_date: "",
    flag: false,
  });

  useEffect(() => {
    setClubTag(props.item.classification === "free" ? "자율" : "전공");
    if (props.item.st_date && props.item.end_date) {
      setRecruit({
        st_date: props.item.st_date.toString(),
        end_date: props.item.end_date.toString(),
        flag: true,
      });
    } else {
      setRecruit({
        st_date: "",
        end_date: "",
        flag: false,
      });
    }
  }, [props.item]);

  const notifyError = (txt: string) => {
    toast.error(txt, {
      autoClose: 1500,
      position: "top-center",
      hideProgressBar: true,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const requireJoinClub = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (recruit.flag) {
      alert("Hello");
    } else {
      notifyError("신청 기간이 아닙니다");
    }
  };

  const viewClub = () => {
    navigate(`/club/${props.item.club_id}`);
  };

  return (
    <div className={styles.container} onClick={viewClub}>
      <div className={styles.poster} />
      <div className={styles.content}>
        <div id={styles.header}>
          <span id={styles.title}>{props.item.club_name}</span>
          <span id={styles.master}>{props.item.club_master}</span>
        </div>
        <div id={styles.date}>
          {recruit.flag
            ? `${dateFormat(new Date(recruit.st_date))} ~ ${
                recruit.flag ? dateFormat(new Date(recruit.end_date)) : ""
              }`
            : "모집 종료"}
        </div>
        <div id={styles.detail}>{props.item.description}</div>
        <div id={styles.footer}>
          <span id={styles.tag}>{clubTag}동아리</span>
          <button
            id={`${styles.btn}`}
            className={`${!recruit.flag ? "recruit" : ""}`}
            onClick={requireJoinClub}
          >
            가입신청
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import styles from "./MyClubItem.module.css";
import { AffiType } from "../../types/affiType";
import { getClubById } from "../../util/api/clubApi";
import { ClubType } from "../../types/clubType";
import { useNavigate } from "react-router-dom";

export const MyClubItem = (props: { item: AffiType }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<ClubType>();

  useEffect(() => {
    getClubById(props.item.club_id)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.item]);

  const toggleBox = () => {
    navigate(`/myclub/${props.item.club_id}`);
  }  

  return (
    <div className={styles.item} onClick={toggleBox}>
      <div className={styles.header}>
        <span className={styles.name}>{data?.club_name}</span>
        <span className={styles.master}>동아리장 : {data?.club_master}</span>
      </div>
      <div className={styles.footer}>
        {data?.classification === "free" ? "자율" : "전공"}
      </div>
    </div>
  );
};

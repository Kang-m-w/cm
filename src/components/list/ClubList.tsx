import React, { useEffect } from "react";
import styles from "./ClubList.module.css";
import { ClubItem } from "../item/ClubItem";
import { ClubType } from "../../types/clubType";

export const ClubList = (props: { list?: ClubType[] }) => {

  return (
    <div className={styles.list}>
      {props.list?.map((item, _idx) => (
        <ClubItem key={`club-${_idx}`} item={item} />
      ))}
    </div>
  );
};

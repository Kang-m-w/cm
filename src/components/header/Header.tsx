import React from "react";
import styles from "./Header.module.css";

export const Header = (props: {
  txt: string;
  align: string; // 수직 정렬
  value?: string; // 수평 정렬
}) => {
  return (
    <div
      className={`${styles.wrap} ${props.align} ${props.value}`}
    >
      {props.txt}
    </div>
  );
};

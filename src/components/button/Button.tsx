import React from "react";
import styles from "./Button.module.css";

export const Button = (props: {
  txt: string;
  onClick: () => void;
  extra_class?: string;
}) => {
  return (
    <button
      className={`${styles.btn} ${
        props.extra_class === undefined ? "" : props.extra_class
      }`}
      onClick={props.onClick}
    >
      {props.txt}
    </button>
  );
};

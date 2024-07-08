import React from "react";
import styles from "./Input.module.css";

export const Input = (props: {
  type: string;
  label: string;
  id: string;
  setEnter: any;
}) => {
  return (
    <div className={styles.input}>
      <label>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        onChange={(e) => {
          props.setEnter(e.target.value);
        }}
      />
    </div>
  );
};

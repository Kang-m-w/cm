import React from "react";
import styles from "./ScheduleItem.module.css";
import { ScheduleType } from "../../types/scheduleType";
import { dateFormat } from "../../util/utils";

export const ScheduleItem = (props: { item: ScheduleType }) => {
  return (
    <div className={styles.container}>
      <div className={styles.date}>
        {dateFormat(new Date(props.item.schedule_date))}
      </div>
      <div className={styles.body}>
        <span className={styles.name}>{props.item.schedule_name}</span>
        <span className={styles.area}>{props.item.schedule_area}</span>
        <span className={styles.desc}>{props.item.schedule_desc}</span>
      </div>
    </div>
  );
};

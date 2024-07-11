import React, { useEffect, useState } from "react";
import styles from "./ClubSchedule.module.css";
import { Button } from "../button/Button";
import { getClubScheduleList } from "../../util/api/schedule";
import { ScheduleType } from "../../types/scheduleType";
import { ScheduleItem } from "../schedule/ScheduleItem";
import { useNavigate } from "react-router-dom";

export const ClubSchedule = (props: { clubId: string }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<ScheduleType[]>();

  useEffect(() => {
    getClubScheduleList(props.clubId)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.clubId]);

  return (
    <div className={styles.inner}>
      <div className={styles.title}>
        <span>동아리 일정</span>
      </div>
      <div className={styles.list}>
        {data?.map((ele) => (
          <ScheduleItem item={ele} />
        ))}
      </div>
      <div className={styles.empty} />
      <div className={styles.btn}>
        <Button
          txt="+"
          onClick={() => {
            navigate(`/schedule/add/${props.clubId}`);
          }}
        />
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import styles from "./Club.module.css";
import { useParams } from "react-router-dom";
import { getClubById } from "../../util/api/clubApi";
import { ClubType } from "../../types/clubType";
import { ClubInfo } from "../../components/club/ClubInfo";
import { ClubSchedule } from "../../components/club/ClubSchedule";
import { ClubCommunity } from "../../components/club/ClubCommunity";

export const Club = () => {
  const { id } = useParams();
  const [data, setData] = useState<ClubType>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("info");

  useEffect(() => {
    getClubById(id!)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const togglePage = (pageName: string) => {
    setPage(pageName);
  };

  if (loading) return <div>Loading ..</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.nav}>
          <span
            className={`${page === "info" ? "isActive" : ""}`}
            onClick={() => togglePage("info")}
          >
            정보
          </span>
        </div>
        <div className={styles.nav}>
          <span
            className={`${page === "schedule" ? "isActive" : ""}`}
            onClick={() => togglePage("schedule")}
          >
            일정
          </span>
        </div>
        <div className={styles.nav}>
          <span
            className={`${page === "community" ? "isActive" : ""}`}
            onClick={() => togglePage("community")}
          >
            커뮤니티
          </span>
        </div>
      </div>
      <div className={styles.inner}>
        {page === "info" ? (
          <ClubInfo data={data} />
        ) : page === "schedule" ? (
          <ClubSchedule />
        ) : (
          <ClubCommunity />
        )}
      </div>
    </div>
  );
};

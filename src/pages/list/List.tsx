import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { Header } from "../../components/header/Header";
import { ClubList } from "../../components/list/ClubList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { clubListAtom } from "../../store/atom";
import { ClubType } from "../../types/clubType";
import { getClubListByTag, searchClub } from "../../util/api/clubApi";

export const List = () => {
  const [isActive, setIsActive] = useState<string>("");
  const clubListAll = useRecoilValue(clubListAtom);
  const [clubList, setClubList] = useState<ClubType[]>();

  const toggleTag = (tag: string) => {
    setIsActive(tag);
  };

  useEffect(() => {
    if (isActive === "free") {
      getClubListByTag("free")
        .then((res) => {
          setClubList(res);
        })
        .catch((err) => {
          console.log(err);
        });
      } else if (isActive === "major") {
        getClubListByTag("major")
        .then((res) => {
          setClubList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setClubList(clubListAll);
    }
  }, [isActive]);

  const searchingClub = (e: any) => {
    searchClub(e.target.value).then((res) => {
      setClubList(res);
    })
    toggleTag("");
  }

  return (
    <div className={styles.inner}>
      <Header txt="동아리 목록" align="center" />
      <div className={styles.search}>
        <div className={styles.bar}>
          <input type="text" placeholder="검색어 입력 .." onChange={(e) => {searchingClub(e)}} />
          <div className={styles.searchIcon}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        <div className={styles.nav}>
          <div className={styles.navWrap}>
            <span
              className={`${styles.item} ${isActive === "" ? "isActive" : ""}`}
              onClick={() => toggleTag("")}
            >
              🍀 전체
            </span>
            <div className={styles.line}>
              <div />
            </div>
            <span
              className={`${styles.item} ${
                isActive === "major" ? "isActive" : ""
              }`}
              onClick={() => toggleTag("major")}
            >
              💻 전공
            </span>
            <div className={styles.line}>
              <div />
            </div>
            <span
              className={`${styles.item} ${
                isActive === "free" ? "isActive" : ""
              }`}
              onClick={() => toggleTag("free")}
            >
              📖 자율
            </span>
          </div>
        </div>
      </div>
      <div>
        <ClubList list={clubList} />
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { EmblaOptionsType } from "embla-carousel";
import "../../components/carousel/EmblaCarousel.css";
import { EmblaCarousel } from "../../components/carousel/EmblaCarousel";
import { Header } from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlagCheckered,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { ClubList } from "../../components/list/ClubList";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { clubListAtom } from "../../store/atom";
import { ClubType } from "../../types/clubType";
import { getBannerImg } from "../../util/utils";

export const Home = () => {
  const navigate = useNavigate();
  const items = [
    {
      desc: getBannerImg(1),
    },
    {
      desc: getBannerImg(2),
    },
    {
      desc: getBannerImg(3),
    },
  ];
  const OPTIONS: EmblaOptionsType = { align: "center", loop: true };
  const logo = "Same Same";
  const clubListAll = useRecoilValue(clubListAtom);
  const [clubList, setClubList] = useState<ClubType[]>();

  const more = () => {
    navigate('/list');
  }

  useEffect(() => {
    setClubList(clubListAll);
  }, []);

  return (
    <div className={styles.inner}>
      <Header txt={logo} align="start" />
      <div className={styles.bannerWrap}>
        <div className={styles.banner}>
          <EmblaCarousel slides={items} options={OPTIONS} />
        </div>
      </div>
      <div className={styles.navwrap}>
        <div className={styles.navItem}>
          <FontAwesomeIcon icon={faFlagCheckered} />
          <span onClick={() => navigate('/add')}>동아리 추가</span>
        </div>
        <div className={styles.navItem}>
          <FontAwesomeIcon icon={faCalendar} />
          <span onClick={() => navigate('/mypage')}>동아리 일정</span>
        </div>
        <div className={styles.navItem}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span onClick={() => navigate('/list')}>동아리 검색</span>
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.header}>
          <span id={styles.rec}>추천동아리</span>
          <span id={styles.lot} onClick={more}>더보기</span>
        </div>
        <ClubList list={clubList} />
      </div>
    </div>
  );
};

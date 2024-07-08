import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { myData } from "../../store/atom";
import { getMy } from "../../util/api/userApi";
import { removeCookie } from "../../util/cookie";
import styles from "./MyPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../types/userType";
import { MyClubItem } from "../../components/item/MyClubItem";
import { getMyClubList } from "../../util/api/clubApi";

export const Authentication = () => {
  const [myInfo, setMyInfo] = useRecoilState<User>(myData);
  const [userBirth, setUserBirth] = useState<string>("00-00-00");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myClubList, setMyClubList] = useState([]);

  useEffect(() => {
    getMy()
      .then((res) => {
        setMyInfo(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    getMyClubList()
      .then((res) => {
        setMyClubList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      removeCookie("Authorization", { path: "/" });
      window.location.replace("/");
    }
  };

  const getBirth = (birth: Date | string): string => {
    const day = new Date(birth);
    let year = day.getFullYear().toString().substring(2, 4);
    let month = (day.getMonth() + 1).toString();
    month = month.length === 1 ? "0" + month : month;
    let date = day.getDate().toString();
    date = date.length === 1 ? "0" + date : date;
    return `${year}.${month}.${date}`;
  };

  const getMajor = (major: string): string => {
    return major === "sw"
      ? "소프트웨어개발과"
      : major === "ai"
      ? "인공지능개발과"
      : "게임개발과";
  };

  const getTel = (tel: string): string => {
    return `${tel.substring(0, 3)}-${tel.substring(3, 7)}-${tel.substring(
      7,
      11
    )}`;
  };

  useEffect(() => {
    if (!isLoading) {
      const birth = getBirth(myInfo.user_birth);
      setUserBirth(birth);
    }
  }, [myInfo.user_birth, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.auth}>
      <div className={styles.authHeader}>
        <div
          className={`${styles.authImg} ${
            myInfo.major === "ai" ? "aiImg" : ""
          }`}
          style={{
            backgroundImage: `url('${process.env.PUBLIC_URL}/img/${myInfo.major}.png')`,
          }}
        />
        <span id={styles.authName}>
          <span>{myInfo.user_name}</span>
          <span id={styles.logout} onClick={logout}>
            로그아웃
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>
        </span>
      </div>
      <div className={styles.userInfo}>
        <table>
          <tr>
            <td id={styles.th}>생년월일</td>
            <td>{userBirth}</td>
          </tr>
          <tr>
            <td id={styles.th}>전공</td>
            <td>{getMajor(myInfo.major)}</td>
          </tr>
          <tr>
            <td id={styles.th}>연락처</td>
            <td>{getTel(myInfo.user_tel)}</td>
          </tr>
        </table>
      </div>
      <div className={styles.authLine}>
        <div className={styles.hr} />
      </div>
      <div className={styles.body}>
        <span className={styles.title}>내 동아리</span>
        <div className={styles.list}>
          {myClubList.map((ele, idx) => (
            <MyClubItem key={`myclub-${idx}`} item={ele} />
          ))}
        </div>
      </div>
    </div>
  );
};

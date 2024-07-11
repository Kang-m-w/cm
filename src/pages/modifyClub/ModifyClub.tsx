import React, { useEffect, useState } from "react";
import styles from "./ModifyClub.module.css";
import { Header } from "../../components/header/Header";
import { Input } from "../../components/form/Input";
import { Button } from "../../components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { getClubById, updateClub } from "../../util/api/clubApi";
import { ClubType } from "../../types/clubType";
import { notifyError, notifySuccess } from "../../util/utils";

export const ModifyClub = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clubName, setClubName] = useState<string>();
  const [clubTeather, setClubTeacher] = useState<string>();
  const [clubMaster, setClubMaster] = useState<string>();
  const [clubDesc, setClubDesc] = useState<string>();
  const [stDate, setStDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [check, setCheck] = useState(false);
  const [base, setBase] = useState<ClubType>();
  const [loading, setLoading] = useState(true);

  const toggleCheck = () => {
    setCheck(!check);
  };

  useEffect(() => {
    getClubById(id!)
      .then((res) => {
        setBase(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const modify = () => {
    updateClub(id!, {
      club_name: clubName!,
      club_master: clubMaster!,
      description: clubDesc!,
      teacher: clubTeather!,
      st_date: stDate ? new Date(stDate) : 'n',
      end_date: endDate ? new Date(endDate) : 'n',
    }).then((res) => {
      notifySuccess('수정에 성공하였습니다');
      navigate('/');
      window.location.reload();
    }).catch((err) => {
      notifyError('다시 시도해주세요');
    })
  };

  if (loading) {
    return <>Loading..</>
  }

  return (
    <div className={styles.inner}>
      <div className={styles.header}>
        <Header txt="동아리 수정" align="center" />
      </div>
      <div className={styles.body}>
        <div className={styles.form}>
          <Input
            type="text"
            label="동아리 이름"
            id="club_name"
            setEnter={setClubName}
            value={base?.club_name}
          />
          <Input
            type="text"
            label="담당 선생님"
            id="club_teacher"
            setEnter={setClubTeacher}
            value={base?.teacher}
          />
          <Input
            type="text"
            label="부장 이름"
            id="club_master"
            setEnter={setClubMaster}
            value={base?.club_master}
          />
          <div className={`${styles.input} ${styles.desc}`}>
            <label>동아리 설명</label>
            <textarea
              defaultValue={base?.description}
              onChange={(e) => {
                setClubDesc(e.target.value);
              }}
            />
          </div>
          <div className={styles.input}>
            <label>모집 여부</label>
            <label className={styles.switch}>
              <input role="switch" type="checkbox" onClick={toggleCheck} />
            </label>
          </div>
          <div
            className={styles.available}
            style={{
              display: check ? "block" : "none",
            }}
          >
            <div className={styles.input}>
              <label>모집 기간</label>
              <div className={styles.date}>
                <input
                  type="date"
                  onChange={(e) => {
                    setStDate(e.target.value);
                  }}
                  />
                <span>~</span>
                <input
                  type="date"
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                  />
              </div>
            </div>
          </div>
          <div className={styles.btnWrap}>
            <div className={styles.btn}>
              <Button onClick={modify} txt="수정" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import styles from "./AddClub.module.css";
import { Header } from "../../components/header/Header";
import { Input } from "../../components/form/Input";
import { Button } from "../../components/button/Button";
import { createClub } from "../../util/api/clubApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AddClub = () => {
  const navigate = useNavigate();
  const [clubType, setClubType] = useState("major");
  const [clubName, setClubName] = useState();
  const [clubTeather, setClubTeacher] = useState();
  const [clubMaster, setClubMaster] = useState();
  const [clubDesc, setClubDesc] = useState<string>();
  const [clubPoster, setClubPoster] = useState<any>();

  const submit = () => {
    let formData = new FormData();
    formData.append("club_name", clubName!);
    formData.append("club_master", clubMaster!);
    formData.append("classification", clubType!);
    formData.append("club_poster", clubPoster!);
    formData.append("description", clubDesc!);
    formData.append("teacher", clubTeather!);

    createClub(formData).then((res) => {
      notifySuccess('동아리를 추가하였습니다')
      navigate('/');
    })
  };

  const notifySuccess = (txt: string) => {
    toast.success(txt, {
      autoClose: 1500,
      position: "top-center",
      hideProgressBar: true,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  return (
    <div className={styles.inner}>
      <div className={styles.header}>
        <Header txt="동아리 추가" align="center" />
      </div>
      <div className={styles.body}>
        <div className={styles.form}>
          <div className={styles.input}>
            <label>동아리 종류</label>
            <select
              onChange={(e: any) => {
                setClubType(e.target.value);
              }}
            >
              <option value="major">전공 동아리</option>
              <option value="free">자율 동아리</option>
            </select>
          </div>
          <Input
            type="text"
            label="동아리 이름"
            id="club_name"
            setEnter={setClubName}
          />
          <Input
            type="text"
            label="담당 선생님"
            id="club_teacher"
            setEnter={setClubTeacher}
          />
          <Input
            type="text"
            label="부장 이름"
            id="club_master"
            setEnter={setClubMaster}
          />
          <div className={`${styles.input} ${styles.desc}`}>
            <label>동아리 설명</label>
            <textarea
              onChange={(e) => {
                setClubDesc(e.target.value);
              }}
            />
          </div>
          <div className={`${styles.input} ${styles.poster}`}>
            <label>동아리 포스터</label>
            <input
              type="file"
              onChange={(e) => {
                setClubPoster(e.target.files![0]);
              }}
            />
          </div>
          <div className={styles.btnWrap}>
            <div className={styles.btn}>
              <Button onClick={submit} txt="+" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

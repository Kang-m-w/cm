import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Nav } from "./components/navbar/Nav";
import { List } from "./pages/list/List";
import { Login } from "./pages/login/Login";
import { MyPage } from "./pages/mypage/MyPage";
import { Flip, ToastContainer } from "react-toastify";
import { getClubListAll } from "./util/api/clubApi";
import { useSetRecoilState } from "recoil";
import { clubListAtom } from "./store/atom";
import { Club } from "./pages/club/Club";
import { AddClub } from "./pages/addClub/AddClub";
import { ModifyClub } from "./pages/modifyClub/ModifyClub";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setClubList = useSetRecoilState(clubListAtom);

  useEffect(() => {
    getClubListAll()
      .then((res) => {
        setClubList(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <div>is Loading..</div>;
  }

  return (
    <div className="App">
      <div className="inner">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/club/:id" element={<Club />} />
          <Route path="/add" element={<AddClub />} />
          <Route path="/modify/:id" element={<ModifyClub />} />
        </Routes>
      </div>
      <Nav />
      <ToastContainer limit={1} transition={Flip} />
    </div>
  );
};

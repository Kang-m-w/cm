import axios from "axios";
import { getCookie } from "../cookie";

export const createClub = async (data: FormData) => {
  const res = await axios.post(`/api/club`, data, {
    headers: {
      Authorization: `Bearer ${getCookie("Authorization")}`,
    },
  });

  return res.data;
};

export const getClubListAll = async () => {
  const res = await axios.get(`/api/club/all`);
  return res.data;
};

export const getClubListByTag = async (tag: string) => {
  const res = await axios.get(`/api/club/all/${tag}`);
  return res.data;
};

export const getClubById = async (id: string) => {
  const res = await axios.get(`/api/club/${id}`);
  return res.data;
};

export const getMyClubList = async () => {
  const res = await axios.get(`/api/affiliation`, {
    headers: {
      Authorization: `Bearer ${getCookie("Authorization")}`,
    },
  });

  return res.data;
};

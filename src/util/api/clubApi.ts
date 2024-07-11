import axios from "axios";
import { getCookie } from "../cookie";
import { UpdateClubType } from "../../types/clubType";

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

export const updateClub = async (
  clubId: string,
  updateClubData: UpdateClubType
) => {
  const res = await axios.patch(`/api/club/${clubId}`, updateClubData, {
    headers: {
      Authorization: `Bearer ${getCookie("Authorization")}`,
    },
  });
  return res;
};

export const joinClub = async (userId: string, clubId: string) => {
  const res = await axios.post(
    `/api/affiliation`,
    { user_id: userId, club_id: clubId },
    {
      headers: {
        Authorization: `Bearer ${getCookie("Authorization")}`,
      },
    }
  );
  return res;
};

export const getClubImg = async (clubId: string) => {
  const res = await axios.get("/api/club/img/" + clubId);
  return res.data;
};

export const searchClub = async (search: string) => {
  const res = await axios.get(`/api/club/search?search=${search}`);
  return res.data;
}
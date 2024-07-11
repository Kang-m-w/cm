import axios from "axios";
import { getCookie } from "../cookie";
import { LoginUser, User } from "../../types/userType";

export const login = async (data: LoginUser) => {
  const res = await axios.post(`/api/auth/login`, data);
  return res.data;
};

export const createUser = async (data: User) => {
  const res = await axios.post(`/api/auth/register`, data);
  return res.data;
};

export const getMy = async () => {
  const res = await axios.get("/api/user/me", {
    headers: {
      Authorization: `${getCookie("Authorization")}`,
    },
  });

  return res;
};

export const getMyId = async () => {
  const res = await axios.get(`/api/auth/getid`, {
    headers: {
      Authorization: `${getCookie("Authorization")}`,
    },
  });

  return res;
};

export const checkValidId = async (id: string) => {
  const res = await axios.post(`/api/auth/checkid/${id}`);
  
  return res;
}
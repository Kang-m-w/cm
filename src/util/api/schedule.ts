import axios from "axios";
import { getCookie } from "../cookie";
import { ScheduleType } from "../../types/scheduleType";

export const createSchedule = async (data: ScheduleType) => {
  const res = await axios.post(`/api/schedule`, data, {
    headers: {
      Authorization: `${getCookie("Authorization")}`,
    },
  });
  return res;
};

export const getClubScheduleList = async (clubId: string) => {
  const res = await axios.get(`/api/schedule/${clubId}`);
  return res.data;
}
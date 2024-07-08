import { atom } from "recoil";
import { User } from "../types/userType";
import { ClubType } from "../types/clubType";

export const toggleLoginModalState = atom({
  key: "toggleLoginModal",
  default: false,
});

export const toggleSignModalState = atom({
  key: "toggleSignModal",
  default: false,
});

export const myData = atom({
  key: "myData",
  default: {} as User,
});

export const clubListAtom = atom({
  key: "clubListAtom",
  default: [] as ClubType[],
});

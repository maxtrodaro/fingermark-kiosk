import { atom } from "recoil";

export const logsState = atom({
  key: "logsState",
  default: null,
});

export const logsFilterState = atom({
  key: "logsFilterState",
  default: [],
});

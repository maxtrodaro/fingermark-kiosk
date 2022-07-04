import { selector, selectorFamily } from "recoil";

import api from "../../services/api";
import { logsFilterState } from "../atoms/logs";

export const logsMap = selector({
  key: "logsMap",
  get: async () => {
    const response = await api.get("/log");

    return response.data;
  },
  set: ({ set }, state) => set(logsFilterState, state),
});

export const logsMapFamily = selectorFamily({
  key: "logsMapFamily",
  get: (logData) => async () => {
    const response = await api.post("/log", logData);

    return response;
  },
});

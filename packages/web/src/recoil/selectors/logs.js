import { selector } from "recoil";

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

import { selector } from "recoil";

import api from "../../services/api";
import { kiosksFilterState } from "../atoms/kiosks";

export const kiosksMap = selector({
  key: "kiosksMap",
  get: async () => {
    const response = await api.get("/kiosk");

    return response.data;
  },
  set: ({ set }, state) => set(kiosksFilterState, state),
});

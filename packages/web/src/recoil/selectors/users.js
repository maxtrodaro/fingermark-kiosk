import { selector } from "recoil";

import api from "../../services/api";

export const usersMap = selector({
  key: "usersMap",
  get: async () => {
    const response = await api.get("/user");

    return response.data;
  },
});

import { selector } from "recoil";

import api from "../../services/api";
import { usersState } from "../atoms/users";

export const usersMap = selector({
  key: "usersMap",
  get: async ({ get }) => {
    const _usersState = get(usersState);

    console.log("testeGodoy", _usersState);

    const response = await api.get("/user");

    console.log("GODOY", response);

    return response.data;
  },
});

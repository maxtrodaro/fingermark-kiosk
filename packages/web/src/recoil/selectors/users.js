import { selector } from "recoil";

import api from "../../services/api";
import { usersList } from "../atoms/users";

export const usersMap = selector({
  key: "usersMap",
  get: async ({ get }) => {
    const _usersList = get(usersList);

    console.log("testeGodoy", _usersList);

    const response = await api.get("/user");

    console.log("GODOY", response);

    return response.data;
  },
});

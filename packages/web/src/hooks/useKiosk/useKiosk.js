import { useCallback } from "react";
import { useRecoilState } from "recoil";

import { usersState } from "../../recoil/atoms/users";

export default () => {
  const [, setUser] = useRecoilState(usersState);

  const handleSignin = useCallback(
    (data) => {
      setUser(data);
    },
    [setUser]
  );

  return {
    handleSignin,
  };
};

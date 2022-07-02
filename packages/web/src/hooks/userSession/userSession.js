import { useCallback } from "react";
import { useRecoilState } from "recoil";

import { usersState } from "../../recoil/atoms/users";

export default () => {
  const [, setUser] = useRecoilState(usersState);

  const handleSignin = useCallback(
    (data) => {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    },
    [setUser]
  );

  const handleSignout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, [setUser]);

  return {
    handleSignin,
    handleSignout,
  };
};

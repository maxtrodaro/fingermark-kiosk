/* eslint-disable import/no-anonymous-default-export */
import { useCallback } from "react";
import { useRecoilState } from "recoil";
// import { sessionServices } from "../services/sessao";
import { sessionState } from "../../recoil/atoms/session";
// import { usersMap } from "../../recoil/selectors/users";

export default () => {
  const [session, setSession] = useRecoilState(sessionState);

  // const { _pegarUsuario } = sessionServices();

  const handleSignin = useCallback(
    (data) => {
      setSession(data);
    },
    [setSession]
  );

  const handleSignout = useCallback(() => {
    setSession(null);
    // localStorage.removeItem("aulaRecoil.token");
  }, [setSession]);

  return {
    session,
    handleSignin,
    handleSignout,
  };
};

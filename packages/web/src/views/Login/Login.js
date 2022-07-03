import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { Field } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Label, Header, Modal } from "@maxtrodaro/common";

import api from "../../services/api";
import { usersMap } from "../../recoil/selectors/users";
import { userSession } from "../../hooks/userSession";

export const LoginPage = () => {
  const usersSelector = useRecoilValue(usersMap);
  const { handleSignin, handleSignout } = userSession();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values) => {
      await api
        .get(`/user/${values.user}`)
        .then(({ data }) => {
          handleSignin(data);
          navigate("/home");
        })
        .catch((err) => console.error("err", err));
    },
    [handleSignin]
  );

  return (
    <>
      <Header handleSignout={handleSignout} />
      <Modal
        title="Select any user"
        initialValues={{}}
        onSubmit={(values) => handleSubmit(values)}
      >
        <div className="relative p-6 flex-auto">
          {usersSelector.map((user) => {
            return (
              <div key={user.id} className="form-check">
                <Field
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="user"
                  value={user.id}
                  id={user.id}
                />
                <Label for="user">{user.name}</Label>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <Button type="submit">Login</Button>
        </div>
      </Modal>
    </>
  );
};

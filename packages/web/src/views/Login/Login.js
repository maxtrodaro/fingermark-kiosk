import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Label, Header } from "@maxtrodaro/common";

import api from "../../services/api";
import { usersMap } from "../../recoil/selectors/users";
import { userSession } from "../../hooks/userSession/index";

export const LoginPage = () => {
  const usersSelector = useRecoilValue(usersMap);
  const { handleSignin } = userSession();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values) => {
      await api
        .get(`/user/${values.user}`)
        .then(({ data }) => {
          handleSignin(data);
          navigate("/home");
        })
        .catch((err) => console.log("err", err));
    },
    [handleSignin]
  );

  return (
    <>
      <Header />
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-2xl">
          <div className="border-0 rounded-lg shadow-[0_0_20px_10px_rgba(0,0,0,0.3)] relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold">Select any user</h3>
            </div>
            <Formik
              initialValues={{}}
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form>
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
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

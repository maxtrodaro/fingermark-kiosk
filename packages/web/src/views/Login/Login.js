import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Formik, Form, Field } from "formik";
import { Button, Label, Header } from "@maxtrodaro/common";

import { usersList } from "../../recoil/atoms/users";
import { usersMap } from "../../recoil/selectors/users";

export const LoginPage = () => {
  const usersAtom = useRecoilValue(usersList);
  const usersSelector = useRecoilValue(usersMap);

  console.log("usersAtom", usersAtom);
  console.log("usersSelector", usersSelector);

  const handleSubmit = (values) => {
    console.log("values12", values);
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-2xl">
          <div className="border-0 rounded-lg shadow-[0_0_20px_10px_rgba(0,0,0,0.3)] relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold">Selecione um usuário</h3>
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
                  <Button type="submit">Entrar</Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

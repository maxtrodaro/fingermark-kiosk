import React from "react";
import { Formik, Form } from "formik";

const Modal = ({ bodyText, initialValues, onSubmit, title, children }) => {
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-full my-6 mx-auto max-w-2xl">
        <div className="border-0 rounded-lg shadow-[0_0_20px_10px_rgba(0,0,0,0.3)] relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold">{title}</h3>
          </div>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
              {bodyText ? (
                <div className="relative p-6 flex-auto">
                  <p className="text-primary font-bold text-lg mt-0 mb-2 font-sans">
                    {bodyText}
                  </p>
                </div>
              ) : null}
              {children}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Modal;

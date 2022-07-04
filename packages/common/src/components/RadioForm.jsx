import React from "react";
import { Field } from "formik";
import Label from "./Label";

const RadioForm = ({ name, title, label1, label2 }) => {
  return (
    <>
      <p className="mb-2">{title}</p>
      <fieldset className="flex items-center mb-4 gap-4" role="group">
        <div className="radio-item flex items-center gap-2">
          <Field type="radio" name={name} value={label1} id={label1} />
          <Label htmlFor={name}>{label1}</Label>
        </div>
        <div className="radio-item flex items-center gap-2">
          <Field type="radio" name={name} value={label2} id={label2} />
          <Label htmlFor={name}>{label2}</Label>
        </div>
      </fieldset>
    </>
  );
};

export default RadioForm;

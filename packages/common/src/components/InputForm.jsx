import React from "react";
import { Field } from "formik";

const InputForm = (props) => {
  return (
    <fieldset className="flex flex-col gap-2 mb-4">
      <label>{props.label}</label>
      <Field
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
      />
    </fieldset>
  );
};

export default InputForm;

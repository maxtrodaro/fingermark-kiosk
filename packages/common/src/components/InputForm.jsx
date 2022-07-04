import React from "react";
import { Field } from "formik";

const InputForm = ({ className, disabled, label, name, placeholder, type }) => {
  return (
    <fieldset className="flex flex-col gap-2 mb-4">
      <label>{label}</label>
      <Field
        className={className}
        disabled={disabled}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </fieldset>
  );
};

export default InputForm;

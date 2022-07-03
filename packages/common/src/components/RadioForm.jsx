import React from "react";
import { Field } from "formik";
import Label from "./Label";

const RadioForm = (props) => {
  return (
    <>
      <p className="mb-2">{props.title}</p>
      <fieldset className="flex items-center mb-4 gap-4" role="group">
        <div className="radio-item flex items-center gap-2">
          <Field
            type="radio"
            name={props.name}
            value={props.label1}
            id={props.label1}
          />
          <Label for={props.name}>{props.label1}</Label>
        </div>
        <div className="radio-item flex items-center gap-2">
          <Field
            type="radio"
            name={props.name}
            value={props.label2}
            id={props.label2}
          />
          <Label for={props.name}>{props.label2}</Label>
        </div>
      </fieldset>
    </>
  );
};

export default RadioForm;

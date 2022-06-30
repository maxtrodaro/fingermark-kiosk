import React from "react";

const Label = (props) => {
  return (
    <label
      className="form-check-label inline-block text-gray-800"
      htmlFor={props.for}
    >
      {props.children}
    </label>
  );
};

export default Label;

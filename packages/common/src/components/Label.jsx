import React from "react";

const Label = ({ htmlFor, children }) => {
  return (
    <label
      className="form-check-label inline-block text-gray-800"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;

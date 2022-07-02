import React from "react";

const Button = (props) => {
  return (
    <button
      type={props.type}
      className="bg-primary text-white font-bold py-2 px-4 rounded-full"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;

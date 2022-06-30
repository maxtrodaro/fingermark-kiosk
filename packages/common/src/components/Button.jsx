import React from "react";

const Button = (props) => {
  return (
    <button
      type={props.type}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    >
      {props.children}
    </button>
  );
};

export default Button;

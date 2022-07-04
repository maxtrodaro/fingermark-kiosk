import React from "react";

const Button = ({ onClick, type, children }) => {
  return (
    <button
      type={type}
      className="bg-primary text-white font-bold py-2 px-4 rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

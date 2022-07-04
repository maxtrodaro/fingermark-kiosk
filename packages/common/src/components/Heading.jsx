import React from "react";

const Heading = ({ children }) => {
  return (
    <h2 className="text-primary font-bold text-4xl mt-0 mb-2 font-serif">
      {children}
    </h2>
  );
};

export default Heading;

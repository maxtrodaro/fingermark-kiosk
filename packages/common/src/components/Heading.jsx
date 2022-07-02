import React from "react";

const Heading = (props) => {
  return (
    <h1 className="text-primary font-bold text-4xl mt-0 mb-2 font-serif px-4">
      {props.children}
    </h1>
  );
};

export default Heading;

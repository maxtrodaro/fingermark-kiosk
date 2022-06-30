import React from "react";

const Heading = (props) => {
  return (
    <h1 className="text-primary font-bold text-5xl mt-0 mb-2 font-serif">
      {props.children}
    </h1>
  );
};

export default Heading;

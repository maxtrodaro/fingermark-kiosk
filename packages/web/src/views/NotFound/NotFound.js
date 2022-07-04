import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <h1>Not Found</h1>
      <Link to="/home">Back to home</Link>
    </>
  );
};

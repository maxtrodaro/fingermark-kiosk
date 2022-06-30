import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../views/Home";
import Login from "../views/Login";
import NotFound from "../views/NotFound";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;

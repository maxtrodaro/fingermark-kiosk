import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../views/Home";
import Login from "../views/Login";
import Log from "../views/Log";
import Kiosk from "../views/Kiosk";
import NotFound from "../views/NotFound";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/log" element={<Log />} />
      <Route path="/kiosk" element={<Kiosk />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;

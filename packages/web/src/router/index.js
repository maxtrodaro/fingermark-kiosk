import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loading } from "@maxtrodaro/common";

import Home from "../views/Home";
import Login from "../views/Login";
import Log from "../views/Log";
import Kiosk from "../views/Kiosk";
import NotFound from "../views/NotFound";

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/log" element={<Log />} />
        <Route path="/log/:kioskId" element={<Log />} />
        <Route path="/kiosk" element={<Kiosk />} />
        <Route path="/kiosk/:kioskId" element={<Kiosk />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default Router;

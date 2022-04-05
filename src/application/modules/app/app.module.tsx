import { useEffect } from "react";
import { Outlet, Routes, BrowserRouter } from "react-router-dom";

import { getRoutes, routes } from "../../configuration/routes";

const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE || "Portal";
const VITE_APP_VERSION = import.meta.env.VITE_APP_VERSION || 1.0;

function AppModule() {
  useEffect(() => {});

  return (
    <>
      <BrowserRouter>
        <Outlet />
        <Routes>{getRoutes(routes)}</Routes>
      </BrowserRouter>
    </>
  );
}

export default AppModule;

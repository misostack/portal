import { Outlet, Routes, BrowserRouter } from "react-router-dom";

import { getRoutes, routes } from "../../configuration/routes";
import { AppProvider } from "./app.provider";

function AppModule() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Outlet />
        <Routes>{getRoutes(routes)}</Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default AppModule;

import ApplicationRoutes, { RouteConfig } from "../../configuration/routes";
import { authService } from "../auth/auth.module";
import { AppProvider } from "./app.provider";

const ROUTE_CONFIG: RouteConfig = {
  canAccessPublicZone: authService.canAccessPublicZone,
  canAccessPrivateZone: authService.canAccessPrivateZone,
};

function AppModule() {
  return <AppProvider>{ApplicationRoutes(ROUTE_CONFIG)}</AppProvider>;
}

export default AppModule;

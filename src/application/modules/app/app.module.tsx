import config from "../../configuration";
import ApplicationRoutes from "../../configuration/routes";
import { AppProvider } from "./app.provider";

function AppModule() {
  return <AppProvider>{ApplicationRoutes(config.routeConfig)}</AppProvider>;
}

export default AppModule;

import ApplicationRoutes from "../../configuration/routes";
import { AppProvider } from "./app.provider";

function AppModule() {
  return (
    <AppProvider>
      <ApplicationRoutes />
    </AppProvider>
  );
}

export default AppModule;

import { authService } from "../modules/auth/auth.module";
import { RouteConfig } from "./routes";

const SUPPORTED_LANGUAGES = (
  import.meta.env.VITE_SUPPORTED_LANGUAGES || "en,vi"
).toString();
const DEFAULT_LANGUAGE = (
  import.meta.env.VITE_DEFAULT_LANGUAGE || "vi"
).toString();
const ROUTE_CONFIG: RouteConfig = {
  canAccessPublicZone: authService.canAccessPublicZone,
  canAccessPrivateZone: authService.canAccessPrivateZone,
};
const config = {
  supportedLanguages: SUPPORTED_LANGUAGES.split(","),
  defaultLanguage: DEFAULT_LANGUAGE,
  routeConfig: ROUTE_CONFIG,
};

export default config;

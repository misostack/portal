import {
  AuthAdapter,
  IRouteGuard,
  RouteZoneCheckType,
} from "../../../configuration/routes";

class AuthService implements AuthAdapter {
  private static instance: AuthService;
  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  canAccessPrivateZone(params: IRouteGuard): RouteZoneCheckType {
    return {
      isAllowed: false,
      redirectUrl: "/auth",
    };
  }
  canAccessPublicZone(): RouteZoneCheckType {
    return {
      isAllowed: true,
      redirectUrl: "",
    };
  }
}

export default AuthService.getInstance();

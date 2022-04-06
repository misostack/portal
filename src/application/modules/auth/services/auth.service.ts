import {
  AuthAdapter,
  Permission,
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

  canAccessPrivateZone(permissions: Array<Permission>): RouteZoneCheckType {
    return {
      isAllowed: true,
      redirectUrl: "/auth",
    };
  }
  canAccessPublicZone(): RouteZoneCheckType {
    return {
      isAllowed: false,
      redirectUrl: "/",
    };
  }
}

export default AuthService.getInstance();

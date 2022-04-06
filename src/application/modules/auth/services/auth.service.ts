import {
  AuthAdapter,
  Permission,
  RouteZoneCheckType,
} from "../../../configuration/routes";

class AuthService implements AuthAdapter {
  private static instance: AuthService;
  private constructor() {
    this.canAccessPrivateZone = this.canAccessPrivateZone.bind(this);
    this.canAccessPublicZone = this.canAccessPublicZone.bind(this);
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  login() {
    setTimeout(() => {
      console.log("login");
      localStorage.setItem("user", "1");
    }, 2000);
  }

  logout() {
    setTimeout(() => {
      console.log("logout");
      localStorage.clear();
    }, 2000);
  }

  isLogged(): boolean {
    if (localStorage.getItem("user")) {
      return true;
    }
    return false;
  }

  canAccessPrivateZone(permissions: Array<Permission>): RouteZoneCheckType {
    return {
      isAllowed: this.isLogged(),
      redirectUrl: "/auth",
    };
  }
  canAccessPublicZone(): RouteZoneCheckType {
    return {
      isAllowed: !this.isLogged(),
      redirectUrl: "/",
    };
  }
}

export default AuthService.getInstance();

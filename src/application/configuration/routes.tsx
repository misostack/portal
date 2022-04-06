import React, { ReactElement } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import config from ".";
import {
  AppAction,
  AppActions,
  getAppContext,
} from "../modules/app/app.provider";

export type Permission = string;
export type Guard = () => boolean;
export interface IRoute {
  path: string;
  childrens?: Array<IRoute>;
  component: ReactElement;
  // all zones are private by default
  public?: boolean;
  // can have custom guards
  guards?: Array<Guard>;
  // by default private zone will be protected with permissions
  permissions?: Array<Permission>;
}

export type RouteZoneCheckType = {
  isAllowed: boolean;
  redirectUrl: string;
};

export interface RouteConfig {
  canAccessPrivateZone: (permissions: Array<Permission>) => RouteZoneCheckType;
  canAccessPublicZone: () => RouteZoneCheckType;
}

export interface AuthAdapter {
  canAccessPrivateZone(permissions: Array<Permission>): RouteZoneCheckType;
  canAccessPublicZone(): RouteZoneCheckType;
}

const AuthContainer = () => {
  return (
    <>
      <h1>Auth Container</h1>
      <Outlet />
    </>
  );
};

const AuthLogin = () => {
  return <div>login page</div>;
};

const ForgotPassword = () => {
  return <div>Forgot password page</div>;
};

const AuthRoutes: Array<IRoute> = [
  {
    path: "auth",
    component: <AuthContainer />,
    public: true,
    childrens: [
      { path: "login", component: <AuthLogin />, public: true },
      { path: "forgot-password", component: <ForgotPassword />, public: true },
      { path: "", component: <AuthLogin />, public: true },
    ],
  },
];

// dashboard handlers
const onChangeLanguage = (
  language: string,
  dispatch?: React.Dispatch<AppAction>
) => {
  dispatch && AppActions.switchLanguage(dispatch, language);
};

const DashboardContainer = () => {
  const [state, dispatch] = getAppContext();

  return (
    <>
      <h1>Dashboard Container {state.language}</h1>
      {config.supportedLanguages.map(
        (l) =>
          state.language !== l && (
            <button key={l} onClick={() => onChangeLanguage(l, dispatch)}>
              {l}
            </button>
          )
      )}

      <Outlet />
    </>
  );
};

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard page</h1>
    </>
  );
};

const DashboardRoutes: Array<IRoute> = [
  {
    path: "",
    component: <DashboardContainer />,
    permissions: [],
    childrens: [
      {
        path: "",
        component: <Dashboard />,
        permissions: [],
      },
    ],
  },
];

const ProtectedRoute = ({
  children,
  config,
  guards,
  permissions,
}: {
  children: JSX.Element;
  config: RouteConfig;
  guards?: Array<Guard>;
  permissions?: Array<Permission>;
}) => {
  let location = useLocation();
  const { canAccessPrivateZone } = config;
  const { isAllowed, redirectUrl } = canAccessPrivateZone(permissions || []);
  if (isAllowed) {
    return children;
  }
  // otherwise
  return <Navigate to={redirectUrl} state={{ from: location }} replace />;
};

const PublicRoute = ({
  children,
  config,
  guards,
}: {
  children: JSX.Element;
  config: RouteConfig;
  guards: Array<Guard>;
}) => {
  let location = useLocation();
  const { canAccessPublicZone } = config;
  const { isAllowed, redirectUrl } = canAccessPublicZone();
  if (isAllowed) {
    return children;
  }
  // otherwise
  return <Navigate to={redirectUrl} state={{ from: location }} replace />;
};

const buildRouteGuard = (route: IRoute, config: RouteConfig): JSX.Element => {
  if (route.public) {
    return (
      <PublicRoute config={config} guards={route.guards || []}>
        {route.component}
      </PublicRoute>
    );
  }
  return (
    <ProtectedRoute
      config={config}
      guards={route.guards || []}
      permissions={route.permissions || []}
    >
      {route.component}
    </ProtectedRoute>
  );
};

const buildRoute = (
  route: IRoute,
  config: RouteConfig,
  index: number
): ReactElement => {
  const { path, childrens } = route;

  if (childrens && childrens.length > 0) {
    return (
      <Route key={index} path={path} element={buildRouteGuard(route, config)}>
        {getRoutes(childrens, config, index)}
      </Route>
    );
  }

  return (
    <Route key={index} path={path} element={buildRouteGuard(route, config)} />
  );
};
const getRoutes = (
  allRoutes: Array<IRoute>,
  config: RouteConfig,
  parent: number = -1
): Array<ReactElement> =>
  allRoutes.map((route: IRoute, index) => {
    const routeIndex = parent > -1 ? parent * 10 + index : index;
    return buildRoute(route, config, routeIndex);
  });

const routes = [...AuthRoutes, ...DashboardRoutes];

const ApplicationRoutes = (config: RouteConfig) => {
  return (
    <BrowserRouter>
      <Outlet />
      <Routes>{getRoutes(routes, config)}</Routes>
    </BrowserRouter>
  );
};

export default ApplicationRoutes;

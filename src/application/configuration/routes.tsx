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

export interface IRoute {
  path: string;
  childrens?: Array<IRoute>;
  component: ReactElement;
  guard?: IRouteGuard;
}

export interface IRouteGuard {
  permissions: Array<Permission>;
}

export type RouteZoneCheckType = {
  isAllowed: boolean;
  redirectUrl: string;
};

export interface RouteConfig {
  canAccessPrivateZone: (params: IRouteGuard) => RouteZoneCheckType;
  canAccessPublicZone: () => RouteZoneCheckType;
}

export interface AuthAdapter {
  canAccessPrivateZone(params: IRouteGuard): RouteZoneCheckType;
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
    childrens: [
      { path: "login", component: <AuthLogin /> },
      { path: "forgot-password", component: <ForgotPassword /> },
      { path: "", component: <AuthLogin /> },
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
    guard: {
      permissions: ["private"],
    },
    childrens: [
      {
        path: "",
        component: <Dashboard />,
        guard: {
          permissions: ["private"],
        },
      },
    ],
  },
];

const ProtectedRoute = ({
  children,
  guard,
  config,
}: {
  children: JSX.Element;
  guard: IRouteGuard;
  config: RouteConfig;
}) => {
  let location = useLocation();
  const { canAccessPrivateZone } = config;
  const { isAllowed, redirectUrl } = canAccessPrivateZone(guard);
  if (isAllowed) {
    return children;
  }
  // otherwise
  return <Navigate to={redirectUrl} state={{ from: location }} replace />;
};

const PublicRoute = ({
  children,
  config,
}: {
  children: JSX.Element;
  config: RouteConfig;
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
  if (!route.guard) {
    return <PublicRoute config={config}>{route.component}</PublicRoute>;
  }
  return (
    <ProtectedRoute guard={route.guard} config={config}>
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

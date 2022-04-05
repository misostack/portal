import { ReactElement } from "react";
import { Outlet, Route, useLocation } from "react-router-dom";

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

const DashboardContainer = () => {
  return (
    <>
      <h1>Dashboard Container</h1>
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
}: {
  children: JSX.Element;
  guard: IRouteGuard;
}) => {
  let location = useLocation();
  // const [appState] = useAppControllerProvider();
  // const { user } = appState;
  // if (!user) {
  //   return <Navigate to="/auth" state={{ from: location }} replace />;
  // }

  return children;
};

const PublicRoute = ({
  children,
  guard,
}: {
  children: JSX.Element;
  guard: IRouteGuard;
}) => {
  let location = useLocation();
  // const [appState] = useAppControllerProvider();
  // const { user } = appState;

  // if (user) {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }

  return children;
};

const buildRouteGuard = (route: IRoute): JSX.Element => {
  if (!route.guard) {
    return (
      <PublicRoute guard={{ permissions: ["public"] }}>
        {route.component}
      </PublicRoute>
    );
  }
  return <ProtectedRoute guard={route.guard}>{route.component}</ProtectedRoute>;
};

const buildRoute = (route: IRoute, index: number): ReactElement => {
  const { path, childrens } = route;

  if (childrens && childrens.length > 0) {
    return (
      <Route key={index} path={path} element={buildRouteGuard(route)}>
        {getRoutes(childrens, index)}
      </Route>
    );
  }

  return <Route key={index} path={path} element={buildRouteGuard(route)} />;
};
const getRoutes = (
  allRoutes: Array<IRoute>,
  parent: number = -1
): Array<ReactElement> =>
  allRoutes.map((route: IRoute, index) => {
    // if (route.collapse) {
    //   return getRoutes(route.collapse);
    // }
    const routeIndex = parent > -1 ? parent * 10 + index : index;
    return buildRoute(route, routeIndex);
  });

const routes = [...AuthRoutes, ...DashboardRoutes];

export { routes, getRoutes };

import { lazy, Suspense } from 'react';
import { BrowserRouter, Outlet, RouteObject, useRoutes } from 'react-router-dom';
import { RequireAuth } from '~/components/auth/AuthProvider';
import NavBar from '~/components/shared/Nav/NavBar';
import Loading from '~/components/shared/Loading';

const HomeScreen = lazy(() => import('~/components/screens/Home'));
const BuisnessScreen = lazy(() => import('~/components/screens/protected/Buisness'));
const MeetingsScreen = lazy(() => import('~/components/screens/protected/Meetings'));
const StatisticsScreen = lazy(() => import('~/components/screens/protected/Statistics'));
const LoginScreen = lazy(() => import('~/components/screens/Login'));
const NotFoundScreen = lazy(() => import('~/components/screens/NotFound'));

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

function Routes() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomeScreen />,
        },
        {
          path: '/buisness',
          element: (
            <RequireAuth>
              <BuisnessScreen />
            </RequireAuth>
          ),
        },
        {
          path: '/meetings',
          element: (
            <RequireAuth>
              <MeetingsScreen />
            </RequireAuth>
          ),
        },
        {
          path: '/statistics',
          element: (
            <RequireAuth>
              <StatisticsScreen />
            </RequireAuth>
          ),
        },
        {
          path: '/login',
          element: <LoginScreen />,
        },
        {
          path: '*',
          element: <NotFoundScreen />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);

  return <Suspense fallback={<Loading />}>{element}</Suspense>;
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

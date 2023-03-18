import React, { ElementType, lazy, Suspense } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { useRoutes } from 'react-router';

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const Home = Loadable(lazy(() => import('../pages/home/Home')));
const Dashboard = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Dashboard />,
    },
  ]);
}

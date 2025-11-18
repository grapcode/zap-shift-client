import { createBrowserRouter, Router } from 'react-router';
import Home from '../pages/Home/Home';
import MainLayout from '../layout/MainLayout';
import Coverage from '../pages/Coverage/Coverage';
import AboutUS from '../pages/AboutUS';
import AuthLayout from '../layout/AuthLayout';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Rider from '../pages/Rider/Rider';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/coverage',
        element: <Coverage />,
        loader: () => fetch('serviceCenters.json').then((res) => res.json()),
      },
      {
        path: '/aboutUS',
        element: <AboutUS />,
      },
      {
        path: '/rider',
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
      },
      {
        path: '/*',
        element: <h2>Error 404</h2>,
      },
    ],
  },

  // ❌ Auth Layout

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

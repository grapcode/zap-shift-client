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
import SendParcel from '../pages/SendParcel';
import DashboardLayout from '../layout/DashboardLayout';
import MyParcels from '../pages/Dashboard/MyParcels';
import Payment from '../pages/Dashboard/Payment';
import PaymentSuccess from '../pages/Dashboard/PaymentSuccess';
import PaymentCancelled from '../pages/Dashboard/PaymentCancelled';
import PaymentHistory from '../pages/Dashboard/PaymentHistory';
import ApproveRider from '../pages/Dashboard/ApproveRider';

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
        loader: () => fetch('serviceCenters.json').then((res) => res.json()),
      },
      {
        path: '/sendParcel',
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch('serviceCenters.json').then((res) => res.json()),
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

  // ❌ Dashboard Layout
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'my-parcels',
        element: <MyParcels />,
      },
      {
        path: 'payment/:parcelId',
        element: <Payment />,
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess />,
      },
      {
        path: 'payment-cancel',
        element: <PaymentCancelled />,
      },
      {
        path: 'payment-history',
        element: <PaymentHistory />,
      },
      {
        path: 'approve-riders',
        element: <ApproveRider />,
      },
    ],
  },
]);

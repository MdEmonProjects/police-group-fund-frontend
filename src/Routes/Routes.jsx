// Routes.jsx
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { permissionsDataList } from '../Data/permissions';
import UserRegistration from '../pages/userpanel/UserRegistration';
import UserForgetPassword from '../pages/userpanel/UserForgetPassword';
import UserLogin from '../pages/userpanel/UserLogin';
import PrivateRoute from './PrivateRoute';
import DefaultLayout from '../layout/DefaultLayout';
import NotFound from '../pages/NotFound';
import UserPanel from '../layout/UserPanel';
import Dashboard from '../pages/userpanel/Dashboard';
import PolicySection from '../pages/userpanel/PolicySection';
import PolicyDetail from '../pages/userpanel/PolicyDetail';
import UserProfile from '../pages/userpanel/UserProfile';
import UserPersonalProfile from '../pages/userpanel/UserPersonalProfile';
import Withdraw from '../pages/userpanel/Withdraw';
import CancelMembership from '../pages/userpanel/CancelMembership';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/forget_password',
    element: <UserForgetPassword />,
  },
  {
    path: '/login',
    element: <UserLogin />,
  },
  {
    path: '/registration',
    element: <UserRegistration />,
  },
  {
    path: '/user',
    element: <UserPanel />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard/>,
      },
      {
        path: 'profile',
        element: <UserPersonalProfile/>,
      },
      {
        path: 'withdraw',
        element: <Withdraw/>,
      },
      {
        path: 'cancel_request',
        element: <CancelMembership/>,
      },
      {
        path: 'profile/:id',
        element: <UserProfile/>,
      },
      {
        path: 'policy/:slug', // Dynamic route for individual policy
        element: <PolicyDetail />,
      },

    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;

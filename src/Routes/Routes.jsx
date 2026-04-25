// Routes.jsx
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { permissionsDataList } from '../Data/permissions';
import UserRegistration from '../pages/userpanel/UserRegistration';
import UserForgetPassword from '../pages/userpanel/UserForgetPassword';
import UserLogin from '../pages/userpanel/UserLogin';
import PrivateRoute from './PrivateRoute';
import DefaultLayout from '../layout/DefaultLayout';
import NotFound from '../pages/NotFound';
import UserPanel from '../layout/UserPanel';
import Dashboard from '../pages/userpanel/Dashboard';

const router = createBrowserRouter([
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

    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;

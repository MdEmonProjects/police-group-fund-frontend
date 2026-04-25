import { Buffer } from 'buffer';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import DefaultModal from '../components/DefaultModal';
import DefaultSideDrawer from '../components/DefaultSideDrawer';
import { useGetSessionsQuery } from '../features/session/sessionSlice';
import { useGetUserDetailsQuery } from '../features/userPanel/userInfo/userInfoQuerySlice';
import { useVerifyUserPanelTokenMutation } from '../features/userPanel/userLoginVerify/userloginVerifyQuerySlice';
import { showModal, showSideBarModal } from '../utils/ModalControlar';
// import { subscribeUser } from "../pushNotifications";
import DropdownNotification from '../components/Header/DropdownNotification';
import Loading from '../components/Loading/Loading';
import {
  useNotificationListQuery,
  useSubscribeNotificationMutation,
} from '../features/userPanel/panelNotification/panelNotificationQuerySlice';
import avatar from '/avatar.png';
import logo from '/saharaItlogo.png';
import '../DonationDashboard.css'
const WEB_PUSH_PUBLIC_KEY = import.meta.env.VITE_WEB_PUSH_PUBLIC_KEY;
export default function UserPanel({ children }) {
  const token = localStorage.getItem('user_panel_token');
  console.log(token);

  const [verifyToken] = useVerifyUserPanelTokenMutation();

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
    const currentPath = location.pathname.replace(`/dashboard/`, '');
  const currentPathDashboard = location.pathname.replace(`/`, '');
  console.log(currentPath, 'location');

  useEffect(() => {
    async function checkToken() {
      if (!token) {
        setLoading(false);
        setIsValid(false);
        return;
      }
      console.log('cjheck tokwen false');

      try {
        console.log('cjheck tokwen false');

        const res = await verifyToken({ token }).unwrap();
        console.log(
          'ashfdashfashfas ashfdiash fawfhasuif asfasihfas fasfh asifh as'
        );
        console.log(res);
        if (res.id && res.phone_number) {
          setIsValid(true);
        } else {
          localStorage.removeItem('user_panel_token');
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem('user_panel_token');
        setIsValid(false);
      }

      setLoading(false);
    }

    checkToken();
  }, []);

  const dispatch = useDispatch();

  const [sessionName, setSessionName] = useState(null);
  const currentSession = useSelector(
    (state) => state.sessionChange.currentSession
  );

  const {
    data: userDetails,
    isLoading: isuserDetailsLoading,
    isError: isuserDetailsError,
  } = useGetUserDetailsQuery(currentSession);
  const {
    data: notificationList,
    isLoading: isNotificationListLoading,
    isError: isNotificationListError,
  } = useNotificationListQuery(currentSession);

  const [
    subscribeUser,
    { isLoading, isError, isSuccess, data: newApplicationResponse },
  ] = useSubscribeNotificationMutation();

  useEffect(() => {
    console.log('user usee effect');

    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        setTimeout(async () => {
          if (!('Notification' in window)) {
            console.log('This browser does not support notifications.');
            return;
          }

          if (!('serviceWorker' in navigator)) {
            console.log('Service workers are not supported by your browser.');
            return;
          }
          const permission = Notification.permission;
          if (permission === 'granted') {
            console.log('Notifications already enabled.');
            return;
          }

          if (permission === 'denied') {
            console.log('Notifications were previously denied.');
            return;
          }
          try {
            const register = await navigator.serviceWorker.register('/sw.js');

            const subscription = await register.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: WEB_PUSH_PUBLIC_KEY,
            });
            subscribeUser(subscription);

            console.log('Successfully subscribed for notifications!');
          } catch (error) {
            console.error('Failed to subscribe:', error);
          }
        }, 2000);
      }
    }
  }, []);

  const { data: sessionsData } = useGetSessionsQuery();

  useEffect(() => {
    if (!sessionsData) return;

    const activeSession =
      sessionsData.find((s) => s.SessionID == currentSession) ??
      sessionsData.find((s) => s.SessionStatus == 1);

    setSessionName(activeSession?.SessionName ?? 'N/A');
  }, [currentSession, sessionsData]);

  const handleTypeModal = useCallback(() => {
    showModal('Type', 'SESSION_CHANGE_MODEL');
  }, []);
  const handleProfileModal = useCallback(() => {
    showSideBarModal('', 'USER_PANEL_PROFILE_VIEW');
  }, []);
  const bufferConveter = (bufferData) => {
    if (!bufferData) {
      return '/logo.png';
    }
    const buffer = Buffer.from(bufferData);
    const base64String = buffer.toString('base64');
    const imageSrc = `data:image/png;base64,${base64String}`;
    return imageSrc;
  };

  // sessionsData.find(s => s.SessionStatus === 1)
  // sessionsData
  if (loading) return <Loading />;

  if (!isValid) return <Navigate to={`/login`} replace />;

  return (
    <div className="font-SolaimanLipi  min-h-screen items-center w-full bg-[#f5f9ff]">
      <Outlet />
      <DefaultModal />
      <DefaultSideDrawer />
    </div>
  );
}

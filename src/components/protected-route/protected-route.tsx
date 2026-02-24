import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectIsAuthChecked,
  selectIsAuthenticated
} from '../../services/slices/authSlice';

type ProtectedRouteProps = {
  element: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  element,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = (location.state as { from?: Location })?.from;
    return <Navigate to={from?.pathname || '/'} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return element;
};

import { ReactElement } from 'react';

type ProtectedRouteProps = {
  element: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => element;

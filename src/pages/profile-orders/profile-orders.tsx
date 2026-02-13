import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchProfileOrders,
  selectProfileOrders,
  selectProfileOrdersLoading
} from '../../services/slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersLoading);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (isLoading && !orders.length) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import '../../index.css';

import styles from './app.module.css';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { OrderInfo } from '../order-info/order-info';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

import { ProtectedRoute } from '../protected-route/protected-route';
import { AppHeader } from '@components';

const App = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  // const background = location.state?.background;

  const handleCloseModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth element={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth element={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth element={<ResetPassword />} />}
        />

        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                element={
                  <Modal title='Детали заказа' onClose={handleCloseModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      }
    </div>
  );
};

export default App;

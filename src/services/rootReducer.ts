import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { feedReducer } from './slices/feedSlice';
import { profileOrdersReducer } from './slices/profileOrdersSlice';
import { authReducer } from './slices/authSlice';
import { constructorReducer } from './slices/constructorSlice';
import { orderReducer } from './slices/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  auth: authReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer
});

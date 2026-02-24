import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import type { RootState } from '../store';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  currentOrder: TOrder | null;
  orderDetailsLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  currentOrder: null,
  orderDetailsLoading: false,
  error: null
};

const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error ? error.message : fallback;

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(ingredients);
      return data.order;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err, 'Ошибка оформления заказа'));
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(number);
      if (!data.orders.length) {
        return rejectWithValue('Заказ не найден');
      }
      return data.orders[0];
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err, 'Ошибка загрузки заказа'));
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = String(action.payload || action.error.message);
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderDetailsLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderDetailsLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderDetailsLoading = false;
        state.error = String(action.payload || action.error.message);
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { clearOrderModalData } = orderSlice.actions;

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;
export const selectCurrentOrder = (state: RootState) =>
  state.order.currentOrder;
export const selectOrderDetailsLoading = (state: RootState) =>
  state.order.orderDetailsLoading;

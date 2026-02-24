import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { TConstructorIngredient, TIngredient } from '@utils-types';
import type { RootState } from '../store';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
        return;
      }

      state.ingredients.push({
        ...action.payload,
        id: uuidv4()
      });
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index <= 0 || index >= state.ingredients.length) return;

      const temp = state.ingredients[index - 1];
      state.ingredients[index - 1] = state.ingredients[index];
      state.ingredients[index] = temp;
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < 0 || index >= state.ingredients.length - 1) return;

      const temp = state.ingredients[index + 1];
      state.ingredients[index + 1] = state.ingredients[index];
      state.ingredients[index] = temp;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const constructorReducer = constructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor ?? { bun: null, ingredients: [] };

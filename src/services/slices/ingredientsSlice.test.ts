import { TIngredient } from '../../utils/types';
import { ingredientsReducer, fetchIngredients } from './ingredientsSlice';

const ingredientsMock: TIngredient[] = [
  {
    _id: 'bun-1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: 'bun.png',
    image_large: 'bun-large.png',
    image_mobile: 'bun-mobile.png'
  }
];

describe('ingredientsSlice reducer', () => {
  it('pending: должен ставить isLoading=true', () => {
    const action = fetchIngredients.pending('request-id', undefined);
    const state = ingredientsReducer(undefined, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled: должен записывать ингредиенты и ставить isLoading=false', () => {
    const action = fetchIngredients.fulfilled(
      ingredientsMock,
      'request-id',
      undefined
    );
    const state = ingredientsReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(ingredientsMock);
  });

  it('rejected: должен записывать ошибку и ставить isLoading=false', () => {
    const action = fetchIngredients.rejected(
      new Error('Ошибка сети'),
      'request-id',
      undefined
    );
    const state = ingredientsReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка сети');
  });
});

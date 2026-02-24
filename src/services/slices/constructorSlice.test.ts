import { TIngredient } from '@utils-types';
import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredientDown
} from './constructorSlice';

const bun: TIngredient = {
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
};

const main1: TIngredient = {
  _id: 'main-1',
  name: 'Котлета',
  type: 'main',
  proteins: 20,
  fat: 20,
  carbohydrates: 20,
  calories: 200,
  price: 200,
  image: 'main1.png',
  image_large: 'main1-large.png',
  image_mobile: 'main1-mobile.png'
};

const main2: TIngredient = {
  _id: 'main-2',
  name: 'Сыр',
  type: 'main',
  proteins: 30,
  fat: 30,
  carbohydrates: 30,
  calories: 300,
  price: 300,
  image: 'main2.png',
  image_large: 'main2-large.png',
  image_mobile: 'main2-mobile.png'
};

describe('constructorSlice reducer', () => {
  it('должен добавлять ингредиенты (булку и начинку)', () => {
    let state = constructorReducer(undefined, addIngredient(bun));
    expect(state.bun?._id).toBe('bun-1');

    state = constructorReducer(state, addIngredient(main1));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('main-1');
    expect(state.ingredients[0].id).toBeDefined();
  });

  it('должен удалять ингредиент начинки по id', () => {
    let state = constructorReducer(undefined, addIngredient(main1));
    const idToRemove = state.ingredients[0].id;

    state = constructorReducer(state, removeIngredient(idToRemove));
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен менять порядок начинок', () => {
    let state = constructorReducer(undefined, addIngredient(main1));
    state = constructorReducer(state, addIngredient(main2));

    state = constructorReducer(state, moveIngredientDown(0));

    expect(state.ingredients[0]._id).toBe('main-2');
    expect(state.ingredients[1]._id).toBe('main-1');
  });
});

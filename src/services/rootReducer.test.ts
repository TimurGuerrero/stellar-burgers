import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  it('должен вернуть корректное начальное состояние при UNKNOWN_ACTION', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      profileOrders: {
        orders: [],
        isLoading: false,
        error: null
      },
      auth: {
        user: null,
        isAuthenticated: false,
        isAuthChecked: false,
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orderRequest: false,
        orderModalData: null,
        currentOrder: null,
        orderDetailsLoading: false,
        error: null
      }
    });
  });
});

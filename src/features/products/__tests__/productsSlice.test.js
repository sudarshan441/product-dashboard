import productsReducer, {
  setProducts,
  toggleFavorite,
  setLoading,
  setError
} from '../productsSlice';

describe('productsSlice', () => {
  const initialState = {
    items: [],
    favorites: [],
    status: 'idle',
    error: null
  };

  const sampleProducts = [
    { id: 1, title: 'Test 1' },
    { id: 2, title: 'Test 2' }
  ];

  it('should return the initial state', () => {
    expect(productsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setProducts', () => {
    const nextState = productsReducer(initialState, setProducts(sampleProducts));
    expect(nextState.items).toEqual(sampleProducts);
    expect(nextState.status).toBe('succeeded');
  });

  it('should toggle a favorite on and off', () => {
    const stateWithProduct = {
      ...initialState,
      items: sampleProducts
    };

    const afterAdd = productsReducer(stateWithProduct, toggleFavorite(1));
    expect(afterAdd.favorites).toContain(1);

    const afterRemove = productsReducer(afterAdd, toggleFavorite(1));
    expect(afterRemove.favorites).not.toContain(1);
  });

  it('should handle setLoading', () => {
    const newState = productsReducer(initialState, setLoading());
    expect(newState.status).toBe('loading');
  });

  it('should handle setError', () => {
    const errorMsg = 'Something went wrong';
    const newState = productsReducer(initialState, setError(errorMsg));
    expect(newState.status).toBe('failed');
    expect(newState.error).toBe(errorMsg);
  });
});

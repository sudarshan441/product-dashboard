import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Favorites from './Favorites';
import productsReducer from '../features/products/productsSlice';

describe('Favorites', () => {
  const preloadedState = {
    products: {
      favorites: [],
      items: [],
      status: 'idle',
      error: null
    }
  };

  const store = configureStore({
    reducer: { products: productsReducer },
    preloadedState
  });

  it('shows empty favorites message', () => {
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );
    expect(screen.getByText(/No favorites added yet/i)).toBeInTheDocument();
  });
});

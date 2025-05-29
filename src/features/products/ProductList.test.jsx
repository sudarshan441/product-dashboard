import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import ProductsList from './ProductsList';

describe('ProductsList', () => {
  const store = configureStore({
    reducer: { products: productsReducer }
  });

  it('renders loading state initially', () => {
    render(
      <Provider store={store}>
        <ProductsList />
      </Provider>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  it('renders product info correctly', () => {
    const product = {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      image: 'https://via.placeholder.com/150'
    };

    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <ProductCard product={product} />
      </BrowserRouter>
    );

    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('$99.99')).toBeInTheDocument();
    expect(getByAltText('Test Product')).toBeInTheDocument();
  });
});

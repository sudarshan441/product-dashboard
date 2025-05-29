import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  image: 'https://via.placeholder.com/150',
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    // Title
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();

    // Price
    expect(screen.getByText('$29.99')).toBeInTheDocument();

    // Image
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.image);
    expect(image).toHaveAttribute('alt', mockProduct.title);
  });
});

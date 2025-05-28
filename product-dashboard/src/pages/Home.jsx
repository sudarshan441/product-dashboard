import React from 'react';
import ProductsList from '../features/products/ProductsList';

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold p-4">Product Listing</h1>
      <ProductsList />
    </div>
  );
};

export default Home;

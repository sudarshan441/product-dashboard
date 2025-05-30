import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../features/products/productsSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.products.favorites);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const isFavorited = favorites.some(fav => fav.id === product.id);

  const handleAddFavorite = () => {
    if (!isFavorited) {
      dispatch(addFavorite(product));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={product.image} alt={product.title} className="h-96 mx-auto object-contain mb-6" />
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
      <p className="mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">${product.price}</p>
      <button
        data-testid="favorite-button"
        onClick={handleAddFavorite}
        disabled={isFavorited}
        className={`px-4 py-2 rounded text-white ${isFavorited ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isFavorited ? 'Added to Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default ProductDetail;

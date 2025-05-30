import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../features/products/productsSlice";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector((state) => state.products.favorites);
  const dispatch = useDispatch();

  if (favorites.length === 0)
    return <div className="p-4">No favorites added yet.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.map((product) => (
          <div key={product.id} data-testid="product-card" className="border rounded p-4 flex flex-col">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="h-48 object-contain mb-2"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
            </Link>
            <button
              data-testid="remove-favorite"
              onClick={() => dispatch(removeFavorite(product.id))}
              className="mt-auto bg-red-600 hover:bg-red-700 text-white py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;

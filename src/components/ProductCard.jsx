import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div data-testid="product-card" className="border rounded shadow p-4 flex flex-col h-full">
        <img 
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-700 font-bold mb-2">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;

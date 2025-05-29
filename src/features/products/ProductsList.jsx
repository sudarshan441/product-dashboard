import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./productsSlice";
import ProductCard from "../../components/ProductCard";

// Utility: debounce function (to avoid too many search calls)
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  // UI states for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none"); // 'asc' | 'desc' | 'none'

  // Fetch products on mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Debounce search input
  useEffect(() => {
    const handler = debounce(
      () => setDebouncedSearch(searchTerm.toLowerCase()),
      500
    );
    handler();
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Extract categories from products for filter dropdown
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["all", ...cats];
  }, [products]);

  // Filter and sort products based on UI states
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    // Search filter (title)
    if (debouncedSearch) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch)
      );
    }

    // Sort by price
    if (sortOrder === "asc") {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, categoryFilter, debouncedSearch, sortOrder]);

  if (status === "loading") return <div className="p-4">Loading...</div>;
  if (status === "failed")
    return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="w-full p-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 mb-3 sm:mb-0 flex-1"
          aria-label="Search products by title"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded px-3 py-2 mb-3 sm:mb-0"
          aria-label="Filter products by category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-3 py-2"
          aria-label="Sort products by price"
        >
          <option value="none">Sort by price</option>
          <option value="asc">Lowest to highest</option>
          <option value="desc">Highest to lowest</option>
        </select>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <p>No products match your criteria.</p>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;

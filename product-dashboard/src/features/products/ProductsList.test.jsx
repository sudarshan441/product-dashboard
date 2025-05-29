import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import ProductsList from "./ProductsList";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Setup Axios mock
const mock = new MockAdapter(axios);
const mockProducts = [
  { id: 1, title: "Laptop", price: 1000, category: "electronics", image: "" },
  { id: 2, title: "Shirt", price: 30, category: "clothing", image: "" },
  { id: 3, title: "Keyboard", price: 50, category: "electronics", image: "" },
];

const renderWithStore = () => {
  const store = configureStore({ reducer: { products: productsReducer } });
  return render(
    <Provider store={store}>
      <ProductsList />
    </Provider>
  );
};

describe("ProductsList Component", () => {
  beforeEach(() => {
    mock.reset();
    mock.onGet("https://fakestoreapi.com/products").reply(200, mockProducts);
  });

  it("renders all products", async () => {
    renderWithStore();
    await waitFor(() => {
      expect(screen.getByText("Laptop")).toBeInTheDocument();
    });
    expect(screen.getByText("Shirt")).toBeInTheDocument();
    expect(screen.getByText("Keyboard")).toBeInTheDocument();
  });

  it("filters by search input", async () => {
    renderWithStore();
    await waitFor(() => screen.getByText("Laptop"));
    const searchInput = screen.getByLabelText("Search products by title");
    fireEvent.change(searchInput, { target: { value: "laptop" } });
    await waitFor(() => {
      expect(screen.getByText("Laptop")).toBeInTheDocument();
    });
    expect(screen.queryByText("Shirt")).toBeNull();
    expect(screen.queryByText("Keyboard")).toBeNull();
  });

  it("filters by category", async () => {
    renderWithStore();
    await waitFor(() => screen.getByText("Laptop"));
    const categorySelect = screen.getByLabelText("Filter products by category");
    fireEvent.change(categorySelect, { target: { value: "clothing" } });
    expect(await screen.findByText("Shirt")).toBeInTheDocument();
    expect(screen.queryByText("Laptop")).toBeNull();
  });

  it("sorts by price (ascending)", async () => {
    renderWithStore();
    await waitFor(() => screen.getByText("Laptop"));
    const sortSelect = screen.getByLabelText("Sort products by price");
    fireEvent.change(sortSelect, { target: { value: "asc" } });

    const prices = screen.getAllByText(/\$\d+/).map((el) => parseFloat(el.textContent.slice(1)));
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  it("handles fetch error", async () => {
    mock.onGet("https://fakestoreapi.com/products").reply(500);
    renderWithStore();
    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });
});

import React, { useState } from "react";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";

import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Filter products
  const filteredProducts = productsData.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <div className="py-12">
        {/* Search */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded text-sm transition ${
              selectedCategory === "All"
                ? "bg-accent text-white"
                : "bg-secondary text-primary hover:bg-primary hover:text-white"
            }`}
          >
            All
          </button>

          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded text-sm transition ${
                selectedCategory === cat.name
                  ? "bg-accent text-white"
                  : "bg-secondary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No products found
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Shop;

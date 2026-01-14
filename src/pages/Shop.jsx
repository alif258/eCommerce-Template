import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";

import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem("store_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      localStorage.setItem("store_products", JSON.stringify(productsData));
      setProducts(productsData);
    }
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="font-inter">
      <div className="py-12">
        {/* 🔍 Search Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-primary uppercase italic mb-6 tracking-tighter">
            Explore Our Collection
          </h1>
          <div className="relative max-w-xl mx-auto group">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-accent transition-colors">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search for items, brands, or styles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border-2 border-secondary rounded-2xl outline-none focus:border-accent shadow-sm transition-all font-medium text-gray-700"
            />
          </div>
        </div>

        {/* 🏷️ Categories (Pill Style) */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-sm ${
              selectedCategory === "All"
                ? "bg-primary text-white scale-105 shadow-primary/20"
                : "bg-white text-gray-400 border border-secondary hover:border-accent hover:text-accent"
            }`}
          >
            All Products
          </button>

          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-sm ${
                selectedCategory === cat.name
                  ? "bg-primary text-white scale-105 shadow-primary/20"
                  : "bg-white text-gray-400 border border-secondary hover:border-accent hover:text-accent"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 📦 Results Info */}
        <div className="flex justify-between items-center mb-6 px-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Showing {filteredProducts.length} Results
            </p>
            {search && (
                <button 
                    onClick={() => setSearch("")}
                    className="text-[10px] font-black text-red-500 uppercase underline"
                >
                    Clear Search
                </button>
            )}
        </div>

        {/* 🛒 Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-secondary">
              <div className="text-5xl mb-4 opacity-30">📦</div>
              <h2 className="text-xl font-black text-gray-400 uppercase tracking-tighter italic">
                No products found matching your criteria
              </h2>
              <button 
                onClick={() => {setSearch(""); setSelectedCategory("All")}}
                className="mt-4 text-accent font-bold hover:underline italic"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Shop;
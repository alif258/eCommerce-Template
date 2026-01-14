import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [avgRating, setAvgRating] = useState(0); // ডিফল্ট ০
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews_${product.id}`);
    if (savedReviews) {
      const reviews = JSON.parse(savedReviews);
      if (reviews.length > 0) {
        const total = reviews.reduce((sum, rev) => sum + rev.rating, 0);
        const average = (total / reviews.length).toFixed(1);
        setAvgRating(average);
        setTotalReviews(reviews.length);
      }
    }
  }, [product.id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      style: {
        borderRadius: '12px',
        background: '#7f1d1d', // আপনার Primary color
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
      },
    });
  };

  const discountPrice = product.offer
    ? Math.round(product.price - (product.price * product.offer) / 100)
    : product.price;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-secondary relative font-inter">
      {/* Discount Badge */}
      {product.offer > 0 && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg z-10 shadow-lg uppercase tracking-wider">
          {product.offer}% OFF
        </span>
      )}

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-secondary/30">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </Link>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* ⭐ রেটিং সেকশন: শুধুমাত্র রিভিউ থাকলেই দেখাবে */}
        {totalReviews > 0 ? (
          <div className="flex items-center gap-1.5">
            <div className="flex text-accent text-xs">
              {"⭐".repeat(Math.floor(avgRating))}
              {avgRating % 1 !== 0 && "½"} 
            </div>
            <span className="text-gray-400 text-[10px] font-bold">
              {avgRating} ({totalReviews})
            </span>
          </div>
        ) : (
          <div className="h-4"></div> // রিভিউ না থাকলে জায়গা খালি রাখবে যাতে কার্ডের সাইজ ঠিক থাকে
        )}

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-xl font-black text-primary">৳ {discountPrice}</span>
          {product.offer > 0 && (
            <span className="text-xs line-through text-gray-400 font-medium italic">৳ {product.price}</span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}></span>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${product.stock > 0 ? "text-gray-500" : "text-red-500"}`}>
            {product.stock > 0 ? `In Stock (${product.stock})` : "Sold Out"}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="mt-2 w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest bg-accent text-primary hover:bg-primary hover:text-white transition-all duration-300 disabled:bg-gray-200 disabled:text-gray-400 shadow-md active:scale-95 cursor-pointer"
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col items-center text-center bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 sm:h-40 object-cover rounded mb-3"
      />
      <h3 className="font-semibold text-sm sm:text-base mb-2">{product.name}</h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-3">{product.description}</p>
      <p className="text-accent font-bold mb-3 text-sm sm:text-base lg:text-[20px]">
        ৳ {product.price}
      </p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="bg-accent hover:bg-primary text-white px-8 py-2 rounded text-xs sm:text-sm lg:text-[16px] transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

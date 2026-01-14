import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQty } from "../redux/slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-accent">৳ {item.price}</span>
            {item.offer > 0 && (
              <span className="text-sm line-through text-gray-400">৳ {item.originalPrice}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 sm:mt-0">
        <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))} disabled={item.qty <= 1} className="px-2 py-1 bg-gray-200 rounded">-</button>
        <span>{item.qty}</span>
        <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))} className="px-2 py-1 bg-gray-200 rounded">+</button>
        <button onClick={() => dispatch(removeFromCart(item.id))} className="ml-4 text-red-500 font-bold">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
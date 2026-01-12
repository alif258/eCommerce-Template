import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import Container from "../components/Container";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cartItems.length === 0)
    return <h1 className="text-center py-20 text-xl font-semibold">Your cart is empty</h1>;

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {/* Cart Items */}
      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Cart Summary & Actions */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-bold text-xl">Total: ৳ {totalPrice}</p>
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(clearCart())}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="px-6 py-2 bg-accent text-white rounded hover:bg-primary transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Cart;

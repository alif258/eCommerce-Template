import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import Container from "../components/Container";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // হিসাব-নিকাশ
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryCharge = subtotal > 0 ? 60 : 0; 
  const grandTotal = subtotal + deliveryCharge;

  if (cartItems.length === 0)
    return (
      <Container className="py-24 text-center font-inter">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-3xl font-black text-primary mb-4">Your cart is empty!</h1>
          <p className="text-gray-500 mb-8 font-medium">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-primary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-125 transition-all shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </Container>
    );

  return (
    <Container className="py-12 font-inter">
      <h1 className="text-3xl font-black mb-10 text-primary uppercase tracking-tight italic">
        Shopping Cart ({cartItems.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* বাম পাশ: আইটেম লিস্ট */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border-2 border-secondary overflow-hidden shadow-sm">
            <div className="p-6 divide-y divide-secondary">
              {cartItems.map((item) => (
                <div key={item.id} className="py-6 first:pt-0 last:pb-0">
                  <CartItem item={item} />
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => dispatch(clearCart())}
            className="group flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest hover:text-red-700 transition-colors ml-2"
          >
            <span className="group-hover:rotate-90 transition-transform inline-block">✕</span> Clear Cart
          </button>
        </div>

        {/* ডান পাশ: অর্ডার সামারি (এটাই কাস্টমারকে ভালো ধারণা দেয়) */}
        <div className="lg:col-span-1 sticky top-24">
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-secondary shadow-xl">
            <h2 className="text-xl font-black mb-6 text-gray-800 uppercase italic border-b-2 border-secondary pb-4">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500 font-bold text-sm">
                <span>Subtotal</span>
                <span>৳ {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold text-sm">
                <span>Delivery Fee</span>
                <span>৳ {deliveryCharge}</span>
              </div>
              
              <div className="border-t-2 border-dashed border-secondary pt-5 mt-5 flex justify-between items-center">
                <span className="font-black text-gray-800 text-lg uppercase">Net Payable</span>
                <span className="text-3xl font-black text-accent drop-shadow-sm">৳ {grandTotal}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/checkout"
                className="block w-full text-center bg-accent text-primary py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_10px_20px_-10px_#fbbf24] hover:brightness-105 active:scale-95 transition-all"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                to="/shop"
                className="block w-full text-center border-2 border-primary text-primary py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="mt-8 flex justify-center gap-4 opacity-40 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
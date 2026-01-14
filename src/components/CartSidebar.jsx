import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart, removeFromCart, updateQty } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const { items, isOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // মোট হিসাব
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleNavigation = (path) => {
    dispatch(toggleCart());
    navigate(path);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 backdrop-blur-sm" 
          onClick={() => dispatch(toggleCart())}
        ></div>
      )}

      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[101] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        <div className="flex flex-col h-full font-inter">
          
          {/* Header */}
          <div className="p-5 border-b flex justify-between items-center bg-primary text-white sticky top-0">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Shopping Cart</h2>
              <p className="text-xs text-white/80">{items.length} items to checkout</p>
            </div>
            <button onClick={() => dispatch(toggleCart())} className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-90">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/30">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <p className="text-lg font-medium">Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative group overflow-hidden">
                  {/* Product Image */}
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl border border-secondary shadow-sm" />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{item.name}</h4>
                      
                      {/* Price Section with Strike-through */}
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-black text-lg">৳{item.price}</span>
                        {item.oldPrice && (
                          <span className="text-gray-400 text-xs line-through italic">৳{item.oldPrice}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Qty Control with Primary Color */}
                      <div className="flex items-center border-2 border-secondary rounded-xl bg-secondary/50 overflow-hidden">
                        <button 
                          onClick={() => item.qty > 1 ? dispatch(updateQty({id: item.id, qty: item.qty - 1})) : dispatch(removeFromCart(item.id))} 
                          className="px-3 py-1.5 hover:bg-primary hover:text-white transition-colors duration-200"
                        >
                          {item.qty === 1 ? '✕' : '-'}
                        </button>
                        <span className="px-3 text-sm font-black text-primary">{item.qty}</span>
                        <button 
                          onClick={() => dispatch(updateQty({id: item.id, qty: item.qty + 1}))} 
                          className="px-3 py-1.5 hover:bg-primary hover:text-white transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Item Subtotal Calculation */}
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Line Total</p>
                        <p className="font-bold text-primary">৳{item.price * item.qty}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t bg-white shadow-[0_-15px_30px_rgba(0,0,0,0.05)]">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Order Subtotal</span>
                  <span>৳ {subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping & Tax</span>
                  <span className="text-primary text-xs font-bold bg-primary/5 px-2 py-0.5 rounded">Calculate at next step</span>
                </div>
                <div className="border-t-2 border-dashed border-secondary pt-4 flex justify-between items-center">
                  <span className="font-black text-gray-800 text-lg uppercase">Net Payable</span>
                  <span className="text-3xl font-black text-accent drop-shadow-sm">৳ {subtotal}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleNavigation("/cart")}
                  className="w-full border-2 border-primary text-primary py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95"
                >
                  View Cart
                </button>

                <button 
                  onClick={() => handleNavigation("/checkout")}
                  className="w-full bg-accent text-primary py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-105 shadow-[0_4px_15px_-5px_#fbbf24] active:scale-95 transition-all"
                >
                  Checkout
                </button>
              </div>
              <div className="mt-4 flex justify-center gap-2 opacity-40 grayscale">
                 {/* Payment Icons Placeholder */}
                 <div className="h-4 w-8 bg-gray-400 rounded-sm"></div>
                 <div className="h-4 w-8 bg-gray-400 rounded-sm"></div>
                 <div className="h-4 w-8 bg-gray-400 rounded-sm"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const finalPrice = item.offer > 0 
        ? item.price - (item.price * item.offer) / 100 
        : item.price;

      const existing = state.items.find(i => i.id === item.id);

      if (existing) {
        if (existing.qty < item.stock) {
          existing.qty += 1;
        }
      } else {
        if (item.stock > 0) {
          state.items.push({ 
            ...item, 
            price: finalPrice, 
            originalPrice: item.price, 
            qty: 1 
          });
        }
      }
      // state.isOpen = true; // এটি সরিয়ে দেওয়া হয়েছে যেন অটোমেটিক না খোলে
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && qty >= 1 && qty <= item.stock) {
        item.qty = qty;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { addToCart, updateQty, removeFromCart, clearCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
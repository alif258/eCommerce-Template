import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import settingsData from "../data/settings.json";
import allProductsData from "../data/products.json"; 

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleWhatsAppOrder = () => {
    if (!phone || !address) return alert("দয়া করে ফোন নম্বর এবং বিস্তারিত ঠিকানা দিন।");
    if (phone.length < 11) return alert("সঠিক ফোন নম্বর দিন।");

    const myWhatsAppNumber = settingsData.contact.phone; 
    
    // --- calculations ---
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const originalSubtotal = cartItems.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.qty, 0);
    const totalDiscount = originalSubtotal - subtotal;
    const deliveryFee = 60; // Standard charge
    const total = subtotal + deliveryFee;

    // --- Message formatting (Clean & Professional) ---
    let message = `*📦 নতুন অর্ডার - ${settingsData.storeName}*\n`;
    message += `------------------------------------------\n`;
    message += `*👤 কাস্টমারের তথ্য:*\n`;
    message += `নাম: ${customerName || "দেওয়া হয়নি"}\n`;
    message += `ফোন: ${phone}\n`;
    message += `ঠিকানা: ${address}\n\n`;

    message += `*🛒 আইটেম লিস্ট:*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qty: ${item.qty} x ৳${item.price} = ৳${item.price * item.qty}\n`;
    });

    message += `\n*💰 বিল ডিটেইলস:*\n`;
    message += `সাবটোটাল: ৳${originalSubtotal}\n`;
    if (totalDiscount > 0) message += `ডিসকাউন্ট: -৳${totalDiscount}\n`;
    message += `ডেলিভারি চার্জ: ৳${deliveryFee}\n`;
    message += `*মোট বিল: ৳${total}*\n`;
    message += `------------------------------------------\n`;
    message += `_অর্ডারটি দ্রুত কনফার্ম করার জন্য অনুরোধ করছি।_`;

    // --- Auto Stock Manage ---
    let currentStock = JSON.parse(localStorage.getItem("store_products")) || allProductsData;
    const updatedStock = currentStock.map(product => {
      const soldItem = cartItems.find(item => item.id === product.id);
      if (soldItem) {
        const newStock = product.stock - soldItem.qty;
        return { ...product, stock: newStock < 0 ? 0 : newStock };
      }
      return product;
    });
    localStorage.setItem("store_products", JSON.stringify(updatedStock));

    // --- Launch WhatsApp ---
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://api.whatsapp.com/send?phone=${myWhatsAppNumber}&text=${encodedMessage}`;
    window.open(waUrl, "_blank");

    dispatch(clearCart());
    navigate("/ordersuccess");
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-32 text-center font-inter">
        <div className="bg-white p-10 rounded-3xl shadow-sm border inline-block">
            <h1 className="text-2xl font-black text-primary mb-4 italic">YOUR CART IS EMPTY</h1>
            <button onClick={() => navigate("/")} className="text-accent font-bold underline uppercase tracking-widest text-sm">Return to Shop</button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 font-inter">
      <h1 className="text-3xl font-black mb-10 text-primary uppercase tracking-tighter italic border-l-8 border-accent pl-4">
        Checkout Process
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Form & Items */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Shipping Form */}
          <div className="p-8 bg-white rounded-[2rem] shadow-xl border-2 border-secondary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-primary font-black px-6 py-1 rounded-bl-2xl text-[10px] uppercase">
                Shipping Details
            </div>
            <h2 className="text-xl font-black text-gray-800 mb-6 uppercase italic">Where should we deliver?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Full Name</label>
                    <input 
                        type="text" 
                        placeholder=" Rahim Ahmed" 
                        value={customerName} 
                        onChange={(e) => setCustomerName(e.target.value)} 
                        className="w-full bg-secondary/30 border-2 border-secondary px-5 py-3 rounded-2xl outline-none focus:border-accent transition-all font-semibold text-gray-700" 
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Phone Number (WhatsApp)</label>
                    <input 
                        type="number" 
                        placeholder="01XXXXXXXXX" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        className="w-full bg-secondary/30 border-2 border-secondary px-5 py-3 rounded-2xl outline-none focus:border-accent transition-all font-semibold text-gray-700" 
                    />
                </div>
                <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Detailed Address</label>
                    <textarea 
                        placeholder="House #, Road #, Area, City" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        className="w-full bg-secondary/30 border-2 border-secondary px-5 py-4 rounded-2xl outline-none focus:border-accent transition-all font-semibold text-gray-700 h-28 resize-none" 
                    />
                </div>
            </div>
          </div>

          {/* Cart Items Review */}
          <div className="bg-white rounded-[2rem] border-2 border-secondary overflow-hidden">
             <div className="p-6 bg-secondary/50 font-black text-xs uppercase tracking-widest text-gray-500">
                Review Your Order
             </div>
             <div className="p-6 divide-y-2 divide-secondary">
                {cartItems.map((item) => (
                    <div key={item.id} className="py-4">
                        <CartItem item={item} />
                    </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Summary & Final Button */}
        <div className="lg:col-span-1 space-y-6 sticky top-24">
          <OrderSummary cartItems={cartItems} />
          
          <div className="bg-primary p-6 rounded-[2rem] shadow-2xl">
              <button 
                onClick={handleWhatsAppOrder} 
                className="w-full bg-accent text-primary py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span className="text-xl">💬</span> Confirm via WhatsApp
              </button>
              <p className="text-[9px] text-white/50 text-center mt-4 font-bold uppercase tracking-widest">
                By clicking, your WhatsApp will open with order details
              </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
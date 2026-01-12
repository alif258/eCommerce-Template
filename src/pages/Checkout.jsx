import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import settingsData from "../data/settings.json";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
const handleWhatsAppOrder = () => {
  if (!phone) return alert("দয়া করে আপনার ফোন নম্বরটি দিন");

  const myWhatsAppNumber = settingsData.contact.phone; 

  let message = `*নতুন অর্ডার - ${settingsData.storeName}*\n\n`;
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - ${item.qty} টি - ৳${item.price * item.qty}\n`;
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = 50; 
  const total = subtotal + deliveryFee;

  message += `\n*সাবটোটাল:* ৳${subtotal}`;
  message += `\n*ডেলিভারি চার্জ:* ৳${deliveryFee}`;
  message += `\n*মোট বিল:* ৳${total}\n`;
  message += `\n*কাস্টমারের তথ্য:*`;
  message += `\nনাম: ${customerName || "দেওয়া হয়নি"}`;
  message += `\nফোন: ${phone}`;
  message += `\nঠিকানা: ${address || "দেওয়া হয়নি"}`;

  const encodedMessage = encodeURIComponent(message);
  
  const waUrl = `https://api.whatsapp.com/send?phone=${myWhatsAppNumber}&text=${encodedMessage}`;
  
  window.open(waUrl, "_blank");

  dispatch(clearCart());
  navigate("/ordersuccess");
};

  if (cartItems.length === 0)
    return (
      <Container className="py-20">
        <h1 className="text-center text-3xl font-semibold text-gray-500">
          Your cart is empty
        </h1>
      </Container>
    );

  return (
    <Container className="py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-12 text-center text-primary tracking-tight">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 flex flex-col gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-4">
            <h2 className="text-2xl font-medium text-gray-700">Customer Info</h2>
            <input
              type="text"
              placeholder="Your Name (optional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent w-full placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Phone Number (WhatsApp preferred)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent w-full placeholder-gray-400"
            />
            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent w-full resize-none h-24 placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <OrderSummary cartItems={cartItems} />
          <button
            onClick={handleWhatsAppOrder}
            className="bg-accent hover:bg-primary text-white py-3 rounded-xl font-medium text-lg transition-shadow shadow-sm hover:shadow-md w-full lg:w-auto"
          >
            Place Order via WhatsApp
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
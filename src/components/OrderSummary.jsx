import React from "react";

const OrderSummary = ({ cartItems }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white rounded-xl p-6 shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Order Summary</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between mb-2 text-sm sm:text-base">
          <span>{item.name} x {item.qty}</span>
          <span>৳ {item.price * item.qty}</span>
        </div>
      ))}
      <hr className="my-3" />
      <div className="flex justify-between font-medium">
        <span>Subtotal</span>
        <span>৳ {subtotal}</span>
      </div>
      <div className="flex justify-between font-medium">
        <span>Delivery Fee</span>
        <span>৳ {deliveryFee}</span>
      </div>
      <div className="flex justify-between font-bold text-lg mt-2">
        <span>Total</span>
        <span>৳ {total}</span>
      </div>
    </div>
  );
};

export default OrderSummary;

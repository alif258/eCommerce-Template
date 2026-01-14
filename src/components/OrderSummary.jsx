import React from "react";

const OrderSummary = ({ cartItems }) => {
  // লজিক অংশ
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  // originalPrice না থাকলে price কেই ব্যাকআপ হিসেবে ধরা হয়েছে
  const originalSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.qty, 
    0
  );
  
  const totalDiscount = originalSubtotal - subtotal;
  const deliveryFee = subtotal > 0 ? 60 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white rounded-[2rem] p-8 border-2 border-secondary shadow-xl w-full font-inter">
      <h2 className="text-xl font-black mb-6 text-primary uppercase italic border-b-2 border-secondary pb-4">
        Order Summary
      </h2>

      <div className="space-y-4">
        {/* Subtotal - Original Price */}
        <div className="flex justify-between text-gray-500 font-bold text-sm">
          <span>Items Total</span>
          <span>৳ {originalSubtotal}</span>
        </div>

        {/* Discount Section - Only shows if there's a discount */}
        {totalDiscount > 0 && (
          <div className="flex justify-between font-bold text-sm">
            <span className="text-gray-500">Discount Saved</span>
            <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">
              - ৳ {totalDiscount}
            </span>
          </div>
        )}

        {/* Delivery Fee */}
        <div className="flex justify-between text-gray-500 font-bold text-sm">
          <span>Delivery Charge</span>
          <span className={deliveryFee === 0 ? "text-green-600" : ""}>
            {deliveryFee === 0 ? "FREE" : `৳ ${deliveryFee}`}
          </span>
        </div>

        {/* Total Payable Line */}
        <div className="border-t-2 border-dashed border-secondary pt-6 mt-6 flex justify-between items-center">
          <div>
            <span className="font-black text-gray-800 text-lg uppercase block leading-none">Net Payable</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 italic">
              Vat Included
            </span>
          </div>
          <span className="text-3xl font-black text-accent drop-shadow-sm">
            ৳ {total}
          </span>
        </div>
      </div>

      {/* Trust Badge / Info */}
      <div className="mt-8 p-4 bg-secondary/30 rounded-2xl flex items-center gap-3">
        <span className="text-2xl">🛡️</span>
        <p className="text-[10px] text-gray-500 font-bold leading-tight uppercase">
          Safe & Secure Payments <br /> 
          <span className="text-primary opacity-70 italic font-black">Zains Mart Quality Guarantee</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
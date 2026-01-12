import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const OrderSuccess = () => {
  return (
    <Container className="py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
      <div className="bg-accent text-white w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-primary">Thank You!</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Your order has been successfully placed. We will contact you shortly
        via WhatsApp to confirm your order.
      </p>

      <Link
        to="/shop"
        className="bg-primary hover:bg-accent text-white hover:text-primary px-8 py-3 rounded-lg font-medium transition"
      >
        Continue Shopping
      </Link>
    </Container>
  );
};

export default OrderSuccess;

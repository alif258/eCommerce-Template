import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // useDispatch যোগ করুন
import { toggleCart } from "../redux/slices/cartSlice"; // toggleCart ইম্পোর্ট করুন
import Container from "./Container";
import config from "../data/settings.json";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch(); // dispatch ডিক্লেয়ার করুন
  const cartItems = useSelector((state) => state.cart.items);
  const [isOpen, setIsOpen] = useState(false);

  const totalQty = cartItems.length;

  const isActive = (path) =>
    pathname === path ? "text-accent font-semibold" : "hover:text-accent";

  return (
    <nav className="bg-primary text-white shadow-md relative z-[90]">
      <Container className="flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">
          {config.storeName}
        </Link>

        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link to="/" className={isActive("/")}>Home</Link></li>
          <li><Link to="/shop" className={isActive("/shop")}>Shop</Link></li>
          <li><Link to="/about" className={isActive("/about")}>About</Link></li>
          <li><Link to="/contact" className={isActive("/contact")}>Contact</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          {/* Cart Icon - Link এর বদলে Button ব্যবহার করা হয়েছে সাইডবার খোলার জন্য */}
          <button 
            onClick={() => dispatch(toggleCart())} 
            className="relative p-2 outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m14-9l2 9M9 22h6" />
            </svg>
            {totalQty > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary">
                {totalQty}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-primary flex flex-col items-center gap-4 p-4 md:hidden z-[99]">
          <li><Link to="/" className={isActive("/")} onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/shop" className={isActive("/shop")} onClick={() => setIsOpen(false)}>Shop</Link></li>
          <li><Link to="/about" className={isActive("/about")} onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/contact" className={isActive("/contact")} onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
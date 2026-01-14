import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ইম্পোর্ট করুন
import RootLayOut from "./layouts/RootLayOut";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import CartSidebar from "./components/CartSidebar";

function App() {
  return (
    <>
      {/* টোস্ট নোটিফিকেশন কনফিগ */}
      <Toaster position="bottom-right" reverseOrder={false} />
      
      {/* গ্লোবাল কার্ট সাইডবার */}
      <CartSidebar />

      <Routes>
        <Route path="/" element={<RootLayOut />}>
          <Route index element={<Home />} /> 
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="ordersuccess" element={<OrderSuccess />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
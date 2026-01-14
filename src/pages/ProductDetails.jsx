import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productsData from "../data/products.json";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    const savedProducts = localStorage.getItem("store_products");
    const currentProducts = savedProducts ? JSON.parse(savedProducts) : productsData;
    setAllProducts(currentProducts);
    
    const foundProduct = currentProducts.find((p) => p.id === Number(id));
    setProduct(foundProduct);

    const savedReviews = localStorage.getItem(`reviews_${id}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);

  const avgRating = reviews.length === 0 
    ? (product?.rating || 0) 
    : (reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length).toFixed(1);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!userName || !userComment) return toast.error("Please fill all fields");

    const newReview = {
      id: Date.now(),
      name: userName,
      rating: userRating,
      comment: userComment,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

    setUserName("");
    setUserComment("");
    setUserRating(5);
    toast.success("Review submitted! Thank you.");
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  if (!product) return <div className="py-40 text-center font-black animate-pulse">LOADING PRODUCT...</div>;

  const discountPrice = product.offer ? Math.round(product.price - (product.price * product.offer) / 100) : product.price;
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <Container className="py-12 font-inter">
      {/* 1. Main Product Section */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Product Image */}
        <div className="relative group">
          <div className="overflow-hidden rounded-[2.5rem] border-4 border-secondary bg-white shadow-xl">
             <img src={product.image} className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" alt={product.name} />
          </div>
          {product.offer > 0 && (
            <span className="absolute top-6 left-6 bg-primary text-white text-xs font-black px-4 py-2 rounded-xl shadow-lg uppercase tracking-widest">
              Save {product.offer}%
            </span>
          )}
        </div>

        {/* Right: Product Content */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2 block">{product.category}</span>
            <h1 className="text-4xl font-black text-primary leading-tight uppercase italic tracking-tighter">{product.name}</h1>
            
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-accent text-sm tracking-tighter">
                {"⭐".repeat(Math.floor(avgRating))}
                {avgRating % 1 !== 0 && "½"}
              </div>
              <span className="text-gray-800 font-black text-sm">{avgRating}</span>
              <span className="h-4 w-px bg-secondary"></span>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest italic">{reviews.length} Verified Reviews</span>
            </div>
          </div>

          <p className="text-gray-500 leading-relaxed font-medium bg-secondary/20 p-6 rounded-2xl border-l-4 border-primary">
            {product.description}
          </p>

          <div className="flex items-end gap-4">
            <p className="text-5xl font-black text-primary">৳{discountPrice}</p>
            {product.offer > 0 && (
                <p className="line-through text-gray-400 font-bold mb-1">৳{product.price}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full animate-pulse ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}></div>
             <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                Availability: <span className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
                  {product.stock > 0 ? `${product.stock} items left in stock` : "Sold Out"}
                </span>
             </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-4 w-full md:w-max px-16 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_-10px_#fbbf24] hover:scale-105 active:scale-95 transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none cursor-pointer"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Shopping Bag"}
          </button>
        </div>
      </div>

      <div className="h-px bg-secondary my-20"></div>

      {/* 2. Review Section Grid */}
      <div className="grid lg:grid-cols-5 gap-16">
        {/* Left: Review List */}
        <div className="lg:col-span-3 space-y-8">
          <h2 className="text-3xl font-black mb-10 text-primary uppercase tracking-tighter italic border-l-8 border-accent pl-4">What People Say</h2>
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-6 rounded-3xl border-2 border-secondary shadow-sm relative group hover:border-accent transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="font-black text-gray-800 uppercase text-sm tracking-tight">{rev.name}</h4>
                        <div className="text-accent text-[8px] mt-1 tracking-tighter">{"⭐".repeat(rev.rating)}</div>
                    </div>
                    <span className="text-[9px] text-gray-300 font-black uppercase italic">{rev.date}</span>
                  </div>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed italic">"{rev.comment}"</p>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-secondary/30 rounded-[3rem] border-2 border-dashed border-secondary">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">No feedback yet. Share yours!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Review Form */}
        <div className="lg:col-span-2">
          <div className="bg-primary p-8 rounded-[2.5rem] shadow-2xl sticky top-24">
            <h2 className="text-xl font-black text-accent uppercase italic mb-6">Drop a Review</h2>
            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="YOUR NAME"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-white/10 border-2 border-white/10 p-4 rounded-2xl outline-none focus:border-accent text-white font-bold placeholder:text-white/30 text-xs"
              />
              <select
                value={userRating}
                onChange={(e) => setUserRating(Number(e.target.value))}
                className="bg-white/10 border-2 border-white/10 p-4 rounded-2xl outline-none text-white font-bold text-xs cursor-pointer focus:border-accent"
              >
                <option value="5" className="text-black">⭐⭐⭐⭐⭐ PERFECT</option>
                <option value="4" className="text-black">⭐⭐⭐⭐ GOOD</option>
                <option value="3" className="text-black">⭐⭐⭐ AVERAGE</option>
                <option value="2" className="text-black">⭐⭐ BAD</option>
                <option value="1" className="text-black">⭐ POOR</option>
              </select>
              <textarea
                placeholder="DESCRIBE YOUR EXPERIENCE..."
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                className="bg-white/10 border-2 border-white/10 p-4 rounded-2xl h-32 outline-none focus:border-accent text-white font-bold placeholder:text-white/30 text-xs resize-none"
              ></textarea>
              <button type="submit" className="bg-accent text-primary py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all text-xs">
                Post Review
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Related Products Section */}
      {related.length > 0 && (
        <div className="mt-32">
          <div className="flex items-center justify-between mb-10 border-b-4 border-secondary pb-4">
              <h2 className="text-3xl font-black mb-10 text-primary uppercase tracking-tighter italic border-l-8 border-accent pl-4">Related Goods</h2>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Based on category</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductDetails;
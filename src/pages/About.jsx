import React from "react";
import Container from "../components/Container";
import settingsData from "../data/settings.json";

const About = () => {
  // Safety check: settingsData না থাকলে এরর এড়ানো
  const storeName = settingsData?.storeName || "Our Store";
  const phoneNumber = settingsData?.contact?.phone || "01995371866";

  return (
    <Container className="py-16 font-inter min-h-screen bg-secondary/10">
      {/* 1. Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 uppercase tracking-tighter">
          About <span className="text-accent">{storeName}</span>
        </h1>
        <div className="h-1.5 w-24 bg-accent mx-auto rounded-full mb-6"></div>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Welcome to {storeName}, your trusted destination for quality and reliability. 
          Discover our journey and why we are different.
        </p>
      </div>

      {/* 2. Content Grid */}
      <div className="grid md:grid-cols-2 gap-12 items-stretch">
        {/* Who We Are Card */}
        <div className="bg-white p-8 md:p-12 rounded-[2rem] border-2 border-secondary shadow-sm">
          <h2 className="text-2xl font-black mb-6 text-primary uppercase flex items-center gap-3">
            <span className="text-accent">●</span> Who We Are
          </h2>
          <div className="space-y-4 text-gray-600 leading-7">
            <p>
              <strong className="text-gray-800">{storeName}</strong> is a modern online shopping platform 
              dedicated to bringing you premium products at prices that make sense. We bridge the gap 
              between quality and affordability.
            </p>
            <p>
              Started with a vision to simplify e-commerce in Bangladesh, we focus on a seamless 
              experience, ensuring that every product you receive meets our strict quality standards.
            </p>
            <p className="bg-secondary/50 p-4 rounded-xl italic border-l-4 border-accent">
              "Our goal is to make online shopping simple, fast, and reliable for everyone."
            </p>
          </div>
        </div>

        {/* Why Choose Us Card */}
        <div className="bg-primary p-8 md:p-12 rounded-[2rem] shadow-xl text-white flex flex-col justify-center">
          <h3 className="text-2xl font-black mb-8 text-accent uppercase italic tracking-wider">
            Why Choose Us?
          </h3>
          <ul className="space-y-5">
            {[
              "Quality & Original Products",
              "Affordable Pricing for All",
              "Instant Order via WhatsApp",
              "Super Fast Response Time",
              "100% Secure Shopping Experience"
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-4 group">
                <span className="bg-accent text-primary w-7 h-7 rounded-full flex items-center justify-center font-black text-sm shrink-0 group-hover:scale-110 transition-transform">
                  ✓
                </span>
                <span className="text-lg font-medium text-white/90">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Icon Section (Trust Badges) */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { icon: "🛍️", title: "Wide Range", desc: "Selected Products" },
          { icon: "🚚", title: "Fast Delivery", desc: "All Over BD" },
          { icon: "🔒", title: "Secure Pay", desc: "Trusted Methods" },
          { icon: "📞", title: "24/7 Support", desc: "Via WhatsApp" }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-secondary group hover:border-accent transition-colors">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h4 className="font-bold text-primary text-sm uppercase tracking-wider">{item.title}</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 4. Footer Contact Call to Action */}
      <div className="mt-24 text-center bg-white p-10 rounded-[2.5rem] border-4 border-secondary shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16"></div>
        <h2 className="text-3xl font-black mb-4 text-primary uppercase">
          Still Have Questions?
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Our friendly support team is ready to assist you directly on WhatsApp.
        </p>
        <a 
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-accent text-primary font-black py-4 px-10 rounded-2xl uppercase tracking-widest hover:brightness-105 active:scale-95 transition-all shadow-lg"
        >
          <span className="text-2xl">💬</span> WhatsApp: {phoneNumber}
        </a>
      </div>
    </Container>
  );
};

export default About;
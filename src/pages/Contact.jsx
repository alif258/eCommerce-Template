import React, { useState } from "react";
import Container from "../components/Container";
import settingsData from "../data/settings.json";

const Contact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsAppMessage = () => {
    if (!message) return alert("Please write your message");

    // JSON থেকে সঠিক নম্বরটি নেওয়া হচ্ছে
    const phoneNumber = settingsData.contact.phone; 
    const storeName = settingsData.storeName;

    // মেসেজ টেক্সট ফরমেট করা
    let text = `Hello, I want to contact ${storeName}%0A`;
    if (name) text += `*Name:* ${name}%0A`;
    text += `*Message:* ${message}`;

    // WhatsApp URL তৈরি করা
    const waUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${text}`;
    
    // নতুন ট্যাবে ওপেন করা
    window.open(waUrl, "_blank");
  };

  return (
    <Container className="py-12 font-inter">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-primary mb-3 uppercase tracking-tight">
          Contact Us
        </h1>
        <div className="h-1 w-20 bg-accent mx-auto mb-4 rounded-full"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have any questions or need help? Feel free to contact us anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="bg-white border-2 border-secondary p-8 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-black mb-6 text-primary uppercase">
            Get in Touch
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="bg-secondary p-3 rounded-xl text-xl text-primary">📍</span>
              <div>
                <p className="font-bold text-gray-800">Address</p>
                <p className="text-gray-600 text-sm">{settingsData.contact.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="bg-secondary p-3 rounded-xl text-xl text-primary">📞</span>
              <div>
                <p className="font-bold text-gray-800">Phone / WhatsApp</p>
                <p className="text-gray-600 text-sm">{settingsData.contact.phone}</p>
              </div>
            </div>

            {settingsData.contact.email && (
              <div className="flex items-start gap-4">
                <span className="bg-secondary p-3 rounded-xl text-xl text-primary">📧</span>
                <div>
                  <p className="font-bold text-gray-800">Email Address</p>
                  <p className="text-gray-600 text-sm">{settingsData.contact.email}</p>
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-10 p-4 bg-secondary/50 rounded-2xl italic text-center">
            "We usually respond within a short time on WhatsApp."
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white border-2 border-secondary p-8 rounded-3xl shadow-lg relative overflow-hidden">
          <h2 className="text-2xl font-black mb-6 text-primary uppercase leading-none">
            Send a Message
          </h2>

          <div className="flex flex-col gap-5">
            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-secondary bg-secondary/20 px-4 py-3 rounded-2xl focus:outline-none focus:border-accent transition-all font-medium"
                />
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Message Body</label>
                <textarea
                  placeholder="How can we help you?"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-2 border-secondary bg-secondary/20 px-4 py-3 rounded-2xl focus:outline-none focus:border-accent transition-all font-medium"
                />
            </div>

            <button
              onClick={handleWhatsAppMessage}
              className="bg-accent text-primary font-black uppercase tracking-widest py-4 rounded-2xl shadow-[0_8px_20px_-8px_#fbbf24] hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="text-xl">💬</span> Send via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
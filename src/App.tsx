/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Utensils, 
  Weight, 
  Package, 
  Star, 
  ChevronDown, 
  Phone, 
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface OrderData {
  name: string;
  phone: string;
  location: string;
  quantity: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

// --- Mock Data ---
const PRICE_LIST = [
  { item: 'হিমসাগর (Himsagar)', price: '১২০ টাকা / কেজি', box: '৫ কেজি বক্স - ৫৫০ টাকা' },
  { item: 'ল্যাংড়া (Langra)', price: '১১০ টাকা / কেজি', box: '৫ কেজি বক্স - ৫০০ টাকা' },
  { item: 'আম্রপালি (Amrapali)', price: '১০০ টাকা / কেজি', box: '৫ কেজি বক্স - ৪৫০ টাকা' },
  { item: 'ফজলি (Fazli)', price: '৯০ টাকা / কেজি', box: '১০ কেজি ক্যারেট - ৮৫০ টাকা' },
];

const FAQS = [
  { 
    question: 'ডেলিভারি চার্জ কত?', 
    answer: 'ঢাকা সিটির ভেতরে ডেলিভারি চার্জ ৮০ টাকা। ঢাকার বাইরে কুরিয়ার সার্ভিসের মাধ্যমে ডেলিভারি করা হয়, যার চার্জ কুরিয়ার কোম্পানি অনুযায়ী নির্ধারিত হবে।' 
  },
  { 
    question: 'আম পচা হলে কি করবেন?', 
    answer: 'আমরা অত্যন্ত যত্নের সাথে আম প্যাকেজিং করি। তবে পরিবহনের সময় আম পচে গেলে বা নষ্ট হলে, আমাদের জানানো মাত্রই আমরা পরবর্তী অর্ডারে তা সমন্বয় করি অথবা সমমূল্যের আম পুনরায় পাঠিয়ে দেই।' 
  },
  { 
    question: 'আমগুলো কি সত্যিই কার্বাইড মুক্ত?', 
    answer: 'হ্যাঁ, আমাদের প্রতিটি আম সরাসরি বাগান থেকে গাছপাকা সংগ্রহ করা হয় এবং কোনো প্রকার ক্ষতিকারক কেমিক্যাল বা কার্বাইড ব্যবহার করা হয় না।' 
  },
];

const REVIEWS: Review[] = [
  { id: 1, name: 'আরিফুল হক', rating: 5, comment: 'রাজশাহীর আসল আমের স্বাদ পেলাম অনেক দিন পর। আমগুলো অনেক মিষ্টি ছিল।', date: '২ দিন আগে' },
  { id: 2, name: 'ফারিয়া সুলতানা', rating: 5, comment: 'প্যাকেজিং টা খুব ভালো ছিল। একটি আমও নষ্ট হয়নি। ধন্যবাদ আপনাদের!', date: '১ সপ্তাহ আগে' },
  { id: 3, name: 'জাকির হোসেন', rating: 4, comment: 'সাতক্ষীরার হিমসাগর আমের কালেকশন সত্যিই অসাধারণ। ডেলিভারিও দ্রুত পেয়েছি।', date: '৩ দিন আগে' },
  { id: 4, name: 'মেহেদী হাসান', rating: 5, comment: 'কার্বাইড মুক্ত আমের জন্য আপনাদের উপর ভরসা করা যায়। স্বাদ ও গন্ধে অতুলনীয়।', date: '৪ দিন আগে' },
];

// --- Components ---

const Header = () => (
  <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-mango/20 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-mango rounded-full flex items-center justify-center shadow-lg">
          <Utensils className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-display text-leaf font-bold leading-none">Premium Mango</h1>
          <p className="text-xs text-orange-600 font-bengali font-semibold tracking-wide">সরাসরি বাগান থেকে</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-6 font-bengali">
        <a href="#origin" className="hover:text-mango transition-colors font-medium">উৎপত্তি</a>
        <a href="#features" className="hover:text-mango transition-colors font-medium">বৈশিষ্ট্য</a>
        <a href="#pricing" className="hover:text-mango transition-colors font-medium">মূল্য তালিকা</a>
        <a href="#order" className="bg-mango text-white px-5 py-2 rounded-full hover:bg-mango-dark transition-all transform hover:scale-105 shadow-md">অর্ডার করুন</a>
      </div>

      <a 
        href="https://wa.me/8801234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors shadow-md"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline font-bengali font-bold">WhatsApp</span>
      </a>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
    {/* Background Image with Overlay */}
    <div 
      className="absolute inset-0 z-0 bg-cover bg-center"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=2000")' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-earth/80 via-earth/40 to-transparent"></div>
    </div>

    <div className="container relative z-10 mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-white"
      >
        <span className="inline-block bg-mango text-earth px-4 py-1 rounded-full text-sm font-bold font-bengali mb-4 shadow-lg">
          নিরাপদ ও সুস্বাদু আমের নিশ্চয়তা
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-black leading-tight mb-6 text-cream">
          রাজশাহী ও সাতক্ষীরার সেরা আম এখন <span className="text-mango">আপনার ঘরে।</span>
        </h2>
        <p className="text-lg md:text-xl font-bengali mb-8 text-cream/90 leading-relaxed">
          বাছাইকৃত হিমসাগর, ল্যাংড়া ও আম্রপালি আমের সমারোহ। সরাসরি বাগান থেকে সংগৃহীত এবং কার্বাইড বিহীন শতভাগ ফ্রেশ আমের গ্যারান্টি।
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="#order" 
            className="flex items-center gap-2 bg-mango text-earth px-8 py-4 rounded-xl font-bengali font-extrabold text-xl hover:bg-white transition-all transform hover:-translate-y-1 shadow-xl"
          >
            এখনই অর্ডার করুন <ArrowRight size={24} />
          </a>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-mango overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <span className="text-sm font-bengali font-medium">৫০০+ সন্তুষ্ট ক্রেতা</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Origins = () => (
  <section id="origin" className="py-20 bg-cream">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl text-leaf font-bold font-bengali mb-4">আমাদের আমের প্রধান উৎস</h3>
        <div className="w-24 h-1.5 bg-mango mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: 'রাজশাহী', desc: 'আমের রাজধানী হিসেবে খ্যাত, সেরা হিমসাগর ও ল্যাংড়ার জন্য সেরা।', icon: <MapPin className="text-red-500" /> },
          { name: 'সাতক্ষীরা', desc: 'আগেভাগে পাকা এবং অত্যন্ত মিষ্টি হিমসাগরের জন্য বিখ্যাত।', icon: <MapPin className="text-orange-500" /> },
          { name: 'সাপাহার', desc: 'বিশাল এলাকা জুড়ে গড়ে ওঠা আম্রপালি আমের স্বর্গরাজ্য।', icon: <MapPin className="text-green-500" /> },
        ].map((origin, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-mango/10 flex flex-col items-center text-center group transition-all hover:shadow-xl"
          >
            <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-mango transition-colors">
              {origin.icon}
            </div>
            <h4 className="text-2xl font-bengali font-bold text-earth mb-4">{origin.name}</h4>
            <p className="text-earth/70 font-bengali leading-relaxed">{origin.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-20 bg-leaf relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
      <div className="absolute top-10 left-10 transform -rotate-12">
        <Utensils size={200} />
      </div>
      <div className="absolute bottom-10 right-10 transform rotate-12">
        <Package size={200} />
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl text-white font-bold font-bengali mb-4">কেন আমাদের আম সেরা?</h3>
        <div className="w-24 h-1.5 bg-mango mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'কার্বাইড মুক্ত', icon: <ShieldCheck size={32} />, desc: '১০০% প্রাকৃতিকভাবে পাকা আমের নিশ্চয়তা।' },
          { title: 'তাজা ও মিষ্টি', icon: <Star size={32} />, desc: 'সেরা স্বাদের আম সরাসরি বাগান থেকে আপনার হাতে।' },
          { title: 'সঠিক ওজন', icon: <Weight size={32} />, desc: 'প্রতি কেজি ওজনে কোনো প্রকার কারচুপি নেই।' },
          { title: 'নিরাপদ প্যাকেজিং', icon: <Package size={32} />, desc: 'মজবুত বক্সে আমগুলো পৌঁছাবে শতভাগ সুরক্ষিত ভাবে।' },
        ].map((feature, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white hover:bg-white/20 transition-colors">
            <div className="text-mango mb-4">{feature.icon}</div>
            <h4 className="text-xl font-bold font-bengali mb-2">{feature.title}</h4>
            <p className="text-white/80 text-sm font-bengali">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PricingAndFAQ = () => (
  <section id="pricing" className="py-20 bg-cream">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Pricing Table */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-mango rounded-xl flex items-center justify-center text-white shadow-lg">
              <Utensils />
            </div>
            <h3 className="text-3xl font-display font-bold text-leaf font-bengali">আমের মূল্য তালিকা</h3>
          </div>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-mango/10">
            <table className="w-full font-bengali">
              <thead className="bg-leaf text-white text-left">
                <tr>
                  <th className="p-4 md:p-6">আমের ধরন</th>
                  <th className="p-4 md:p-6">প্রতি কেজি (KG)</th>
                  <th className="p-4 md:p-6 hidden md:table-cell">বক্স (Box Offer)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mango/10">
                {PRICE_LIST.map((p, i) => (
                  <tr key={i} className="hover:bg-cream/50 transition-colors">
                    <td className="p-4 md:p-6 font-bold text-leaf">{p.item}</td>
                    <td className="p-4 md:p-6">{p.price}</td>
                    <td className="p-4 md:p-6 hidden md:table-cell text-orange-600 font-semibold">{p.box}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 bg-orange-50 text-orange-800 text-sm font-bengali text-center">
              * বাজার দর এবং জোগান অনুযায়ী দাম কিছুটা পরিবর্তন হতে পারে।
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-leaf rounded-xl flex items-center justify-center text-white shadow-lg">
              <MessageCircle />
            </div>
            <h3 className="text-3xl font-display font-bold text-leaf font-bengali">সাধারণ কিছু জিজ্ঞাসা (FAQ)</h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-2xl border border-mango/10 p-4 shadow-sm hover:shadow-md transition-all">
                <summary className="flex items-center justify-between cursor-pointer list-none font-bold font-bengali text-lg text-earth">
                  <span>{faq.question}</span>
                  <ChevronDown className="text-mango group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-earth/70 font-bengali leading-relaxed border-t border-mango/5 pt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 p-6 bg-leaf rounded-2xl text-white">
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bengali font-bold text-lg">ডেলিভারি সময়:</h4>
                <p className="font-bengali text-sm text-white/80">অর্ডারের ২৪-৪৮ ঘণ্টার মধ্যে ঢাকা সিটির ভেতরে ডেলিভারি সম্পন্ন করা হয়।</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Reviews = () => (
  <section className="py-20 bg-earth relative">
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl text-cream font-bold font-bengali mb-4">ক্রেতাদের মতামত</h3>
        <div className="w-24 h-1.5 bg-mango mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((review) => (
          <div key={review.id} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-cream">
            <div className="flex gap-1 text-mango mb-4">
              {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="italic font-bengali mb-6 text-cream/80 text-sm leading-relaxed">"{review.comment}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-mango/20 flex items-center justify-center font-bold text-mango">
                {review.name[0]}
              </div>
              <div>
                <p className="font-bold font-bengali text-sm">{review.name}</p>
                <p className="text-xs text-cream/50 font-bengali">{review.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const OrderForm = () => {
  const [formData, setFormData] = useState<OrderData>({
    name: '',
    phone: '',
    location: '',
    quantity: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock backend integration
    setTimeout(() => {
      console.log('Order received:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', location: '', quantity: '' });
    }, 1500);
  };

  return (
    <section id="order" className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative vector-like background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(#2E7D32_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-mango/20">
          {/* Form Side */}
          <div className="p-8 md:p-12 flex-1">
            <div className="mb-8">
              <h3 className="text-3xl font-display font-black text-leaf font-bengali mb-2">সাশ্রয়ী দামে সেরা আম নিন</h3>
              <p className="text-earth/60 font-bengali">নিচের ফর্মটি পূরণ করুন, আমরা আপনার সাথে যোগাযোগ করব।</p>
            </div>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6 font-bengali"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-earth">আপনার নাম</label>
                      <input 
                        type="text" 
                        required
                        placeholder="নাম লিখুন"
                        className="w-full px-5 py-4 rounded-xl border border-mango/20 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none transition-all"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-earth">ফোন নম্বর (প্রয়োজনীয়)</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="০১৭... নম্বরটি দিন"
                        className="w-full px-5 py-4 rounded-xl border border-mango/20 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none transition-all"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth">ডেলিভারি ঠিকানা</label>
                    <input 
                      type="text" 
                      required
                      placeholder="বিস্তারিত ঠিকানা লিখুন"
                      className="w-full px-5 py-4 rounded-xl border border-mango/20 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none transition-all"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth">আমের পরিমাণ (কেজি/মণ)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="যেমন: ৫ কেজি বা ১ মণ"
                      className="w-full px-5 py-4 rounded-xl border border-mango/20 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none transition-all"
                      value={formData.quantity}
                      onChange={e => setFormData({...formData, quantity: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-mango text-white rounded-xl font-bold text-xl font-bengali hover:bg-mango-dark transition-all transform active:scale-95 shadow-xl flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>এখনই অর্ডার করুন <ChevronDown size={24} className="-rotate-90" /></>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-leaf rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
                    <CheckCircle size={40} />
                  </div>
                  <h4 className="text-3xl font-bold font-bengali text-leaf mb-2">ধন্যবাদ!</h4>
                  <p className="text-lg font-bengali text-earth/70 mb-8">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। অল্পক্ষণের মধ্যেই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-leaf underline font-bold font-bengali"
                  >
                    আরেকটি অর্ডার করুন
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info Side */}
          <div className="bg-leaf p-8 md:p-12 text-white flex flex-col justify-center min-w-[320px]">
            <h4 className="text-2xl font-bold font-bengali mb-8">সরাসরি যোগাযোগ করুন</h4>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-bengali opacity-70">কল করুন (সকাল ১০ - রাত ১০)</p>
                  <p className="text-xl font-bold font-display">+880 1234 567890</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-bengali opacity-70">WhatsApp মেসেজ দিন</p>
                  <p className="text-xl font-bold font-display">+880 1234 567890</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-bengali opacity-70">ক্যাশ অন ডেলিভারি</p>
                  <p className="text-xl font-bold font-bengali">আম বুঝে পেয়ে মূল্য পরিশোধ করুন</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/10 rounded-2xl border border-white/20">
              <p className="text-sm font-bengali italic opacity-80">"বাগান থেকে সরাসরি টাটকা ও নিরাপদ ফল পরিবেশন করাই আমাদের মূল লক্ষ্য।"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-earth text-cream py-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Utensils className="text-mango w-8 h-8" />
        <h2 className="text-2xl font-display font-bold">Premium Mango</h2>
      </div>
      <p className="max-w-md mx-auto font-bengali text-cream/70 mb-8">
        রাজশাহী ও সাতক্ষীরার সেরা আমের নিশ্চয়তা নিয়ে আমরা আছি আপনার পাশে। খাঁটি ও কেমিক্যাল মুক্ত আমের স্বাদ নিতে আমাদের সাথেই থাকুন।
      </p>
      <div className="flex justify-center gap-6 mb-8">
        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-mango transition-colors"><MessageCircle size={20} /></a>
        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-mango transition-colors"><Phone size={20} /></a>
      </div>
      <div className="text-xs font-bengali opacity-40">
        © ২০২৪ Premium Bangladeshi Mangoes. সর্বস্বত্ব সংরক্ষিত।
      </div>
    </div>
  </footer>
);

const FloatingWhatsApp = () => (
  <a 
    href="https://wa.me/8801234567890" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
    aria-label="Contact on WhatsApp"
  >
    <MessageCircle size={32} />
    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-earth text-white px-3 py-1 rounded-md text-xs font-bengali whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
      সরাসরি কথা বলুন
    </span>
  </a>
);

export default function App() {
  return (
    <div className="selection:bg-mango selection:text-earth">
      <Header />
      <main>
        <Hero />
        <Origins />
        <Features />
        <PricingAndFAQ />
        <Reviews />
        <OrderForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

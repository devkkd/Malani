"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Container from "@/components/website/Container";
import { Trash2, ArrowRight, ShoppingCart, CheckCircle, AlertCircle } from "lucide-react";
import { useInquiry } from "@/context/CartContext";
import EthicalFoundation from "@/components/website/EthicalData";

const CartPage = () => {
  const router = useRouter();
  const { inquiries, removeInquiry, clearInquiries, getTotalItems, isLoading } = useInquiry();
  
  console.log("inquiry",inquiries);
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Auto-close modal and redirect after 5 seconds
  React.useEffect(() => {
    if (showSuccessModal) {
      setCountdown(5); // Reset countdown
      
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const timer = setTimeout(() => {
        closeSuccessModal();
      }, 5000); // 5 seconds

      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
      };
    }
  }, [showSuccessModal]);

  // Close modal handler
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setFormStatus({
      loading: false,
      success: false,
      error: null
    });
    // Redirect to home page
    router.push('/');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      setFormStatus({
        loading: false,
        success: false,
        error: "Please fill in all required fields"
      });
      return;
    }

    setFormStatus({ loading: true, success: false, error: null });

    try {
      const inquiryData = {
        ...formData,
        products: inquiries.map(item => ({
          productId: item.id || item._id,
          name: item.name,
          modelNumber: item.modelNumber || item.model_number,
          category: item.category,
          images: item.images
        })),
        totalItems: getTotalItems(),
        submittedAt: new Date().toISOString()
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product-inquiries`,
        inquiryData
      );

      if (response.data.success) {
        setFormStatus({
          loading: false,
          success: true,
          error: null
        });

        // Show success modal
        setShowSuccessModal(true);

        // Clear form and cart after delay
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            location: "",
            message: ""
          });
          clearInquiries();
        }, 3000);
      }

    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setFormStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || "Failed to submit inquiry. Please try again."
      });
    }
  };


  // Loading state
  if (isLoading) {
    return (
      <section className="w-full bg-[#FFFEF5] py-20 px-4 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#666141] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your cart...</p>
        </div>
      </section>
    );
  }

  // --- EMPTY STATE ---
  if (inquiries.length === 0) {
    return (
      <section className="w-full bg-[#FFFEF5] py-20 px-4 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-[#f0eee0] rounded-full flex items-center justify-center mb-6 text-[#666141]">
          <ShoppingCart size={32} />
        </div>
        <h2 className="text-2xl md:text-3xl text-[#666141] font-normal mb-2 text-center">
          Your Inquiry List is Empty
        </h2>
        <p className="text-gray-500 max-w-sm text-center text-sm md:text-base mb-6">
          Start adding items from our collections to request a customized quote.
        </p>
        <Link 
          href="/seasons"
          className="bg-[#666141] text-[#FFFEF5] px-8 py-3 rounded-lg hover:bg-[#535036] transition-all"
        >
          Browse Collections
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#FFFEF5] py-12 md:py-20 px-4">
      <Container>

        {/* Success Modal */}
        {showSuccessModal && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={closeSuccessModal}
          >
            <div 
              className="bg-[#FFFEF5] rounded-2xl shadow-2xl max-w-md w-full p-8 md:p-10 relative animate-slideUp border border-[#666141]/10"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Success Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-[#666141] to-[#535036] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle size={40} className="text-[#FFFEF5]" strokeWidth={2.5} />
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl text-[#666141] text-center mb-3 font-normal">
                Inquiry Sent Successfully!
              </h2>

              {/* Message */}
              <p className="text-gray-600 text-center text-sm md:text-base leading-relaxed mb-2">
                Thank you for your interest in our products. Our team will review your inquiry and get back to you within
              </p>
              <p className="text-[#666141] text-center text-lg font-medium mb-8">
                24 hours
              </p>

              {/* Decorative Line */}
              <div className="w-16 h-1 bg-[#666141]/20 mx-auto mb-8 rounded-full"></div>

              {/* Info Box */}
              <div className="bg-[#FFFCEA] border border-[#666141]/10 rounded-xl p-4 mb-6">
                <p className="text-xs text-gray-600 text-center leading-relaxed">
                  We've sent a confirmation email to <span className="font-semibold text-[#666141]">{formData.email}</span>
                </p>
              </div>

              {/* Countdown Timer with Progress Bar */}
              <div className="mb-8">
                <div className="text-center mb-3">
                  <p className="text-sm text-gray-500">
                    Redirecting to home in <span className="font-bold text-[#666141] text-lg">{countdown}</span> seconds...
                  </p>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#666141] to-[#535036] transition-all duration-1000 ease-linear"
                    style={{ width: `${(countdown / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Browse Collections Button */}
              <Link
                href="/"
                onClick={closeSuccessModal}
                className="w-full bg-[#666141] text-[#FFFEF5] py-4 rounded-xl font-medium text-base hover:bg-[#535036] transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                Go to Home
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Close Text */}
              <button
                onClick={closeSuccessModal}
                className="w-full mt-4 text-gray-500 hover:text-[#666141] text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-12 border-b border-[#666141]/10 pb-6">
          <h1 className="text-3xl md:text-4xl text-[#666141]">
            Request a Quote
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Review your selected items and submit your details for a wholesale price consultation.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle size={16} className="text-green-600" />
            <span>Your cart items are saved for 7 days</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ================= LEFT: INQUIRY ITEMS LIST ================= */}
          <div className="lg:col-span-7 space-y-6">

            <div className="space-y-4">
              {inquiries.map((item) => (
                <div
                  key={item.id || item._id}
                  className="group relative flex flex-col sm:flex-row gap-5 p-4 sm:p-5 bg-white border border-[#666141]/10 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                    {item.images && item.images.length > 0 ? (
                      <Image
                        src={typeof item.images[0] === 'string' ? item.images[0] : item.images[0]?.url || '/placeholder.png'}
                        alt={item.name}
                        fill
                        sizes="128px"
                        quality={85}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                        unoptimized={
                          (typeof item.images[0] === 'string' && item.images[0].includes('r2.dev')) ||
                          (item.images[0]?.url && item.images[0].url.includes('r2.dev'))
                        }
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <h3 className="text-[#2c2c2c] font-medium text-lg leading-tight mb-1">
                          {item.name}
                        </h3>
                        {(item.modelNumber || item.model_number) && (
                          <p className="text-xs text-gray-500 font-medium mb-1">
                            Model: {item.modelNumber || item.model_number}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                          {item.category?.replace("-", " ") || "Collection"}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeInquiry(item.id || item._id)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Additional Info / Specs */}
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.material && <span>Material: {item.material}</span>}
                      {item.season && <span>Season: {item.season}</span>}
                    </div>


                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ================= RIGHT: CONSULTATION FORM ================= */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFFCEA] p-6 md:p-8 rounded-2xl border border-[#666141]/10 sticky top-24 shadow-sm">

              <div className="mb-6">
                <h2 className="text-2xl text-[#666141]">Consultation</h2>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-medium">Your Information</p>
              </div>

              {/* Error Message */}
              {formStatus.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-medium text-sm">Error</p>
                    <p className="text-red-600 text-xs mt-1">{formStatus.error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    required
                    className="w-full px-4 py-3 bg-white border border-[#666141]/10 rounded-lg focus:outline-none focus:border-[#666141] focus:ring-1 focus:ring-[#666141] text-gray-800 placeholder-gray-300 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. john@company.com"
                    required
                    className="w-full px-4 py-3 bg-white border border-[#666141]/10 rounded-lg focus:outline-none focus:border-[#666141] focus:ring-1 focus:ring-[#666141] text-gray-800 placeholder-gray-300 transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 43210"
                    required
                    className="w-full px-4 py-3 bg-white border border-[#666141]/10 rounded-lg focus:outline-none focus:border-[#666141] focus:ring-1 focus:ring-[#666141] text-gray-800 placeholder-gray-300 transition-all"
                  />
                </div>

                {/* Grid: Company & Country */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Optional"
                      className="w-full px-4 py-3 bg-white border border-[#666141]/10 rounded-lg focus:outline-none focus:border-[#666141] text-gray-800 placeholder-gray-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase">City / Country</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Jaipur, India"
                      className="w-full px-4 py-3 bg-white border border-[#666141]/10 rounded-lg focus:outline-none focus:border-[#666141] text-gray-800 placeholder-gray-300"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Additional Notes</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Specific requirements, quantities, or customization requests..."
                    className="w-full px-4 py-3 bg-white border border-[#666141]/10 rounded-lg focus:outline-none focus:border-[#666141] focus:ring-1 focus:ring-[#666141] text-gray-800 placeholder-gray-300 resize-none transition-all"
                  />
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-2 border-t border-[#666141]/5">
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                    <span>Total Inquiry Items:</span>
                    <span className="text-xl font-bold text-[#666141]">{getTotalItems()}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus.loading || formStatus.success}
                    className="w-full bg-[#666141] text-[#FFFEF5] py-4 rounded-xl font-medium text-lg hover:bg-[#535036] transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus.loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : formStatus.success ? (
                      <>
                        <CheckCircle size={20} />
                        Sent Successfully
                      </>
                    ) : (
                      <>
                        Send Inquiry Now
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-gray-400 mt-3">
                    By clicking send, you agree to receive a quote via email/phone.
                  </p>
                </div>

              </form>
            </div>
          </div>

        </div>
      </Container>
      <Container>
        <EthicalFoundation />
      </Container>
    </section>
  );
};

export default CartPage;
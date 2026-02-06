"use client";
import Container from '@/components/website/Container';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import EthicalFoundation from '@/components/website/EthicalData';

const ContactPage = () => {
  const inquiryTypes = [
    'Product Question',
    'Custom Order',
    'Wholesale Inquiry',
    'Partnership Opportunity',
    'Press Inquiry',
    'Other',
  ];

  return (
    <section className="w-full bg-[#FFFEF5] py-12 md:py-20 px-4 md:px-8">
      <Container>
        <div className="max-w-[1200px] mx-auto">

          {/* --- Header --- */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl text-[#666141]">
              Contact Us Malani Impex
            </h1>
            <div className="space-y-1">
              <p className="text-black text-lg md:text-xl font-medium">Get in Touch</p>
              <p className="text-black text-lg md:text-xl font-medium">
                We Would Be Delighted to Hear from You
              </p>
            </div>
          </div>

          {/* --- Main Form Card --- */}
          <div className="bg-[#FFFCEA] border border-[#666141]/20 rounded-[30px] p-6 md:p-12 mb-20 shadow-sm">
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

                {/* --- Left Column: Your Information --- */}
                <div className="space-y-6">
                  <h3 className="text-black text-lg font-medium mb-6">Contact Us</h3>

                  <div className="space-y-1">
                    <label className="text-sm text-black ml-1">Your Information</label>
                  </div>

                  <div className="space-y-5">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs text-black ml-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter Full Name"
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#666141] transition-colors placeholder:text-gray-300"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs text-black ml-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter Email Address"
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#666141] transition-colors placeholder:text-gray-300"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-xs text-black ml-1">Phone/WhatsApp Number</label>
                      <input
                        type="tel"
                        placeholder="Enter Phone/WhatsApp Number"
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#666141] transition-colors placeholder:text-gray-300"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="space-y-1">
                      <label className="text-xs text-black ml-1">Company Name (if applicable)</label>
                      <input
                        type="text"
                        placeholder="Enter Company Name (if applicable)"
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#666141] transition-colors placeholder:text-gray-300"
                      />
                    </div>

                    {/* Country */}
                    <div className="space-y-1">
                      <label className="text-xs text-black ml-1">Country</label>
                      <input
                        type="text"
                        placeholder="Enter Country"
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#666141] transition-colors placeholder:text-gray-300"
                      />
                    </div>

                    {/* City */}
                    <div className="space-y-1">
                      <label className="text-xs text-black ml-1">City</label>
                      <input
                        type="text"
                        placeholder="Enter City"
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#666141] transition-colors placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                </div>

                {/* --- Right Column: Inquiry Type & Message --- */}
                <div className="space-y-8">

                  {/* Inquiry Type Radio Group */}
                  <div>
                    <h3 className="text-black text-lg font-medium mb-6">Inquiry Type</h3>
                    <div className="space-y-3">
                      {inquiryTypes.map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="inquiryType"
                            className="w-5 h-5 border-2 border-gray-300 rounded-full text-[#666141] focus:ring-[#666141] appearance-none checked:bg-[#666141] checked:border-transparent transition-all"
                          />
                          <span className="text-sm text-black group-hover:text-[#666141] transition-colors">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-2">
                    <label className="text-sm text-black ml-1">Message</label>
                    <textarea
                      rows={8}
                      placeholder="Write your message"
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#666141] transition-colors placeholder:text-gray-300 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-[#A6A182] hover:bg-[#666141] text-white px-12 py-3 rounded-full text-lg font-medium transition-colors flex items-center gap-2"
                >
                  Send <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* --- Bottom Section: Info & Map --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Contact Details */}
            <div className="space-y-10">
              <h2 className="text-2xl md:text-3xl text-black font-normal">
                Other Ways to Reach Us
              </h2>

              <div className="space-y-8 text-sm md:text-lg">
                <div className="space-y-2">
                  <h4 className="text-black font-medium">Contact Us</h4>
                  <p className="text-gray-600">+91-123567890 | +91-123567890</p>
                  <p className="text-gray-600">info@malaniimpex.com</p>
                  <p className="text-gray-600">wholesale@malaniimpex.com</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-black font-medium">Location</h4>
                  <p className="text-gray-600">Jaipur, Rajasthan India - 302001 INDIA</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-black font-medium">Business Hours:</h4>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM IST</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl text-black font-normal">
                Visit Our Showroom
              </h2>

              <div className="relative w-full aspect-video md:aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-100 border border-gray-200">
                {/* Replace src below with your actual map image or an embed.
                   For now, it uses a placeholder.
                */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#E5E3D5] text-[#666141]">
                  <span className="text-lg font-medium">Map Placeholder</span>
                </div>
                {/* Uncomment line below when you have the image */}
                {/* <Image src="/images/contact/map.png" alt="Map Location" fill className="object-cover" /> */}
              </div>
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

export default ContactPage;
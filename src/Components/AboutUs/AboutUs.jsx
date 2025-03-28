import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <section className="absolute top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mt-10 mb-10">
        {/* Back Button */}
        <button 
          onClick={() => navigate("/")} 
          className="mb-4 text-blue-600 hover:underline"
        >
          &larr; Back
        </button>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Health Tips Blog
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Stay informed with daily health advice and wellness insights.
        </p>

        {/* About Content */}
        <div className="space-y-4 text-gray-700">
          <p>
            Welcome to our Health Tips Blog, where we share expert-backed 
            health advice to help you live a healthier life. Whether you're 
            looking for nutrition tips, fitness guides, or mental well-being 
            strategies, we've got you covered.
          </p>
          <p>
            Our mission is to empower individuals with reliable, up-to-date 
            information so they can make informed health choices. We believe 
            that small, consistent changes lead to long-term wellness.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

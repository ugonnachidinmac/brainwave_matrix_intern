import React from "react";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
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
          Terms and Conditions
        </h1>

        {/* Introduction */}
        <p className="text-gray-600 text-center mb-6">
          Welcome to the Health Tips Blog. Please read our terms before using our platform.
        </p>

        {/* Terms Content */}
        <div className="space-y-4 text-gray-700">
          <h2 className="text-xl font-semibold">1. About Health Tips Blog</h2>
          <p>
            Our blog provides expert-backed health advice to help users make informed 
            wellness decisions. From fitness to mental well-being, we offer insights 
            that promote a healthier lifestyle.
          </p>

          <h2 className="text-xl font-semibold">2. Blog Updates</h2>
          <p>
            Users are allowed to **create** new blog posts. However, **editing** or 
            **deleting** an existing post is not permitted without contacting the blog owner.  
            If you need modifications, please reach out to the admin for approval.
          </p>

          <h2 className="text-xl font-semibold">3. Respect and Responsibility</h2>
          <p>
            By using this blog, you agree to post responsible content that aligns with our 
            health-focused mission. Any misuse of the platform may result in restrictions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;

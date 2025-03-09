import React from "react";
import Sliding from "../../Components/Sliding/Sliding";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <section className="container mx-auto px-4 w-full py-8 overflow-hidden">
      <div className="relative w-full">
        {/* Thick Upper Border */}
        <hr className="border-t-[4px] border-gray-600 w-full" />

        {/* Lighter Lower Border (Positioned Below) */}
        <hr className="border-t-[2px] border-gray-400 w-full absolute top-[6px] left-0" />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full">
        {/* Info Box */}
        <div className="w-full max-w-[500px] p-6 bg-white rounded-lg shadow-2xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out transform hover:scale-105">
          <p className="text-gray-700 text-lg text-center lg:text-left">
            5000+ students have successfully completed our courses, gaining
            valuable skills and certifications to advance their careers and
            personal growth.
          </p>
          <button
            className="mt-4 w-full lg:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 hover:shadow-2xl transition-all duration-300"
            onClick={() => navigate("/enrollmentForm")}
          >
            Register Now
          </button>
        </div>

        {/* Image Slider */}
        <div className="w-full max-w-[500px]">
          <Sliding />
        </div>
      </div>
    </section>
  );
};

export default Register;

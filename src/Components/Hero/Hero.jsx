import React from "react";
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="relative h-auto min-h-[316px] flex items-center justify-center flex-col py-10 px-4 pt-20">
      {/* Background Image */}
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        cloudName="dqtyrjpeh"
        publicId="wofbihero2_kflg8l"
        loading="lazy"
      />
      
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-20 w-full max-w-5xl mx-auto">
        {/* Left Text Container */}
        <div className="flex-1 flex flex-col items-center text-center">
          <h1 className="text-blue-300 font-extrabold text-3xl lg:text-5xl px-6 py-3">
            WOFBI
          </h1>
          <p className="text-green-300 text-xl lg:text-3xl">
            Word Of Faith Bible Institute
          </p>
          <div className="flex gap-7 items-center justify-center text-white mt-[20px] text-[24px] ">
            <button className="hover:text-blue-500">BCC |</button>
            <button className="hover:text-blue-500">LCC |</button>
            <button className="hover:text-blue-500">LDC </button>
          </div>
        </div>

        {/* Enrollment Container */}
        <div className="flex-1 flex flex-col items-center mt-8 lg:mt-[25px] justify-center rounded-lg bg-blue-300 px-6 py-6 lg:px-10 lg:py-10 text-center max-w-md w-full">
          <p className="font-Poppins font-bold text-2xl lg:text-3xl">
            GET STARTED
          </p>
          <p className="text-lg">WITH THE LIVING WORD OF GOD</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300"
            onClick={() => navigate("/enrollmentForm")} // Navigate to EnrollmentForm page
          >
            ENROLL TODAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React from "react";
import { Image } from "cloudinary-react";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[300px] flex items-center justify-center px-4 py-12 sm:py-16 lg:py-20">
      {/* Background Image */}
      <Image
        className="absolute inset-0 w-full h-full object-cover brightness-75"
        cloudName="dqtyrjpeh"
        publicId="healthherobkg1_ebszhb"
        loading="lazy"
      />

      {/* Overlay Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Health Tips Blog
        </h1>
        <p className="text-sm sm:text-base lg:text-lg max-w-xl mx-auto">
          Stay informed with daily health advice and wellness insights.
        </p>
      </div>
    </div>
  );
};

export default Hero;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import { CiLinkedin } from "react-icons/ci";
import { BsFacebook } from "react-icons/bs";
import { LuTwitter } from "react-icons/lu";
import { FiInstagram } from "react-icons/fi";
import { GoArrowUp } from "react-icons/go";

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate(); // For navigation

  const text =
    "Our team of health enthusiasts, writers, and experts is passionate about simplifying wellness. From nutrition and fitness to mental health and self-care, we’re here to support you with content that’s both informative and actionable.";

  return (
    <section className="bg-blue-500 text-left w-full overflow-x-hidden">
      <div className="flex flex-col lg:flex-row justify-between w-full px-4 sm:px-6 lg:px-20 py-6 gap-8 text-sm sm:text-[14px] max-w-full">
        {/* Left Section */}
        <div className="flex flex-col gap-4 w-full lg:w-1/3 max-w-full">
          <div className="flex items-center gap-3 max-w-full">
            <Image
              className="rounded w-10 h-10 object-cover flex-shrink-0"
              cloudName="dqtyrjpeh"
              publicId="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1742246583/healthlogo1_ishmfv.jpg"
              loading="lazy"
            />
            <p className="text-base sm:text-lg lg:text-xl text-black font-bold font-georgia break-words">
              Health Tips Blog
            </p>
          </div>

          <p className="text-black max-w-sm break-words">
            {isExpanded ? text : text.slice(0, 80) + "... "}
            <span
              className="text-pink-800 cursor-pointer whitespace-nowrap"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? " Show less" : " Read more"}
            </span>
          </p>

          <div className="flex gap-4 mt-4 text-xl text-black">
            <CiLinkedin />
            <BsFacebook />
            <LuTwitter />
            <FiInstagram />
          </div>
        </div>

        {/* Center Section (Navigation) */}
        <div className="hidden lg:flex flex-col w-1/3 max-w-full">
          <h4 className="text-base lg:text-lg font-bold text-black font-georgia mb-3">
            Quick Links
          </h4>
          <ul className="text-black text-sm lg:text-base font-normal space-y-3">
            <li 
              className="font-georgia cursor-pointer hover:text-pink-800 transition"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li 
              className="font-georgia cursor-pointer hover:text-pink-800 transition"
              onClick={() => navigate("/aboutUs")}
            >
              About Us
            </li>
            <li 
              className="font-georgia cursor-pointer hover:text-pink-800 transition"
              onClick={() => navigate("/termsAndConditions")}
            >
              Terms and Conditions
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 max-w-full">
          <h4 className="text-base lg:text-lg font-bold text-black font-georgia mb-3">
            Contact Us
          </h4>
          <div className="text-black text-sm lg:text-base font-normal space-y-3 break-words">
            <p className="font-georgia">
              Km3 Airport Road, <br /> Port Harcourt.
            </p>
            <p className="font-georgia break-words">+234 8160677885</p>
            <p className="font-georgia break-words">wofbi@marich.com</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-blue-500 text-center text-black border-t border-white py-3 text-xs sm:text-sm max-w-full">
        &copy; {new Date().getFullYear()} Health Tips Blog. All rights reserved.
      </div>
    </section>
  );
};

export default Footer;

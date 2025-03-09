import React from "react";
import { Image } from "cloudinary-react";
import { CiLinkedin } from "react-icons/ci";
import { BsFacebook } from "react-icons/bs";
import { LuTwitter } from "react-icons/lu";
import { FiInstagram } from "react-icons/fi";
import { GoArrowUp } from "react-icons/go";

const Footer = () => {
  return (
    <>
      <section className="footermain text-left w-full bg-blue-500 overflow-auto">
        <div className="footer text-left flex flex-col lg:flex-row w-full px-[79.5px] pt-[20px] lg:pb-[20px] bg-blue-500 gap-[100px] text-[11px]">
          <div className="left flex flex-col lg:flex-row gap-[100px] w-full">
            {/* Logo and About Section */}
            <div id="contact" className="flex flex-col w-full lg:w-auto">
              <div className="logoContainer flex items-center gap-[12px]">
                <Image
                  className="rounded w-[40px]"
                  cloudName="dqtyrjpeh"
                  publicId="wofbi_logo_vn8pwr"
                />
                <p className="text-[16px] lg:text-[20px] text-black font-bold font-georgia">
                  WOFBI
                </p>
              </div>
              <div className="textAndIcon w-full max-w-[326px]">
              <p className="text-[9px] lg:text-[13px] font-normal text-black mt-[15px] font-georgia line-clamp-2">
  The Word of Faith Bible Institute (WOFBI) is the Leadership and Training arm of the Living Faith Church Worldwide. Established on the 1st of September, 1986 in Kaduna...
</p>

                <div className="flex gap-[15px] lg:gap-[25px] mt-[25px]">
                  <CiLinkedin />
                  <BsFacebook />
                  <LuTwitter />
                  <FiInstagram />
                </div>
              </div>

              {/* Hidden Navigation for Small Screens */}
              <div className="hiddenBox lg:hidden mt-[40px] w-full text-[16px] lg:text-[20px] text-black font-bold">
                <div className="flex justify-between w-full pb-[20px]">
                  <p className="heading whitespace-nowrap">Quick Links</p>
                  <GoArrowUp />
                </div>
                <div className="flex justify-between w-full pb-[20px]">
                  <p className="heading whitespace-nowrap">Opening hours</p>
                  <GoArrowUp />
                </div>
                <div className="flex justify-between w-full">
                  <p className="heading whitespace-nowrap">Contact us</p>
                  <GoArrowUp />
                </div>
              </div>
            </div>

            {/* Navigation Links Section */}
            <div className="navigations hidden lg:flex flex-col lg:flex-row gap-[50px] w-full lg:w-auto">
              <div className="w-full lg:w-auto">
              <h4 className="text-[16px] w-full  lg:text-[20px] font-bold text-black font-georgia whitespace-nowrap">
  Quick Links
</h4>

<ul className="text-black text-[16px] lg:text-[18px] font-normal">
  <li className="mt-[15px] font-georgia whitespace-nowrap">Home</li>
  <li className="mt-[15px] font-georgia whitespace-nowrap">About WOFBI</li>
  <li className="mt-[15px] font-georgia whitespace-nowrap">Course</li>
</ul>

              </div>
            </div>
          </div> {/* Closing left div properly */}

          {/* Right Side */}
          <div className="rightSide hidden lg:flex gap-[100px] w-full">
            <div className="flex flex-col w-full lg:w-[250px]">
              <h4 className="text-[16px] lg:text-[20px] font-bold text-black font-georgia">
                Opening Hours
              </h4>
              <ul className="pl-[5px] w-full text-black text-[16px] lg:text-[18px] font-normal">
                <li className="mt-[15px] font-georgia">
                  Mon - Fri : 09:00am - 04:00pm
                </li>
                <li className="mt-[15px] font-georgia">
                  Saturday: 10:00am - 12:00pm
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="contact w-full lg:w-auto">
              <h4 className="text-[16px] lg:text-[20px] font-bold text-black font-georgia">
                Contact Us
              </h4>
              <div className="mt-[15px] text-black text-[16px] lg:text-[18px] font-normal">
                <p className="font-georgia">
                  Km3 Airport Road, <br /> Port Harcourt.
                </p>
              </div>
              <div className="mt-[15px] text-black text-[16px] lg:text-[18px] font-normal">
                <p className="font-georgia">+234 8160677885</p>
              </div>
              <div className="mt-[15px] text-black text-[16px] lg:text-[18px] font-normal">
                <p className="font-georgia">wofbi@marich.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="bg-blue-500 w-full text-center text-black border-t-[0.005px] border-white">
          Copyright &copy; {new Date().getFullYear()}
        </div>
      </section>
    </>
  );
};

export default Footer;

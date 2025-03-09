import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import { GrContact } from "react-icons/gr";
import { IoIosMenu } from "react-icons/io";
import { FaRegWindowClose } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Use a single navigate function

  return (
    <nav className="bg-white w-full h-[60px] flex items-center justify-between px-6 md:px-10 fixed top-0 left-0 z-50 shadow-md">
      {/* Logo */}
      <Link to="/">
        <Image
          className="rounded w-[50px]"
          cloudName="dqtyrjpeh"
          publicId="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1741184889/wofbi_logo_vn8pwr.png"
        />
      </Link>

      {/* Menu Button (Mobile) */}
      <button
        className="md:hidden text-black text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaRegWindowClose /> : <IoIosMenu />}
      </button>

      {/* Links for Desktop */}
      <ul className="hidden md:flex gap-8 text-black">
        {[{ name: "Home", path: "/" }, { name: "Courses", path: "/courses" }, { name: "About WOFBI", path: "/aboutwofbi" }].map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`px-4 py-2 rounded-lg transition duration-300 ${
                location.pathname === link.path ? "bg-blue-300" : "hover:bg-blue-300"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Contact Button (Desktop Only) */}
      <button
        className="hidden md:block bg-blue-300 hover:bg-blue-400 text-white px-4 py-2 rounded-lg"
        onClick={() => {
          navigate("/contactUsForm"); // ✅ Corrected to only one function
          setMenuOpen(false);
        }}
      >
        <div className="flex items-center">
          <GrContact className="mr-2" />
          <p>Contact Us</p>
        </div>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-black text-white flex flex-col items-center py-6 md:hidden">
          {[{ name: "Home", path: "/" }, { name: "Courses", path: "/courses" }, { name: "About WOFBI", path: "/aboutwofbi" }].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`py-2 w-full text-center transition duration-300 ${
                location.pathname === link.path ? "bg-blue-300" : "hover:bg-blue-300"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Contact Button (Mobile) */}
          <button
            className="bg-blue-300 hover:bg-blue-400 text-white px-4 py-2 mt-4 rounded-lg"
            onClick={() => {
              navigate("/contactUsForm"); // ✅ Fixed duplicate `useNavigate` calls
              setMenuOpen(false);
            }}
          >
            <div className="flex items-center">
              <GrContact className="mr-2" />
              <p>Contact Us</p>
            </div>
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

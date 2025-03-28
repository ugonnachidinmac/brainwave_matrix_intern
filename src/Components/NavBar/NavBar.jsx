import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdTipsAndUpdates } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { FaRegWindowClose } from "react-icons/fa";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bg-white w-full h-[50px] flex items-center justify-between px-6 md:px-10 fixed top-0 left-0 z-50 shadow-md">
      {/* Logo */}
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1742246583/healthlogo1_ishmfv.jpg"
          alt="WOFBI Logo"
          className="rounded w-[50px]"
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
        {[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/aboutUs" },
          { name: "Terms and Conditions ", path: "/termsAndConditions" },
        ].map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`px-4 py-2 rounded-lg transition duration-300 focus:bg-[#f8c96c] hover:bg-[#f0d898] ${
                location.pathname === link.path ? "bg-[#f8c96c]" : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Contact Button (Desktop Only) */}
      <button
        className="hidden md:block bg-[#f8c96c] hover:bg-[#f0d898] text-white px-4 py-2 rounded-lg"
        onClick={() => {
          navigate("/updateblog");
          setMenuOpen(false);
        }}
      >
        <div className="flex items-center">
        <MdTipsAndUpdates className="mr-2"/>
          {/* <GrContact className="mr-2" /> */}
          <p>Update Blog</p>
        </div>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white text-black flex flex-col items-center py-6 md:hidden">
          {[
            { name: "Home", path: "/" },
            { name: "About Us", path: "/aboutUs" },
            { name: "Terms and Conditions ", path: "/termsAndConditions" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`py-2 w-full text-center transition duration-300 focus:bg-[#f8c96c] hover:bg-[#f8c96c] ${
                location.pathname === link.path ? "bg-[#f8c96c]" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Contact Button (Mobile) */}
          <button
            className="bg-[#f8c96c] hover:bg-[#f0d898] text-white px-4 py-2 mt-4 rounded-lg"
            onClick={() => {
              navigate("/updateblog");
              setMenuOpen(false);
            }}
          >
            <div className="flex items-center">
            <MdTipsAndUpdates className="mr-2"/>
              <p>Update Blog</p>
            </div>
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;

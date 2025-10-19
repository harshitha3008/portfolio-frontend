import React, { useState } from "react";
import { Link } from "react-scroll";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "home" },
    { label: "About", href: "about" },
    { label: "Experience", href: "experience" },
    { label: "Skills", href: "skills" },
    { label: "Projects", href: "projects" },
    { label: "My Journey", href: "journey" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md shadow-[0_4px_20px_rgba(255,165,0,0.3)] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left side - Name */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent tracking-wide">
              Harshitha
            </h1>
          </div>

          {/* Right side - Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="relative font-medium text-sm bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent cursor-pointer transition-all duration-200 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              Contact Me
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-orange-200 hover:text-orange-400 transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-black/95 border-t border-orange-500/30 transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={() => setMenuOpen(false)} // close menu on click
              className="block font-medium text-sm bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent cursor-pointer transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            onClick={() => setMenuOpen(false)}
            className="block bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:from-orange-400 hover:to-yellow-400 transition-all duration-200 text-center cursor-pointer"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaRegHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import {
  GiSunglasses,
  GiShoppingBag,
  GiCycling,
  GiDirectorChair,
} from "react-icons/gi";
import {
  ComputerDesktopIcon,
  DeviceTabletIcon,
} from "@heroicons/react/24/solid";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const categories = [
    { Icon: GiShoppingBag, label: "Grocery" },
    { Icon: ComputerDesktopIcon, label: "Computers" },
    { Icon: GiSunglasses, label: "Fashion" },
    { Icon: GiCycling, label: "Sports" },
    { Icon: GiDirectorChair, label: "Home & Furniture" },
    { Icon: DeviceTabletIcon, label: "Tablets" },
  ];

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/blog", label: "Blog" },
  ];

  const actionIcons = [
    { icon: <FaRegHeart />, label: "Wishlist" },
    { icon: <FaShoppingCart />, label: "Cart" },
    { icon: <FaUser />, label: "Account" },
  ];

  return (
    <>
      <nav className="font-serif fixed top-0 right-0 left-0 z-50 shadow-md">
        {/* Top Navigation Bar */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
            >
              ShopMate
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div
              className={`${
                isSearchExpanded
                  ? "absolute left-0 right-0 mx-4 lg:static"
                  : "hidden"
              } lg:flex flex-1 max-w-2xl mx-8`}
            >
              <div className="relative w-full">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) =>
                    e.key === "Enter" && console.log("Search:", searchQuery)
                  }
                  placeholder="Search products, brands, and categories..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-2"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                aria-label="Toggle search bar"
              >
                <FiSearch className="w-6 h-6" />
              </button>

              {actionIcons.map((action) => (
                <Link
                  key={action.label}
                  to="/"
                  className="hidden lg:flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label={action.label}
                >
                  {action.icon}
                  <span className="text-xs mt-1">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Category Navigation */}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute w-full bg-white shadow-lg">
            <div className="px-4 py-2 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t pt-4">
                {categories.map((category) => (
                  <Link
                    key={category.label}
                    to="/"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 py-2"
                  >
                    <category.Icon className="w-5 h-5" />
                    <span>{category.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="bg-gray-800 hidden lg:block pt-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8 py-2 items-center">
            {categories.map((category) => (
              <Link
                key={category.label}
                to="/"
                className="flex items-center space-x-2 text-gray-200 hover:text-white transition-colors py-2 px-8 border-r-1"
              >
                <category.Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{category.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiAtSign,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";
import {
  FaRegHeart,
  FaShoppingCart,
  FaUser,
  FaSignInAlt,
  FaShopify,
} from "react-icons/fa";
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
  { icon: <FiLogOut />, label: "Log Out" },
];
const notLoggedIn = [
  { icon: <FiLogIn />, label: "Login", to: "/user-login" },
  { icon: <FiAtSign />, label: "Sign Up", to: "/user-register" },
  { icon: <FaShopify />, label: "Become A Seller", to: "/seller-register" },
];

const SearchBar = ({ searchQuery, setSearchQuery, isSearchExpanded }) => {
  const handleClick = (e) => {
    if (e.key === "Enter") {
      console.log(searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <div
      className={`${
        isSearchExpanded ? "absolute left-0 right-0 mx-4 lg:static" : "hidden"
      } lg:flex flex-1 max-w-2xl mx-8`}
    >
      <div className="relative w-full">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={handleClick}
          placeholder="Search products, brands, and categories..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, isLoggedIn }) => {
  return (
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
          {isLoggedIn ? (
            categories.map((category) => (
              <Link
                key={category.label}
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 py-2"
              >
                <category.Icon className="w-5 h-5" />
                <span>{category.label}</span>
              </Link>
            ))
          ) : (
            <div className="flex flex-col space-y-3">
              <Link
                to="/login"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 py-2"
              >
                <i className="fas fa-sign-in-alt w-5 h-5"></i>
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 py-2"
              >
                <FaSignInAlt className="w-5 h-5" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <nav className="font-serif fixed top-0 right-0 left-0 z-50 shadow-md">
        <div className="bg-white">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
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

            <Link
              to="/"
              className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
            >
              ShopMate
            </Link>

            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isSearchExpanded={isSearchExpanded}
            />

            <div className="hidden lg:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-md"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-2"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                aria-label="Toggle search bar"
              >
                <FiSearch className="w-6 h-6" />
              </button>

              {isLoggedIn
                ? actionIcons.map((action) => (
                    <Link
                      key={action.label}
                      to="/"
                      className="hidden lg:flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors text-xl"
                      aria-label={action.label}
                    >
                      {action.icon}
                      <span className="text-sm mt-2">{action.label}</span>
                    </Link>
                  ))
                : notLoggedIn.map((action) => (
                    <Link
                      key={action.label}
                      to={action.to}
                      className="hidden lg:flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors text-xl "
                      aria-label={action.label}
                    >
                      {action.icon}
                      <span className="text-sm mt-2 flex justify-center items-center">
                        {action.label}
                      </span>
                    </Link>
                  ))}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <MobileMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isLoggedIn={isLoggedIn}
          />
        )}
      </nav>
      <div className="bg-gray-800 hidden lg:block pt-18">
        <div className="container mx-auto">
          <div className="flex justify-center gap-4 py-2 items-center">
            {categories.map((category) => (
              <Link
                key={category.label}
                to="/"
                className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors py-2 px-8 border-r-1"
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

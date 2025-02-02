import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyUp = (event) => {
    if (event.key === "Enter") {
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
    }
  };

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
    { to: "/", label: "About" },
    { to: "/", label: "Contact Us" },
    { to: "/", label: "Blog" },
  ];

  return (
    <div className="font-serif">
      <div className="w-screen h-20 bg-white fixed top-0 left-0 right-0  flex items-center justify-between px-8 z-10">
        <div className="text-2xl font-semibold">
          <Link to="/" className="text-black">
            ShopMate
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center w-1/2 bg-white rounded-lg">
          <FiSearch className="absolute left-2 text-gray-500" />
          <input
            id="SearchBar"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyUp={handleSearchKeyUp}
            placeholder="Search for Products, Brands and More..."
            className="w-full pl-10 p-2 text-black border-none rounded-lg bg-blue-100 outline-none"
          />
        </div>

        <div className="flex space-x-6 ">
          {navLinks.map(({ to, label }, index) => (
            <Link
              key={index}
              to={to}
              className="text-md text-black hover:text-gray-500 transition-transform transform hover:scale-105"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          {[
            { to: "/", icon: <FaRegHeart className="w-5 h-5" /> },
            { to: "/", icon: <FaShoppingCart className="w-5 h-5" /> },
            { to: "/", icon: <FaUser className="w-5 h-5" /> },
          ].map(({ to, icon }, index) => (
            <Link
              key={index}
              to={to}
              className="w-8 h-8 text-black rounded-full flex items-center justify-center"
            >
              {icon}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-black w-full h-10 grid grid-cols-8 divide-x divide-gray-500 mt-20 p-2 ">
        <div></div>
        {categories.map(({ Icon, label }, index) => (
          <div key={index} className="h-full flex justify-center items-center">
            <Link className="flex items-center space-x-2 text-white">
              <Icon className="h-6 w-6 text-white" />
              <span>{label}</span>
            </Link>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
};

export default NavBar;

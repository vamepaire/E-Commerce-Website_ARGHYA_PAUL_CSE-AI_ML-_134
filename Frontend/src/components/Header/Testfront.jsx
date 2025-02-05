import React from "react";
import { Link } from "react-router-dom";
import {
  FaPhone,
  FaLaptop,
  FaTv,
  FaTshirt,
  FaCamera,
  FaHeadphones,
  FaChair,
  FaBoxOpen,
  FaBicycle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FiWatch } from "react-icons/fi";

const FrontPage = () => {
  // Dummy data for categories
  const categories = [
    { name: "Phones", icon: <FaPhone className="w-12 h-12" /> },
    { name: "Laptops", icon: <FaLaptop className="w-12 h-12" /> },
    { name: "TVs", icon: <FaTv className="w-12 h-12" /> },
    { name: "Routers", icon: <FaBoxOpen className="w-12 h-12" /> },
    { name: "Cycles", icon: <FaBicycle className="w-12 h-12" /> },
    { name: "Fashion", icon: <FaTshirt className="w-12 h-12" /> },
    { name: "Cameras", icon: <FaCamera className="w-12 h-12" /> },
    { name: "Headphones", icon: <FaHeadphones className="w-12 h-12" /> },
    { name: "Smartwatches", icon: <FiWatch className="w-12 h-12" /> },
    { name: "Furniture", icon: <FaChair className="w-12 h-12" /> },
  ];

  // Dummy data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Smartphone X",
      price: "$699",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Laptop Pro",
      price: "$1299",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      name: "4K Smart TV",
      price: "$899",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 4,
      name: "Wireless Headphones",
      price: "$199",
      image: "https://via.placeholder.com/200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to E-Shop</h1>
          <p className="text-xl mb-8">
            Discover the best products at unbeatable prices.
          </p>
          <Link
            to="/shop"
            className="bg-white text-blue-600 py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center cursor-pointer"
            >
              <div className="flex justify-center mb-4 text-blue-600">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.price}</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2023 E-Shop. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <Link to="#" className="hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-gray-400">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-gray-400">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrontPage;

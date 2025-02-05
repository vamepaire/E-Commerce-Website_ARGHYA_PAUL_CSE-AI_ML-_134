import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiWatch } from "react-icons/fi";
import ProductCard from "../ProductCard";
import {
  FaShoppingCart,
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

const FrontPage = () => {
  const product = {
    id: 1,
    name: "Smartphone X",
    price: 699,
    image: "/images/amelia-noyes-6JcBa0lrV2w-unsplash.jpg",
    rating: 4.5,
  };

  const productCategories = {
    newArrivals: Array(10).fill({ ...product, name: "New Arrival Product" }),
    bestSellers: Array(10).fill({ ...product, name: "Best Seller Product" }),
    featuredProducts: Array(10).fill({ ...product, name: "Featured Product" }),
  };

  const [activeCategory, setActiveCategory] = useState("newArrivals");

  const categories = [
    { name: "Phone", icon: <FaPhone /> },
    { name: "Laptop", icon: <FaLaptop /> },
    { name: "TV", icon: <FaTv /> },
    { name: "Routers", icon: <FaBoxOpen /> },
    { name: "Cycles", icon: <FaBicycle /> },
    { name: "Fashion", icon: <FaTshirt /> },
    { name: "Grocery", icon: <FaShoppingCart /> },
    { name: "Cameras", icon: <FaCamera /> },
    { name: "Headphones", icon: <FaHeadphones /> },
    { name: "Smartwatches", icon: <FiWatch /> },
    { name: "Furniture", icon: <FaChair /> },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const categoriesPerPage = 5;

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) =>
      prev < Math.ceil(categories.length / categoriesPerPage) - 1
        ? prev + 1
        : prev
    );
  };

  const currentCategories = categories.slice(
    currentPage * categoriesPerPage,
    (currentPage + 1) * categoriesPerPage
  );

  return (
    <div className="bg-gray-100 font-sans">
      <header className="bg-gradient-to-b from-orange-300 via-white to-green-300 text-blue-950 text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Discover Amazing Products</h1>
        <p className="text-lg">
          Shop the latest trends with unbeatable prices.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </header>

      <section className="py-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Shop by Category
        </h2>
        <div className="flex justify-center gap-8">
          <button
            onClick={handlePrevious}
            className="bg-transparent text-black rounded-full cursor-pointer hover:scale-105 transition duration-300"
            aria-label="Previous"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          {currentCategories.map((category, index) => (
            <div
              key={index}
              className="w-[8rem] h-[8rem] bg-white rounded-lg text-center cursor-pointer hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl flex justify-center items-center"
            >
              <Link to="#" className="block p-4">
                <div className="flex flex-col justify-center items-center">
                  <div className="text-3xl mb-2 text-blue-600">
                    {category.icon}
                  </div>
                  <h3 className="text-black text-sm font-medium">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
          <button
            onClick={handleNext}
            className="text-black rounded-full cursor-pointer hover:scale-105 transition duration-300"
            aria-label="Next"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </section>

      {/* Product Category Navigation */}
      <section className="py-6">
        <div className="flex justify-center gap-6 mb-5">
          {["newArrivals", "bestSellers", "featuredProducts"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 font-semibold relative ${
                  activeCategory === category ? "text-black" : "text-gray-400"
                }`}
              >
                {category.replace(/([A-Z])/g, " $1").trim()}
                {activeCategory === category && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-black"></div>
                )}
              </button>
            )
          )}
        </div>

        {/* Product Grid */}
        <div className="px-[4rem] py-[1rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-gray-100 gap-y-7 shadow-2xl">
          {productCategories[activeCategory].map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FrontPage;

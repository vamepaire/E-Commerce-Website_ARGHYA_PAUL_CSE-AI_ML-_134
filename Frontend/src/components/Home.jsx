import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  FaPhone,
  FaLaptop,
  FaTv,
  FaTshirt,
  FaShoppingCart,
  FaCamera,
  FaHeadphones,
  FaChair,
  FaBoxOpen,
  FaBicycle,
} from "react-icons/fa";
import { FiWatch } from "react-icons/fi";

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

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handleNext = () =>
    currentPage < categories.length / itemsPerPage - 1 &&
    setCurrentPage(currentPage + 1);
  const handlePrevious = () =>
    currentPage > 0 && setCurrentPage(currentPage - 1);

  const currentCategories = categories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 font-serif">
      <div className="flex w-full h-screen pl-10">
        <div className="w-full pt-[10rem]">
          <h2 className="text-5xl mb-3">
            Discover the best deals on trendy products at{" "}
            <Link to="/">
              <strong>ShopMate</strong>
            </Link>
          </h2>
          <h2 className="text-2xl text-gray-500">
            Perfect E-Commerce Store For Your Daily Life
          </h2>

          <div className="mt-16">
            <h1 className="text-xl text-start mb-8">Browse By Category</h1>
            <div className="flex flex-wrap justify-center gap-8">
              {currentCategories.map((category, index) => (
                <div
                  key={index}
                  className="w-[8rem] bg-[#e6e6e6] rounded-lg text-center cursor-pointer hover:scale-105 transition duration-300"
                >
                  <Link to="#" className="block">
                    <div className="h-[6rem] flex flex-col justify-center items-center">
                      <div className="text-3xl mb-2 text-black">
                        {category.icon}
                      </div>
                      <h3 className="text-black text-sm">{category.name}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4 gap-5">
              <button
                onClick={handlePrevious}
                className="px-6 py-2 bg-gray-100 text-black rounded-l-lg"
              >
                <FaChevronLeft className="text-xl" />
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-gray-100 text-black rounded-r-lg"
              >
                <FaChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-3/4">
          <img
            src="/images/julien-doclot-gsVODsbzZhs-unsplash.jpg"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div
          className="w-full h-96 bg-cover  flex items-center p-[6rem]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1608022625050-82683640e5a3?q=80&w=1947&auto=format&fit=crop')",
          }}
        >
          <div className="text-black w-2/4 flex flex-col justify-center items-center">
            <h1 className="text-2xl">Product Beyond Thinking!</h1>
            <p className="text-7xl">
              Iphone 14 <strong>Pro</strong>
            </p>
            <p className="text-xl mt-2">
              Created To Change Everything, For Everyone
            </p>
            <Link
              to="/"
              className="mt-3 px-6 py-3 bg-black text-white rounded-md hover:bg-white hover:text-black transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-1/2 flex flex-col">
            <div
              className="h-72 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://plus.unsplash.com/premium_photo-1677993186588-d0812c569caa?q=80&w=2071&auto=format&fit=crop')",
              }}
            ></div>
            <div className="flex ">
              <div
                className="w-1/2 h-72 bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?q=80&w=2072&auto=format&fit=crop')",
                }}
              ></div>
              <div
                className="w-1/2 h-72 bg-cover bg-gray-600"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=2070&auto=format&fit=crop')",
                }}
              ></div>
            </div>
          </div>

          <div
            className="w-1/2 h-[36rem] bg-cover bg-center flex flex-col p-4"
            style={{
              backgroundImage:
                "url('https://images.samsung.com/in/smartphones/galaxy-s25-ultra/buy/product_color_silverBlue_PC.png?imbypass=true')",
            }}
          >
            <h1 className="text-2xl font-semibold text-center mt-3">
              Galaxy S25 Ultra
            </h1>
            <div className="flex-grow"></div>
            <Link
              to="/"
              className="py-3 text-center bg-black text-white rounded-md hover:bg-gray-400 hover:text-black transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div class="border-t-2 border-gray-400 my-[4rem]"></div>

      <div className="h-screen w-full flex justify-center items-center bg-cover bg-center">
        <h1 className="text-2xl text-white">Another Section Here!</h1>
      </div>
    </div>
  );
};

export default Home;

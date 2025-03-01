import React from "react";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";

export const ProductCard = ({ product }) => {
  const { id, name, price, image, rating } = product;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className=" h-79 w-72  rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white ">
      <div className="relative h-48 overflow-hidden ">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
          New
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>

        <div className="flex items-center mb-2">
          <div className="flex space-x-1">{renderStars(rating)}</div>
          <span className="text-sm text-gray-500 ml-2">({rating})</span>
        </div>

        <p className="text-xl font-bold text-gray-800 mb-4">${price}</p>

        <button className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

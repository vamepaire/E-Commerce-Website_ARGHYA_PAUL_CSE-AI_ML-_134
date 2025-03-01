import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiWatch } from "react-icons/fi";
import { ProductCard } from "../ProductCard";
import { CustomIcons } from "../Hooks/custom.components";

import { getCustomHeader } from "../customization/Home.custom";
import {
  CenteredTabs,
  CustomGrid,
  SquareBoxLayout,
} from "../Hooks/custom.components";

const FrontPage = () => {
  const product = {
    id: 1,
    name: "Smartphone X",
    price: 699,
    image: "/images/amelia-noyes-6JcBa0lrV2w-unsplash.jpg",
    rating: 4.5,
  };

  const productCategories = {
    New_Arrivals: Array(20).fill({ ...product, name: "New Arrival Product" }),
    Best_Sellers: Array(10).fill({ ...product, name: "Best Seller Product" }),
    Featured_Products: Array(10).fill({ ...product, name: "Featured Product" }),
  };

  const [textColor, setTextColor] = useState();
  const [Image, setImage] = useState(null);
  useEffect(() => {
    const { color, backgroundImage } = getCustomHeader();
    setTextColor(color);
    setImage(backgroundImage);
  }, [getCustomHeader()]);

  return (
    <div className="font-sans">
      <header
        className={` text-center py-42 bg-cover bg-center`}
        style={{
          backgroundImage: `url('${Image}')`,
          color: `${textColor}`,
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Discover Amazing Products</h1>
        <p className="text-xl">
          Shop the latest trends with unbeatable prices.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </header>

      <section className="py-6 mt-[0.5rem]">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Shop by Category
        </h2>
        <CustomIcons />
      </section>

      {/* Product Category Navigation */}
      <section className="">
        <div>
          <CenteredTabs />
        </div>

        <CustomGrid />

        {/* Product Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 shadow-2xl p-[2rem] justify-items-center">
          {productCategories["New_Arrivals"].map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div> */}
      </section>
      <div className="w-full grid grid-cols-3 bg-gray-100 p-4 gap-4 mt-[5rem]">
        <SquareBoxLayout />
        <SquareBoxLayout />
        <SquareBoxLayout />
        <SquareBoxLayout />
      </div>
    </div>
  );
};

export default FrontPage;

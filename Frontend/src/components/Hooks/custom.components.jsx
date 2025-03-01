import React from "react";
import { Alert } from "@heroui/alert";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

//Custom Notification
//Customize It And Use It
export function Notification({
  title = "",
  message = "",
  color = "",
  variant = "faded",
}) {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <div className="flex flex-col">
      {isVisible ? (
        <Alert
          color={color}
          description={message}
          isVisible={isVisible}
          title={title}
          variant={variant}
          onClose={() => setIsVisible(false)}
        />
      ) : null}
    </div>
  );
}

//Set The Active Category
export function CenteredTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label="New Arrivals"
          sx={{
            color: `var(--joy-palette-neutral-400, #9FA6AD)`,
            fontSize: "1rem",
            "&.Mui-active": { color: "blue" },
          }}
        />
        <Tab
          label="Best Sellers"
          sx={{
            color: `var(--joy-palette-neutral-400, #9FA6AD)`,
            fontSize: "1rem",
            "&.Mui-active": { color: "blue" },
          }}
        />
        <Tab
          label="Featured Product"
          sx={{
            color: `var(--joy-palette-neutral-400, #9FA6AD)`,
            fontSize: "1rem",
            "&.Mui-active": { color: "blue" },
          }}
        />
      </Tabs>
    </Box>
  );
}

//Custom Icons For Categories
import { Link } from "react-router-dom";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LaptopIcon from "@mui/icons-material/Laptop";
import TvIcon from "@mui/icons-material/Tv";
import RouterIcon from "@mui/icons-material/Router";
import {
  FaBicycle,
  FaTshirt,
  FaCamera,
  FaHeadphones,
  FaChair,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FiWatch } from "react-icons/fi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
export function CustomIcons() {
  const Icons = [
    { name: "Phone", icon: <PhoneAndroidIcon fontSize="large" /> },
    { name: "Laptop", icon: <LaptopIcon fontSize="large" /> },
    { name: "TV", icon: <TvIcon fontSize="large" /> },
    { name: "Routers", icon: <RouterIcon fontSize="large" /> },
    { name: "Cycles", icon: <FaBicycle /> },
    { name: "Fashion", icon: <FaTshirt /> },
    { name: "Grocery", icon: <ShoppingCartIcon fontSize="large" /> },
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
      prev < Math.ceil(Icons.length / categoriesPerPage) - 1 ? prev + 1 : prev
    );
  };

  const currentCategories = Icons.slice(
    currentPage * categoriesPerPage,
    (currentPage + 1) * categoriesPerPage
  );

  return (
    <>
      <div className="flex justify-center gap-8 flex-row">
        <button
          onClick={handlePrevious}
          className="bg-transparent text-black rounded-full cursor-pointer hover:scale-105 transition duration-300"
          aria-label="Previous"
        >
          <FaChevronLeft className="text-xl" />
        </button>
        <div className=" w-1/2 flex flex-row space-x-8 spcae-y-5 justify-center items-center">
          {currentCategories.map((Icons, index) => (
            <div
              key={index}
              className="w-[10rem] h-[8rem] bg-[#f5f5f5] rounded-lg text-center cursor-pointer hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl hover:shadow-red-300 flex justify-center items-center text-red-600/45 hover:text-red-600"
            >
              <Link to="#" className="block p-4  ">
                <div className="flex flex-col justify-center items-center ">
                  <div className="text-4xl mb-4">{Icons.icon}</div>
                  <h3 className="text-black text-md font-medium">
                    {Icons.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="text-black rounded-full cursor-pointer hover:scale-105 transition duration-300"
          aria-label="Next"
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </>
  );
}

//Custom Progress Bar
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
const Action = [
  "Enter Your Personal Details",
  "Address Verification",
  "Business Verification",
];
export function SellerRegProgress({ steps }) {
  console.log(steps);
  return (
    <>
      <Box sx={{ width: "100%", fontSize: "2rem" }}>
        <Stepper
          activeStep={steps}
          alternativeLabel
          sx={{
            "& .MuiStepConnector-line": {
              borderColor: "gray",
              borderTopWidth: "4px",
              marginTop: ".2rem",
            },
          }}
        >
          {Action.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepIcon-root": {
                    color: "gray",
                    width: "2rem",
                    height: "2rem",

                    "&.Mui-completed": {
                      color: "green",
                    },
                    "&.Mui-active": {
                      color: "#338EF7",
                    },
                  },
                  "& .MuiStepLabel-label": {
                    fontSize: "1rem",
                    color: "black",
                    "&.Mui-completed": {
                      color: "green",
                    },
                    "&.Mui-active": {
                      color: "#338EF7",
                    },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
}

export function CustomGrid() {
  return (
    <>
      <div className="p-[1.5rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-3 gap-[1rem] h-screen hover:transition-transform ">
          <div
            className="row-span-2 col-span-1 relative bg-cover bg-center rounded-md shadow-md hover:scale-105 transition duration-500  "
            id="grid1"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          >
            <div className="flex flex-col justify-end p-[1.5rem] h-full gap-y-6">
              <p className=" text-white text-4xl font-semibold">
                Casual T-Shirts
              </p>
              <button className=" text-black font-medium  py-3 rounded-md shadow-md hover:shadow-xl bg-white cusrsor-pointer hover:bg-black hover:text-white transition duration-300">
                View Details
              </button>
            </div>
          </div>

          <div
            id="grid2"
            className=" col-span-3 w-full h-full bg-center bg-cover
            cursor-pointer hover:scale-105 transition duration-500 rounded-md"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1621685634155-dcb444e2ec98?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          >
            <div className="flex flex-col justify-end p-[2rem] h-full gap-y-4">
              <p className="text-white text-3xl font-semibold">
                Make Every Corners Connected
              </p>
              <button className=" w-1/4 text-white font-medium px-6 py-3 rounded-md shadow-md hover:shadow-xl bg-black cusrsor-pointer hover:bg-white hover:text-black transition duration-300">
                View Details
              </button>
            </div>
          </div>
          <div
            id="grid3"
            className="w-full h-full bg-center bg-cover cursor-pointer hover:scale-105 transition duration-300 rounded-md"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          >
            <div className="flex flex-col justify-end items-center p-[1.5rem] h-full gap-y-6">
              <p className=" text-white text-4xl font-semibold">
                Casual T-Shirts
              </p>
              <button className="w-1/2 text-black font-medium  py-3 rounded-md shadow-md hover:shadow-xl bg-white cusrsor-pointer hover:bg-black hover:text-white transition duration-300">
                View Details
              </button>
            </div>
          </div>
          <div
            id="grid4"
            className="w-full h-full bg-center bg-cover cursor-pointer hover:scale-105 transition duration-300 rounded-md"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          >
            <div className="flex flex-col justify-end items-center p-[1.5rem] h-full gap-y-6">
              <p className=" text-white text-4xl font-semibold">
                Casual T-Shirts
              </p>
              <button className="w-1/2 text-black font-medium  py-3 rounded-md shadow-md hover:shadow-xl bg-white cusrsor-pointer hover:bg-black hover:text-white transition duration-300">
                View Details
              </button>
            </div>
          </div>
          <div
            id="grid5"
            className="w-full h-full bg-center bg-cover cursor-pointer hover:scale-105 transition duration-300 rounded-md"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          >
            <div className="flex flex-col justify-end items-center p-[1.5rem] h-full gap-y-6">
              <p className=" text-white text-4xl font-semibold">
                Casual T-Shirts
              </p>
              <button className="w-1/2 text-black font-medium  py-3 rounded-md shadow-md hover:shadow-xl bg-white cusrsor-pointer hover:bg-black hover:text-white transition duration-300">
                View Details
              </button>
            </div>
          </div>
          <div
            id="grid6"
            className="w-full h-full bg-center bg-cover cursor-pointer hover:scale-105 transition duration-300 rounded-md"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          >
            <div className="flex flex-col justify-end items-center p-[1.5rem] h-full gap-y-6">
              <p className=" text-white text-4xl font-semibold">
                Casual T-Shirts
              </p>
              <button className="w-1/2 text-black font-medium  py-3 rounded-md shadow-md hover:shadow-xl bg-white cusrsor-pointer hover:bg-black hover:text-white transition duration-300">
                View Details
              </button>
            </div>
          </div>
          <div
            id="grid7"
            className=" row-span-2 w-full h-full bg-center bg-cover cursor-pointer hover:scale-105 transition duration-300 rounded-md"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          >
            <div className="flex flex-col justify-center items-center p-[1.5rem] h-full gap-y-6">
              <p className=" text-white text-4xl font-semibold">Formal Shirt</p>
              <button className="w-1/2 text-black font-medium  py-3 rounded-md shadow-md hover:shadow-xl bg-white cusrsor-pointer hover:bg-black hover:text-white transition duration-300">
                View Details
              </button>
            </div>
          </div>
          <div
            id="grid8"
            className=" col-span-3 w-full h-full bg-cover bg-center cursor-pointer hover:scale-105 transition duration-300 rounded-md"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1510166089176-b57564a542b1?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          >
            <div className="flex flex-col justify-end items-center p-[1.5rem] h-full gap-y-6">
              <p className=" text-black text-4xl font-semibold">
                Casual T-Shirts
              </p>
              <button className="w-1/2 text-white font-medium  py-3 rounded-md shadow-md hover:shadow-xl bg-black cusrsor-pointer hover:bg-white hover:text-black transition duration-300">
                View Details
              </button>
            </div>
          </div>
          <div
            id="grid9"
            className="w-full h-full bg-center bg-cover cursor-pointer hover:scale-105 transition duration-300 rounded-md"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          >
            <div className="flex flex-col justify-end items-center p-[1.5rem] h-full gap-y-6">
              <p className=" text-white text-4xl font-semibold">
                Casual T-Shirts
              </p>
              <button className="w-1/2 text-black font-medium  py-3 rounded-md shadow-md hover:shadow-xl bg-white cusrsor-pointer hover:bg-black hover:text-white transition duration-300">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SquareBoxLayout() {
  return (
    <>
      <div className=" h-[40rem] p-[1rem]  flex flex-col justify-center bg-white">
        <div className="bh-[4rem] flex justify-center items-center text-2xl font-semibold">
          {" "}
          Shirts Category
        </div>
        <div className="grid grid-cols-2 grid-rows-2 pt-4 gap-2 h-full">
          <div className=" border-1 border-gray-600   ">
            <img
              className="object-cover w-[17rem] h-[14rem] px-6 py-2"
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="px-2 w-full">
              <p className="text-2xl font-semibold">Shirts</p>
              <p className="text-lg text-[#108934] font-bold">Min. 50% Off</p>
            </div>
          </div>
          <div className=" border-1 border-gray-600   ">
            <img
              className="object-cover w-[17rem] h-[14rem] px-6 py-2"
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="px-2 w-full">
              <p className="text-2xl font-semibold">Shirts</p>
              <p className="text-lg text-[#108934] font-bold">Min. 50% Off</p>
            </div>
          </div>
          <div className=" border-1 border-gray-600   ">
            <img
              className="object-cover w-[17rem] h-[14rem] px-6 py-2"
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="px-2 w-full">
              <p className="text-2xl font-semibold">Shirts</p>
              <p className="text-lg text-[#108934] font-bold">Min. 50% Off</p>
            </div>
          </div>
          <div className=" border-1 border-gray-600   ">
            <img
              className="object-cover w-[17rem] h-[13rem] px-6 py-2"
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="px-2 w-full p-2">
              <p className="text-2xl font-semibold">Shirts</p>
              <p className="text-lg text-[#108934] font-bold">Min. 50% Off</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { FaShopify } from "react-icons/fa";
import {LoginValidator} from "../../validator/user.validator";

const SellerLogin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidator,
    onSubmit: (values,{resetForm}) => {
      console.log("Form submitted with values:", values);
      resetForm();
    },
  });

  return (
    <div className="flex justify-center items-center p-[6rem]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <form className="p-6" onSubmit={formik.handleSubmit}>
          {/* Header */}
          <div className="flex flex-row justify-center items-center w-full my-[3rem]">
            <h1 className="text-2xl font-bold">Welcome To Your Shop</h1>
            <FaShopify className="w-7 h-7 ml-2" />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-label="Email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-label="Password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Login"
          >
            Login
          </button>

          {/* Sign Up Link */}
          <p className="text-center mt-4 mb-3">
            Don't have an account?{" "}
            <Link
              to="/seller-register"
              className="text-blue-800 hover:underline font-semibold"
            >
              Click Here
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="w-full border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 font-medium">or</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          {/* User Login Button */}
          <div className="my-6">
            <Link
              to="/user-login"
              className="w-full font-semibold py-2 text-black bg-yellow-400 rounded-lg flex items-center justify-center hover:bg-yellow-500"
              aria-label="Login as User"
            >
              Login As User
            </Link>
          </div>

          {/* Terms and Privacy Policy */}
          <p className="text-sm text-gray-500 text-center">
            By continuing, you agree to our{" "}
            <a href="#" className="text-black hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-black hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;

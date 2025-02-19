import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Features/user/userActions";
import { UserRegistrationValidator } from "../../validator/user.validator";
import { Notification } from "../Hooks/custom.notification";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const InputField = ({ id, name, type, placeholder, formik, label }) => (
  <div className="mb-3">
    <div className="flex flex-row">
      <h3 className="mb-1 font-semibold">{label}</h3>
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-500 text-sm ml-3">({formik.errors[name]})</div>
      )}
    </div>
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      className={`w-full px-4 py-2 text-gray-900 border ${
        formik.errors[name] && formik.touched[name]
          ? "border-red-500"
          : "border-gray-300"
      } rounded-lg focus:ring-1 focus:ring-[#f4dd8a] focus:outline-none`}
    />
  </div>
);

const UserRegistration = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.authUser);

  const formik = useFormik({
    initialValues,
    validationSchema: UserRegistrationValidator,
    onSubmit: (values, { resetForm }) => {
      dispatch(registerUser(values))
        .then(() => resetForm())
        .catch((err) => console.error("Registration failed:", err));
    },
  });

  return (
    <>
      <div className="fixed left-1/2 transform -translate-x-1/2 z-50 mt-[0.5rem] px-8">
        {(error || success) && (
          <div
            className={`px-10 text-lg font-bold rounded-md shadow-lg transition-transform duration-300 ${
              error
                ? "bg-red-100 text-red-600 border-red-500"
                : "bg-green-100 text-green-600 border-green-500"
            }`}
          >
            <Notification
              title={error ? "Warning" : "Success"}
              message={error || success}
            />
          </div>
        )}
      </div>

      <div className="flex justify-center p-[6rem]">
        <div className="w-full max-w-md p-2 rounded-lg">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="text-center text-2xl font-bold mb-4">
              Register As A User
            </h1>
            <label id="first_name" className="font-semibold">
              Enter Your Name
            </label>
            <div
              className="mb-3 flex flex-row justify-start items-center"
              id="first_name"
            >
              <input
                id="firstName"
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={formik.handleChange}
                value={formik.values.firstname}
                onBlur={formik.handleBlur}
                className={`w-1/2 px-4 py-2 mr-4 text-gray-900 border ${
                  formik.errors.firstname && formik.touched.firstname
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-1 focus:ring-[#f4dd8a] focus:outline-none`}
              />

              <input
                id="lastName"
                type="text"
                name="lastname"
                placeholder="Last Name"
                onChange={formik.handleChange}
                value={formik.values.lastname}
                onBlur={formik.handleBlur}
                className={`w-1/2 px-4 py-2 text-gray-900 border ${
                  formik.errors.lastname && formik.touched.lastname
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-1 focus:ring-[#f4dd8a] focus:outline-none`}
              />
            </div>

            <InputField
              id="email"
              name="email"
              type="email"
              placeholder="abcd@example.com"
              formik={formik}
              label="Enter Your Email"
            />

            <InputField
              id="password"
              name="password"
              type="password"
              placeholder="a#Vtv%7x&"
              formik={formik}
              label="Enter Password"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                loading
                  ? "bg-gradient-to-r from-green-200 to-green-700"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center my-4">
              Already have an account?{" "}
              <Link
                to="/user-login"
                className="text-blue-800 hover:underline font-semibold"
              >
                Click Here!
              </Link>
            </p>

            <div className="flex items-center justify-center my-2">
              <div className="w-full border-t border-gray-300"></div>
              <span className="mx-2 text-gray-500 font-medium">or</span>
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <Link
              to="/seller-register"
              className="w-full py-2 text-black bg-yellow-400 rounded-lg mb-3 flex items-center justify-center hover:bg-yellow-500 font-bold"
            >
              Become A Seller
            </Link>

            <p className="text-sm text-gray-500">
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
    </>
  );
};

export default UserRegistration;

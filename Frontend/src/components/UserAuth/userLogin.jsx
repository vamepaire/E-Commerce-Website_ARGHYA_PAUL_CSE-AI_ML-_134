import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { LoginValidator } from "../../validator/user.validator";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Features/user/userActions";

const UserLogin = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.authUser);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidator,
    onSubmit: (values, { resetForm }) => {
      dispatch(loginUser(values))
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
      console.log(values);
      
    },
  });

  return (
    <div className="flex mt-[5rem] justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg ">
        <form className="space-y-6 p-6" onSubmit={formik.handleSubmit}>
          <h1 className="text-center text-2xl font-bold">Login As A User</h1>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full mt-2 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 flex justify-center items-center"
          >
            Login
          </button>

          <p className="text-center">
            Don't have an Account?{" "}
            <Link
              to="/user-register"
              className="text-blue-800 hover:underline font-semibold"
            >
              Click Here
            </Link>
          </p>

          <div className="flex items-center justify-center">
            <div className="w-full border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 font-medium">or</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <div>
            <Link
              to="/seller-login"
              className="w-full py-2 text-black bg-yellow-400 rounded-lg mb-3 flex items-center justify-center font-semibold hover:bg-yellow-500"
            >
              Login As Seller
            </Link>
          </div>

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

export default UserLogin;

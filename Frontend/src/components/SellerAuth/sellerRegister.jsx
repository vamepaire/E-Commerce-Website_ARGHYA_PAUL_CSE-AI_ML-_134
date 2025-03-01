import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FaShopify } from "react-icons/fa";
import ownerValidator from "../../validator/owner.validator.js";
import { SellerRegProgress } from "../Hooks/custom.components.jsx";
import { Notification } from "../Hooks/custom.components.jsx";
import { registerOwner } from "../../Features/Seller/sellerActions.js";

const initialValues = {
  User_name: "",
  Shop_name: "",
  email: "",
  password: "",
  address: {
    street: "",
    pincode: "",
  },
  image: null,
  gstIn: "",
};

const SellerRegister = () => {
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.authOwner);

  const formik = useFormik({
    initialValues,
    validationSchema: ownerValidator,
    onSubmit: (values, { resetForm }) => {
      console.log("Final Form Submitted:", values);
      dispatch(registerOwner(values)).then(() => resetForm());

      setStep(1);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
  });

  // Function to move to the next step if valid
  const nextStep = async () => {
    let errors = {};

    if (step === 1) {
      errors = await formik.validateForm({
        User_name: formik.values.User_name,
        email: formik.values.email,
        password: formik.values.password,
      });
    } else if (step === 2) {
      errors = await formik.validateForm({
        address: formik.values.address,
      });
    } else if (step === 3) {
      errors = await formik.validateForm({
        Shop_name: formik.values.Shop_name,
        gstIn: formik.values.gstIn,
      });
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex  flex-col items-center min-h-screen">
      <div className="fixed left-1/2 transform -translate-x-1/2 z-50 mt-[0.5rem] w-1/2 ">
        {(error || success) && (
          <div
            className={`px-10 text-lg font-bold rounded-md shadow-lg transition-transform duration-300 ${
              error
                ? "bg-red-100/80 text-red-600 border-red-500"
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
      <div className="flex flex-col items-center mt-[2rem] mb-[3rem]">
        <FaShopify className="w-10 h-10 mb-2" />
        <h1 className="text-3xl font-bold">Become A Seller</h1>
      </div>
      <SellerRegProgress steps={step - 1} />
      <div className="w-full max-w-lg p-6 bg-white mt-[4rem] rounded-lg shadow-lg">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            {step === 1 && (
              <>
                {/* Step 1: User and Shop Details */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    User Name
                  </label>
                  <input
                    name="User_name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.User_name}
                    className="w-full border px-4 py-2 rounded"
                  />
                  {formik.touched.User_name && formik.errors.User_name && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.User_name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="w-full border px-4 py-2 rounded"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="w-full border px-4 py-2 rounded"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </>
            )}
            {step == 2 && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Street
                  </label>
                  <input
                    name="address.street"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address.street}
                    className="w-full border px-4 py-2 rounded"
                  />
                  {formik.touched.address?.street &&
                    formik.errors.address?.street && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.address.street}
                      </div>
                    )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Pincode
                  </label>
                  <input
                    name="address.pincode"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address.pincode}
                    className="w-full border px-4 py-2 rounded"
                  />
                  {formik.touched.address?.pincode &&
                    formik.errors.address?.pincode && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.address.pincode}
                      </div>
                    )}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                {/* Step 2: Address and GST Number */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Shop Name
                  </label>
                  <input
                    name="Shop_name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Shop_name}
                    className="w-full border px-4 py-2 rounded"
                  />
                  {formik.touched.Shop_name && formik.errors.Shop_name && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.Shop_name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    GST Number
                  </label>
                  <input
                    name="gstIn"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gstIn}
                    className="w-full border px-4 py-2 rounded"
                  />
                  {formik.touched.gstIn && formik.errors.gstIn && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.gstIn}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-white bg-gray-500 rounded"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 text-white bg-black rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-500 rounded"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerRegister;

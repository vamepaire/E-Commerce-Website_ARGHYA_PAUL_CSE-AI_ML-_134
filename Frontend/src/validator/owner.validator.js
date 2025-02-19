import * as yup from "yup";

const ownerValidator = yup.object({
  User_name: yup
    .string()
    .min(3, "User name must be at least 3 characters long")
    .max(50, "User name cannot exceed 50 characters")
    .required("User name is required"),

  Shop_name: yup
    .string()
    .min(3, "Shop name must be at least 3 characters long")
    .max(100, "Shop name cannot exceed 100 characters")
    .required("Shop name is required"),

  address: yup.object({
    street: yup
      .string()
      .min(5, "Street must be at least 5 characters long")
      .required("Street is required"),
    pincode: yup
      .string()
      .matches(/^[1-9][0-9]{5}$/, "Invalid pincode. Must be a 6-digit number.")
      .required("Pincode is required"),
  }),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character."
    )
    .required("Password is required"),

  product: yup
    .array()
    .of(yup.string().matches(/^[0-9a-fA-F]{24}$/, "Invalid product ID")),

  image: yup
    .mixed()
    .test("fileSize", "File size too large (max 5MB)", (file) => {
      if (!file) return true; // Skip validation if no file is uploaded
      return file.size <= 5 * 1024 * 1024; // 5MB in bytes
    })
    .test("fileType", "Invalid file type (must be jpg, jpeg, png)", (file) => {
      if (!file) return true; // Skip validation if no file is uploaded
      return ["image/jpeg", "image/png", "image/jpg"].includes(file.type); // Check MIME type
    }),
  gstIn: yup
    .string()
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GSTIN format"
    )
    .required("GSTIN is required"),
});

export default ownerValidator;

import * as Yup from "yup";

const LoginValidator = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const UserRegistrationValidator = Yup.object().shape({
  firstname: Yup.string()
    .required("First name is required") // First name is required
    .min(2, "First name must be at least 2 characters") // Minimum length
    .max(50, "First name must be less than 50 characters"), // Maximum length

  lastname: Yup.string()
    .required("Last name is required") // Last name is required
    .min(2, "Last name must be at least 2 characters") // Minimum length
    .max(50, "Last name must be less than 50 characters"), // Maximum length

  email: Yup.string()
    .required("Email is required") // Email is required
    .email("Invalid email address"), // Validate email format

  password: Yup.string()
    .required("Password is required") // Password is required
    .min(8, "Password must be at least 8 characters") // Minimum length
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ), // Password complexity
});

export { UserRegistrationValidator, LoginValidator };

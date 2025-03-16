import * as yup from "yup";
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30)
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

export const cartValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(8, "Phone number must be at least 8 digits"),
  address: yup.string().required("Address is required"),
  paymentMethod: yup.string().required("Payment method is required"),
});

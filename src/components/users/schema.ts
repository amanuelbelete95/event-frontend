import * as yup from "yup"

const baseUserSchema = {
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
};

export const logInSchema = yup.object({
  ...baseUserSchema,
});

export const registerSchema = yup.object({
  ...baseUserSchema,
  confirmPassword: yup
    .string()
    .required("Confirm the password")
    .oneOf([yup.ref("password")], "Passwords must match")
});

export type CreateUpdateUser = yup.InferType<typeof registerSchema>;

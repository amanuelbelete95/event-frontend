import * as yup from "yup"

export const createUpdateUserSchema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    role: yup.string()
      .required("Role is required")
      .oneOf(["admin", "user"], "Role must be either admin or user"),
  });

export type CreateUpdateUser = yup.InferType<typeof createUpdateUserSchema>
import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9]*$/, "Username can only contain letters and numbers"),


  email: z
    .string()
    .email("Invalid email format"),


    password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character"),

    confirmPassword: z
    .string(),


  city: z
    .string()
    .min(3, "City must be at least 3 characters long")
    .max(50, "City must be less than 50 characters")
    .regex(/^[a-zA-Z]*$/, "City can only contain letters"),

  gender: z
    .enum(["male", "female", "other"], { required_error: "Gender is required" }),


  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]*$/, "Phone number can only contain numbers and may start with a '+'")
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number must be less than 15 characters"),

  dob: z
    .string()
    .refine((date) => !date || !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['confirmPassword']
      });
    }
  });

export default registerSchema;

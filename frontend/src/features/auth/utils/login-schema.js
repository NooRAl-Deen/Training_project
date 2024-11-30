import { z } from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "The name is required and must be at least 3 characters long.",
    })
    .refine((value) => typeof value === "string", {
      message: "The name is invalid and needs to be a string.",
    }),

  password_prop: z
    .string()
    .regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/, {
      message:
        "The password needs to be at least 8 characters long and have at least one of each of the following: lowercase letter, uppercase letter, special character, and number.",
    }),
});

export default loginSchema;

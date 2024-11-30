import { z } from "zod";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; 

const schema = z.object({
  username: z
    .string()
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]*$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .optional()
    .refine((value) => !value || value.length >= 3, {
      message: "Username must be at least 3 characters long",
    }),

  email: z
    .string()
    .email("Invalid email format")
    .optional(),

  city: z
    .string()
    .max(50, "City must be less than 50 characters")
    .regex(
      /^[a-zA-Z]*$/,
      "City can only contain letters"
    )
    .optional()
    .refine((value) => !value || value.length >= 3, {
      message: "City must be at least 3 characters long",
    }),

  gender: z
    .enum(["male", "female", "other"], { required_error: "Gender is required" })
    .optional(),

  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]*$/, "Phone number can only contain numbers and may start with a '+'")
    .max(15, "Phone number must be less than 15 characters")
    .optional()
    .refine((value) => !value || value.length >= 10, {
      message: "Phone number must be at least 10 characters long if provided",
    }),

  dob: z
    .string()
    .refine((date) => !date || !isNaN(Date.parse(date)), { 
      message: "Invalid date format",
    })
    .optional(),

    profilePic: z
    .union([z.instanceof(File).optional(), z.string().optional()])
    .refine((value) => {
      if (value instanceof File) {
        return (
          ALLOWED_IMAGE_TYPES.includes(value.type) && value.size <= MAX_IMAGE_SIZE
        );
      }
      return true;
    }, {
      message: "Invalid file type or size. Only JPG, PNG, and GIF are allowed and size must be less than 2 MB.",
      path: ["profilePic"],
    }),
});

export default schema;

import { z } from "zod";


const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; 

const postSchema = z
  .object({
    description: z.string().optional(),

    images: z
      .array(
        z.union([
          z
            .object({
              file: z.instanceof(File),
              preview: z.string(),
            })
            .refine(
              (image) => {
                if (image.file instanceof File) {
                  return (
                    ALLOWED_IMAGE_TYPES.includes(image.file.type) &&
                    image.file.size <= MAX_IMAGE_SIZE
                  );
                }
                return true;
              },
              {
                message:
                  "Invalid file type or size. Only JPG, PNG, and GIF are allowed, and the size must be less than 2 MB.",
                path: ["images", "file"],
              }
            ),
          z.string().optional(),
        ])
      )
      .optional(),
  })
  .refine(
    (data) => data.description || (data.images && data.images.length > 0),
    {
      message: "At least one of 'description' or 'images' must be provided.",
      path: ["description"],
    }
  );

export default postSchema;

import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];

export const zodPostSchema = z.object({
  caption: z.string().min(1, "Caption is required"),

  image: z
    .any()
    .refine((file) => file, "Image file is required")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.mimetype),
      "Only .jpg, .jpeg, .png and .webp files are accepted"
    )
});

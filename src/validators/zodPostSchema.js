import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];

export const zodPostSchema = z.object({
  // Caption is required and must be a non-empty string
  caption: z
    .string({ required_error: "Caption is required" })
    .min(1, "Caption is required"),

  // Image is required and must be one of the accepted types
  image: z
    .any()
    .refine((file) => file, "Image file is required")
    .refine(
      (file) => file?.mimetype && ACCEPTED_IMAGE_TYPES.includes(file.mimetype),
      "Only .jpg, .jpeg, .png and .webp files are accepted"
    )
});

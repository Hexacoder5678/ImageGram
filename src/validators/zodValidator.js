import { ZodError } from "zod";

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      // Merge body + file (if present)
      const dataToValidate = {
        ...req.body,
        image: req.file || undefined
      };

      schema.parse(dataToValidate);

      next();
    } catch (error) {
      // ✅ Handle Zod validation errors nicely
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues.map((err) => ({
            field: err.path.join("."), // which field failed
            message: err.message       // why it failed
          }))
        });
      }

      // ✅ Handle any unexpected errors
      return res.status(500).json({
        success: false,
        message: "Something went wrong during validation",
        errors: []
      });
    }
  };
};

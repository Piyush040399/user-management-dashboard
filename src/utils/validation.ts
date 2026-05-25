import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(["active", "inactive", "pending"]),
});

export type UserFormData = z.infer<
  typeof userSchema
>;
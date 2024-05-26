import { z } from "zod";
import { siteConfigs } from "./brand/constant";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Please enter email to continue" })
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(
      siteConfigs.passwordMinLength,
      "Password must be at least 8 characters"
    ),
});

export const signupSchema = z.object({
  username: z
    .string()
    .min(
      siteConfigs.usernameMinLength,
      "Username must be at least 3 characters"
    ),
  email: z
    .string({ required_error: "Please enter email to continue" })
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(
      siteConfigs.passwordMinLength,
      "Password must be at least 8 characters"
    ),
});

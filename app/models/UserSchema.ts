import * as z from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .max(5, { message: "Username cannot exceed 5 characters." }),
  email: z
    .string()
    .email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long." })
    .max(25, { message: "Password cannot exceed 25 characters." }),
  avatar: z.string().optional(),
});

export type signUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long." })
    .max(25, { message: "Password cannot exceed 25 characters." }),
});

export type loginSchema = z.infer<typeof loginSchema>;

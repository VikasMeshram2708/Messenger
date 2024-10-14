import * as z from "zod";

export const sendMessageSchema = z.object({
  content: z
    .string()
    .min(2, { message: "Content must be at least 2 characters long." })
    .max(150, { message: "Content must not exceed 150 characters." }),

  postImg: z
    .union([
      z.instanceof(File).refine((file) => file.size > 0, {
        message: "Please upload a valid image file.",
      }),
      z.string().url("Invalid URL format for image."),
      z
        .string()
        .regex(
          /^data:image\/(png|jpg|jpeg|gif);base64,/,
          "Invalid base64 image format."
        ),
    ])
    .optional(),

  postVideo: z
    .union([
      z.instanceof(File).refine((file) => file.size > 0, {
        message: "Please upload a valid video file.",
      }),
      z.string().url("Invalid URL format for video."),
      z
        .string()
        .regex(
          /^data:video\/(mp4|webm|ogg);base64,/,
          "Invalid base64 video format."
        ),
    ])
    .optional(),
});

export type sendMessageSchema = z.infer<typeof sendMessageSchema>;

export const deletePostSchema = z.object({
  postId: z.number(),
});
export type deletePostSchema = z.infer<typeof deletePostSchema>;

export const updatePostSchema = z.object({
  postId: z.number(),
  content: z
    .string()
    .min(2, { message: "Content must be at least 2 characters long." })
    .max(150, { message: "Content must not exceed 150 characters." }),

  postImg: z
    .union([
      z.instanceof(File).refine((file) => file.size > 0, {
        message: "Please upload a valid image file.",
      }),
      z.string().url("Invalid URL format for image."),
      z
        .string()
        .regex(
          /^data:image\/(png|jpg|jpeg|gif);base64,/,
          "Invalid base64 image format."
        ),
    ])
    .optional(),

  postVideo: z
    .union([
      z.instanceof(File).refine((file) => file.size > 0, {
        message: "Please upload a valid video file.",
      }),
      z.string().url("Invalid URL format for video."),
      z
        .string()
        .regex(
          /^data:video\/(mp4|webm|ogg);base64,/,
          "Invalid base64 video format."
        ),
    ])
    .optional(),
});

export type updatePostSchema = z.infer<typeof updatePostSchema>;

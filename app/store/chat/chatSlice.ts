import {
  deletePostSchema,
  sendMessageSchema,
  updatePostSchema,
} from "@/app/models/MessageSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatSlice = createApi({
  reducerPath: "chat",
  tagTypes: ["Chat"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/m" }),
  endpoints: (builder) => ({
    // Fetch all posts of a specific User
    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: "/all",
      }),
      transformResponse: (response: { posts: Post[] }) => {
        return response?.posts;
      },
      providesTags: ["Chat"],
    }),
    // Send Post
    sendPost: builder.mutation({
      query: (data: sendMessageSchema) => ({
        url: "/send",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Chat"],
      transformResponse: (response: { message: string }) => {
        return response.message;
      },
      transformErrorResponse: ({ data }) => {
        return (data as { message: string })?.message || "An Error Ocurred";
      },
    }),
    // Delete Post
    deleteMyPost: builder.mutation({
      query: (data: deletePostSchema) => ({
        url: "/delete",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Chat"],
      transformResponse: (response: { message: string }) => {
        return response.message;
      },
    }),
    // Update Post
    updateMyPost: builder.mutation({
      query: (data: updatePostSchema) => ({
        url: "/update",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags:["Chat"],
      transformResponse: (response: { message: string }) => {
        return response.message;
      },
      transformErrorResponse: ({ data }) => {
        return (data as { message: string })?.message || "An Error Ocurred";
      },
    }),
  }),
});

export const {
  useSendPostMutation,
  useGetAllPostsQuery,
  useDeleteMyPostMutation,
  useUpdateMyPostMutation,
} = chatSlice;

import { signUpSchema } from "@/app/models/UserSchema";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "User",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/u" }),
  endpoints: (builder) => ({
    // Register New User
    newUser: builder.mutation({
      query: (data: signUpSchema) => ({
        url: "/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response: { message: string }) => {
        return response?.message;
      },
      transformErrorResponse: ({ data }: FetchBaseQueryError) => {
        return (data as { message: string })?.message || "An Error Ocurred";
      },
    }),
    // Fetch User Details
    getUserDetails: builder.query({
      query: () => "/profile",
      providesTags: ["User"],
      transformResponse: (response: { user: FetchedUser }) => {
        return response.user;
      },
    }),
  }),
});

export const { useNewUserMutation, useGetUserDetailsQuery } = userSlice;

import apiSlice from "./apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "getuser",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    getInvitedUser: builder.query({
      query: (organizationId, userId, user) => ({
        url: `getuser-under-organization/${organizationId}/${userId}/${user}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `updateuser`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: `updatepassword`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    loginStatus: builder.query({
      query: () => ({
        url: "loginstatus",
      }),
      keepUnusedDataFor: 5,
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "reset-password",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "verifyotp",
        method: "POST",
        body: data,
      }),
    }),

    logoutUser: builder.mutation({
      query: (data) => ({
        url: "logout",
        method: "POST",
        body: data,
      }),
    }),
    verifyResetPassword: builder.mutation({
      query: (data) => ({
        url: "verify-reset-password",
        method: "POST",
        body: data,
      }),
    }),

    createOrganization: builder.mutation({
      query: (data) => ({
        url: "create_organization",
        method: "POST",
        body: data,
      }),
    }),

    createSession: builder.mutation({
      query: (data) => ({
        url: "session",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useResetPasswordMutation,
  useVerifyResetPasswordMutation,
  useCreateOrganizationMutation,
  useGetUserQuery,
  useLoginStatusQuery,
  useLogoutUserMutation,
  useCreateSessionMutation,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
  useGetInvitedUserQuery,
  useVerifyOtpMutation,
} = authApi;

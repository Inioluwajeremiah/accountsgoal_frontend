import { ORGANIZATION_URL } from "../utils/Endpoints";
import apiSlice from "./apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAnOrganization: builder.mutation({
      query: (data) => ({
        url: `create_organization/${data.user}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Organization"],
    }),
    createOrganizationAndSkipInviteMutation: builder.mutation({
      query: (data) => ({
        url: `create_organizationandskipinvite/${data.user}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Organization"],
    }),

    getAllOrganizations: builder.query({
      query: () => ({
        url: `getAllOrganizations`,
      }),
      providesTags: ["Organization"],
      keepUnusedDataFor: 5,
    }),

    getAnOrganization: builder.query({
      query: ({ userId }) => ({
        url: `getOrganization/${userId}`,
      }),
      providesTags: ["Organization"],
      keepUnusedDataFor: 5,
    }),
    updateOrganization: builder.mutation({
      query: (data) => ({
        url: `updateOrganization/${data.orgId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Organization"],
    }),
    deleteOrganization: builder.mutation({
      query: (userId) => ({
        url: `deleteTodoList/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Organization"],
    }),
    deactivateOrganization: builder.mutation({
      query: ({ userId }) => ({
        url: `disable-organization/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Organization"],
    }),
    leaveOrganization: builder.mutation({
      query: (body) => ({
        url: `leaveOrganization`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Organization"],
    }),
    removeUserFromOrganization: builder.mutation({
      
      query: ({ userId, userEmail }) => ({
        url: `removeUserFromOrganization/${userId}`,
        method: "DELETE",
        body: { userEmail },
      }),
      invalidatesTags: ["Organization"],
      
    }),
    

    // remindUser: builder.mutation({
    //   query: (body) => {
    //     console.log("remindUser query called with body:", body);
    //     return {
    //       url: `${ORGANIZATION_URL}remindUser/${body.organizationId}`,
    //       method: "POST",
    //       body: body,
    //     };
    //   },
    //   invalidatesTags: ["Organization"],
    // }),
    // extraOptions: {
    //   rejectWithValue: (error) => {
    //     console.error("Error in remindUser mutation: ", error);
    //     return error;
    //   },
    // },

    remindUser: builder.mutation({
      query: (organizationId, userId, data) => ({
        url: `remindUser/${organizationId}/${userId}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Organization"],
    }),
    addMember: builder.mutation({
      query: (body) => ({
        url: `create-invite/${body.organizationId}/${body.userId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Organization"],
    }),
  }),
});

export const {
  useCreateAnOrganizationMutation,
  useCreateOrganizationAndSkipInviteMutationMutation,
  useUpdateOrganizationMutation,
  useGetAnOrganizationQuery,
  useDeactivateOrganizationMutation,
  useLeaveOrganizationMutation,
  useRemindUserMutation,
  useRemoveUserFromOrganizationMutation,
  useAddMemberMutation,
} = organizationApiSlice;

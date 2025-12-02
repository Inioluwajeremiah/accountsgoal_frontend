import { GOAL_URL } from "../utils/Endpoints";
import apiSlice from "./apiSlice";

export const goalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGoal: builder.mutation({
      query: (data) => ({
        url: `${GOAL_URL}createGoal/${data.uniqueId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Goal"],
    }),

    getAllGoals: builder.query({
      query: ({ user }) => ({
        url: `${GOAL_URL}getAllGoals/${user}`,
      }),
      transformResponse: (response) => {
        console.log("response transform ==>", response);
        // Check if the response contains a goals array
        if (response && response.goals) {
          // Sort the goals array in descending order based on the endDate
          return response.goals.sort(
            (a, b) => new Date(a.endDate) - new Date(b.endDate)
          );
        }
        // If the response doesn't contain a goals array, return an empty array
        return [];
      },
      providesTags: ["Goal"],
      keepUnusedDataFor: 5,
    }),
 


    getGoal: builder.query({
      query: ({ uniqueId }) => ({
        url: `${GOAL_URL}getGoalById/${uniqueId}`,
      }),
      transformResponse: (response) => {
        // Sort the response data in ascending order based on the endDate
        console.log("response transform ==>", response);
        return response.data.goalId.sort(
          (a, b) => new Date(a.endDate) - new Date(b.endDate)
        );
      },
      providesTags: ["Goal"],
      keepUnusedDataFor: 5,
    }),
    /*getAllGoals: builder.query({
      query: ({ user }) => ({
        url: `${GOAL_URL}getAllGoals/${user}`,
      }),
      providesTags: ["Goal"],
      keepUnusedDataFor: 5,
    }),

    getGoal: builder.query({
      query: ({ uniqueId }) => ({
        url: `${GOAL_URL}getGoalById/${uniqueId}`,
      }),
      transformResponse: (response) => {
        // Sort the response data in descending order
        console.log("response transform ==>", response);
        return response.data.goalId.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      },
      providesTags: ["Goal"],
      keepUnusedDataFor: 5,
    }),*/
    editGoal: builder.mutation({
      query: (data) => ({
        url: `${GOAL_URL}editGoal/${data.uniqueId}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Goal"],
    }),
    completeGoal: builder.mutation({
      query: (data) => ({
        url: `${GOAL_URL}completedGoal/${data.uniqueId}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Goal"],
    }),
    deleteGoal: builder.mutation({
      query: ({ uniqueId, id }) => ({
        url: `${GOAL_URL}deleteGoal/${uniqueId}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Goal"],
    }),
  }),
});

export const {
  useCreateGoalMutation,
  useGetAllGoalsQuery,
  useGetGoalQuery,
  useEditGoalMutation,
  useCompleteGoalMutation,
  useDeleteGoalMutation,
} = goalApiSlice;

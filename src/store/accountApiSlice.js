import { BASE_URL } from "../utils/Endpoints";
import apiSlice from "./apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExcelData: builder.query({
      query: ({ userId }) => ({
        url: `getexcelData/${userId}`,
      }),
      providesTags: ["Account", "Goal"],
      keepUnusedDataFor: 5,
    }),

    getAllExcelData: builder.query({
      query: () => ({
        url: `getAllexcelData`,
      }),
      providesTags: ["Account", "Goal"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetExcelDataQuery, useGetAllExcelDataQuery } =
  accountApiSlice;

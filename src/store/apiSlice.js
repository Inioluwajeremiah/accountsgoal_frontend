import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/Endpoints";

// const baseQuery = fetchBaseQuery({
//   baseUrl: '"https://apiservice.estudylite.com',
// });

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',  
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: [
    "Account",
    "Event",
    "Goal",
    "Note",
    "Organization",
    "User",
    "Todo",
  ],
  endpoints: (builder) => ({}),
});

export default apiSlice;

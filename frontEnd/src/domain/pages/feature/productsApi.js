// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../common/utils/config";

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.HOST_NAME }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (request) => {
        return {
          url: `productsApi`,
          params:  request ,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery } = productsApi;

// Define a service using a base URL and expected endpoints
export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.HOST_NAME }),
  endpoints: (builder) => ({
    getAllRestaurant: builder.query({
      query: (request) => {
        return {
          url: `restaurantApi`,
          params:  request ,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllRestaurantQuery } = restaurantApi;
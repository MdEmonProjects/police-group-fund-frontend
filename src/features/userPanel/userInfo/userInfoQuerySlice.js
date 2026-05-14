import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_SERVER_URL;

export const userPanelUserInfo = createApi({
  reducerPath: 'userpanelUserInfo',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/userpanel/user/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('user_panel_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'MaddrasahReports',
    'StudentParentsReports',
    'ClassRoutines',
    'HomeWorks',
    'HomeWorkStudyTracks',
  ],
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => `get_user_details`,
    }),

    /* ================= POST ================= */

    // ============= Class Routine day ===================

    getTotalDoner: builder.query({
      query: () => "get_all_user_details",
    }),
    getUserDetailsByID: builder.query({
      query: (id) => `get_user_details_by_id/${id}`,
    }),


    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `update_user_info`,
        method: "PUT",
        body: data,
      }),
    }),

    savePayment: builder.mutation({
      query: (data) => ({
        url: `save-payment`,
        method: "POST",
        body: data,
      }),
    }),



  }),
});

export const {
  useGetUserDetailsQuery,
  useGetTotalDonerQuery,
  useGetUserDetailsByIDQuery,
  useUpdateUserProfileMutation,
  useSavePaymentMutation,
} = userPanelUserInfo;

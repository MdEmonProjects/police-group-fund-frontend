import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_SERVER_URL;

export const adminPanelDonerInfo = createApi({
  reducerPath: 'userpanelUserInfo',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/admin/user/`,
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
    getInactiveUserDetails: builder.query({
      query: () => `get_all_inactive_user_details`,
    }),
    postUpdateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `update_user_status`,
        method: 'POST',
        body: { status, userId },
      }),
    }),


  }),
});

export const {
  useGetInactiveUserDetailsQuery,
  usePostUpdateUserStatusMutation
} = adminPanelDonerInfo;

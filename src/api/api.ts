import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGitHubUserCardProps } from '../model/SearchResults';
import IUserDetails from '../model/CardModal';

export interface ISearchUsersResponse {
  items: IGitHubUserCardProps[];
  total_count: number;
}

export interface IQueryParams {
  query: string;
  page: number;
  perPage: number;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (builder) => ({
    fetchUsers: builder.query<ISearchUsersResponse, IQueryParams>({
      query: ({ query, page, perPage }) =>
        `search/users?q=${query || 'a'}&per_page=${perPage}&page=${page}`,
    }),
    fetchUserDetails: builder.query<IUserDetails, string>({
      query: (userId) => `user/${userId}`,
    }),
  }),
});

export const { useFetchUsersQuery, useFetchUserDetailsQuery } = api;

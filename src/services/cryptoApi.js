import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': 'fee93448b9msh80d1afcbed37d02p1a4e73jsn673658f46b7c',
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers:cryptoApiHeaders})

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints:(builder) => ({
    getCryptos:builder.query({
      query:(count) => createRequest(`/coins?limit=${count}`)
    })
  })
})


export const {
  useGetCryptosQuery,
} = cryptoApi;
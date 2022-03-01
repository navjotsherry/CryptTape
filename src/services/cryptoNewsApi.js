import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
      'x-rapidapi-key': 'fee93448b9msh80d1afcbed37d02p1a4e73jsn673658f46b7c'
}

const createRequest = (url) => ({
    url,
    headers:cryptoNewsHeaders,
})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder) => ({
        getNews:builder.query({
            query:({newsCategory,count})=> createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
   
})


export const {useGetNewsQuery} = cryptoNewsApi;
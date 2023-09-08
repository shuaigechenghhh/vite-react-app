import { createAlova } from 'alova';
import ReactHook from 'alova/react';
import GlobalFetch from 'alova/GlobalFetch';
import { axiosRequestAdapter } from '@alova/adapter-axios';

// user alova instance
export const userAlova = createAlova({
  baseURL: 'http://localhost:3002',
  statesHook: ReactHook,
  requestAdapter: GlobalFetch(),
  responsed: (response) => response.json(),
});

// upload alova instance
export const uploadAlova = createAlova({
  baseURL: 'http://localhost:3002',
  statesHook: ReactHook,
  requestAdapter: axiosRequestAdapter(),
  localCache: null
});


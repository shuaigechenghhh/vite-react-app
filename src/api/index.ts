import { createAlova } from 'alova';
import ReactHook from 'alova/react';
import GlobalFetch from 'alova/GlobalFetch';

// user alova instance
export const userAlova = createAlova({
  baseURL: 'http://localhost:3002',
  statesHook: ReactHook,
  requestAdapter: GlobalFetch(),
  responsed: (response) => response.json(),
});

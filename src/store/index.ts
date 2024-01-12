import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import userInfoReducer from './userInfo'

export default configureStore({
  reducer: {
    counter: counterReducer,
    userInfo: userInfoReducer
  }
})
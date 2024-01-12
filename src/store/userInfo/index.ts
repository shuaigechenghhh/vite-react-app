import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    value: {
        name:'pc',
        password:'199811' 
    }
  },
  reducers: {
    getUserInfo:state=>{
        state.value=localStorage.getItem('userInfo')as any
    },
    setUserInfo:(state,value:any)=>{
        state.value=value
        localStorage.setItem('userInfo',value)
    }
  }
})

export const { getUserInfo,setUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer

// export const selectCount = (state:any )=> state.userInfo.value
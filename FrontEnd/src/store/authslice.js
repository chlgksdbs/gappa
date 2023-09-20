import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {

  },
  reducers: {
    // 리듀서를 회원가입 페이지 마다 작성해서 처리.
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
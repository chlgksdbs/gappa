import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login_Id:'',
    login_Password:'',
    phone:'',
    name:'',
    address:'',
    account_Number:'',
    bank:'',
    balance:'',
    pin_Password:'',
    bank_Img:'',
  },
  reducers: {
    // 리듀서를 회원가입 페이지 마다 작성해서 처리.
    updateUserInfo(state,action){
      const newItem = action.payload;
      state.login_Id = newItem.login_Id;
      state.login_Password = newItem.login_Password;
      state.name = newItem.name;
      state.phone = newItem.phone;
      state.address = newItem.address;
    },
    
    updatedUserBank(state,action){
      const newItem = action.payload;
      state.account_Number = newItem.account_Number;
      state.bank = newItem.bank;
      state.balance = newItem.balance;
      state.bank_Img = newItem.bank_Img;
    },

    updatedUserPin(state,action){
      const newItem = action.payload;
      state.pin_Password = newItem.pin_Password;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { stateUserType } from "../type/store.types";

import { userAuthCheck } from "../Thunk/Users.Thunk"


const initialState: stateUserType = {
    users:[],
    authUser:{
      name: "",
      auth: false
    },
    inputs:{
        login: "",
        email: "",
        password: "",
        checkPassword: "",
    }
  }

  const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        setInput: (state, action)=>{
            state.inputs = { ...state.inputs, ...action.payload }
         },
        resetInput: (state)=>{
          state.inputs = {
              login: "",
              email: "",
              password: "",
              checkPassword: "",
          }
         },  
         setAuthUser: (state, action) =>{
          console.log(action.payload);
          
          state.authUser = { ...state.authUser, ...action.payload }
         }
     
  },   
   extraReducers(builder) {
        builder
        .addCase(userAuthCheck.fulfilled, (state, action)=>{
          state.authUser = { ...state.authUser, ...action.payload }
        })
    },
})
export const {setInput,resetInput,setAuthUser} = usersSlice.actions;
export default usersSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
import { stateUserType } from "../type/store.types";

import { logoutUser, userAuthCheck, userLogin } from "../Thunk/Users.Thunk"


const initialState: stateUserType = {
    users:[],
    authUser:{
      name: "",
      auth: false
    },
    inputRegister:{
        login: "",
        email: "",
        password: "",
        checkPassword: "",
    },
    inputLogin:{
      email: "",
      password: "",
  }
  }

  const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        setInputRegister: (state, action)=>{
            state.inputRegister = { ...state.inputRegister, ...action.payload }
         },
        resetInputRegister: (state)=>{
          state.inputRegister = {
              login: "",
              email: "",
              password: "",
              checkPassword: "",
          }
         },  
         setInputLogin: (state, action)=>{
          state.inputLogin = { ...state.inputLogin, ...action.payload }
         },
         resetInputLogin: (state)=>{
            state.inputLogin = {
                email: "",
                password: "",
          }
          },  
         setAuthUser: (state, action) =>{          
          state.authUser = { ...state.authUser, ...action.payload }
         }
     
  },   
   extraReducers(builder) {
        builder
        .addCase(userAuthCheck.fulfilled, (state, action)=>{
          if(action.payload){
          const {login} = action.payload
          state.authUser = { name: login, auth: true}
        }
        })
        .addCase(logoutUser.fulfilled, (state)=>{
          state.authUser = { name: "", auth: false}
        })
    },
})
export const {setInputRegister,resetInputRegister,setInputLogin,resetInputLogin,setAuthUser} = usersSlice.actions;
export default usersSlice.reducer
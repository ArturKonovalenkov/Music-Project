import { createAsyncThunk } from "@reduxjs/toolkit";

export const userAuthCheck = createAsyncThunk("fetch/userAuthCheck",async()=>{
    try {
        const responce = await fetch("http://localhost:3000/auth/",{
           credentials: "include",
       });
       const result = await responce.json()
       console.log("🚀 ~ file: Users.Thunk.ts:9 ~ userAuthCheck ~ result:", result.user.login)
       return result.user.login
   } catch (error) {
       console.error("ne udalos pokazat", error);   
   } 
})

export const logoutUser = createAsyncThunk("fetch/logoutUser",async()=>{
    try {
        const responce = await fetch("http://localhost:3000/auth/logout",{
           credentials: "include",
       });
       const result = await responce.json()
       return result
   } catch (error) {
       console.error("ne udalos pokazat", error);   
   } 
})

export const userLogin = createAsyncThunk("fetch/userLogin",async(inputLogin)=>{
    try {
        const responce = await fetch("http://localhost:3000/auth/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputLogin),
            credentials: "include",
        });
       const result = await responce.json()
       return result
   } catch (error) {
       console.error("ne udalos pokazat", error);   
   } 
})

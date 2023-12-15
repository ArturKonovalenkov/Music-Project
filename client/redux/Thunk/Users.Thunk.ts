import { createAsyncThunk } from "@reduxjs/toolkit";

export const userAuthCheck = createAsyncThunk("fetch/userAuthCheck",async()=>{
    try {
        const responce = await fetch("http://localhost:3000/auth",{
           credentials: "include",
       });
       const result = await responce.json()
       return result
   } catch (error) {
       console.error("ne udalos pokazat", error);   
   } 
})
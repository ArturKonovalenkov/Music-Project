import { createAsyncThunk } from "@reduxjs/toolkit";

export const musicAll = createAsyncThunk("fetch/musicAll",async(value:string, tracks)=>{
    try {
        const responce = await fetch("http://localhost:3000/main");
       const result = await responce.json()
       const lowerCaseValue = value.toLowerCase()
       return result.filter((track)=> track.title.toLowerCase().includes(lowerCaseValue) || track.artists.toLowerCase().includes(lowerCaseValue))
   } catch (error) {
       console.error("ne udalos pokazat", error);   
   } 
})

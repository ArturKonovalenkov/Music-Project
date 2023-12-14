import { createSlice } from "@reduxjs/toolkit";
import { stateType } from "../type/store.types";


const initialState: stateType = {
    tracks: [],
    input: "",
    isPlaying: false,
    currentTrack: null,
    currentTime: 0,
    visiblePlayBar: false
  }

  const tracksSlice = createSlice({
    name: "tracks",
    initialState,
    reducers:{
      setTracks: (state,action)=>{
        state.tracks = [...state.tracks, ...action.payload]
      },
      setInput: (state,action)=>{
        state.input = action.payload;
      },
      setIsPlaying: (state,action)=>{
        state.isPlaying = action.payload;
      },
      setCurrentTrack: (state, action) => {
        state.currentTrack = action.payload;
      },
      setCurrentTime: (state, action) => {
        state.currentTime = action.payload;
      },
      setVisiblePlayBar: (state,action)=>{
        state.visiblePlayBar = action.payload;
      },
      
  },
})
export const {setTracks,setInput,setIsPlaying,setCurrentTrack,setCurrentTime,setVisiblePlayBar} = tracksSlice.actions;
export default tracksSlice.reducer
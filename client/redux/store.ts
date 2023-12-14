import { configureStore } from '@reduxjs/toolkit';

import tracksSlice from "./slice/Tracks.slice"

const store = configureStore({
    reducer: {
        tracks: tracksSlice,     
    },
})

export default store
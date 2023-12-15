import { configureStore } from '@reduxjs/toolkit';

import tracksSlice from "./slice/Tracks.slice"
import usersSlice from "./slice/Users.slice"


const store = configureStore({
    reducer: {
        tracks: tracksSlice,     
        users: usersSlice,
    },
})

export default store
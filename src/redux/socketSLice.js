import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socket: null,
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload; // ✅ Stores WebSocket
        },
        removeSocket: (state) => {
            state.socket = null; // ✅ Clears socket on disconnect
        },
    },
});

export const { setSocket, removeSocket } = socketSlice.actions;
export default socketSlice.reducer;

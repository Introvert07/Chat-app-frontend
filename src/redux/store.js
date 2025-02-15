import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";
import socketReducer from "./socketSLice"; // ✅ Ensure correct filename casing
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    socket: socketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["socket/setSocket"], // ✅ Ignore WebSocket state
                ignoredPaths: ["socket.socket"], // ✅ Prevent errors in Redux DevTools
            },
        }),
});

export default store;

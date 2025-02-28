import Signup from './components/Signup';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import Welcome from './components/Welcome';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setSocket, removeSocket } from './redux/socketSLice';
import { setOnlineUsers } from './redux/userSlice';
import { WEB_BASE_URL } from './index.js';

const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/welcome", element: <Welcome /> } // ✅ Fixed Syntax Error Here
]);

function App() {
    const { authUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authUser) {
            const socketio = io(WEB_BASE_URL, {
                transports: ["websocket", "polling"],
                withCredentials: true,
                query: { userId: authUser._id }
            });

            dispatch(setSocket(socketio));

            socketio.on('getOnlineUsers', (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers));
            });

            return () => {
                socketio.close();
                dispatch(removeSocket());
            };
        }
    }, [authUser, dispatch]);

    return (
        <div className="p-4 h-screen flex items-center justify-center">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;

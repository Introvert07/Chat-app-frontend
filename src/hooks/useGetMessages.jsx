import { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser?._id) {
                console.error("🚨 No user selected. Skipping message fetch.");
                return;
            }

            const token = localStorage.getItem("token");
            if (!token) {
                console.error("🚨 No token found. Redirecting to login...");
                window.location.href = "/login";
                return;
            }

            console.log("🔍 Fetching messages for user:", selectedUser._id);
            console.log("🌍 API URL:", `${BASE_URL}/api/v1/message/${selectedUser._id}`);

            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                console.log("✅ Messages fetched successfully:", res.data);
                dispatch(setMessages(res.data || []));
            } catch (error) {
                if (error.response) {
                    console.error("⚠️ Error Response:", error.response.status, error.response.data);
                    if (error.response.status === 401) {
                        console.error("🚨 Unauthorized. Redirecting to login...");
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    } else if (error.response.status === 404) {
                        console.warn("❌ No messages found for this user.");
                    }
                } else {
                    console.error("❌ Failed to fetch messages:", error.message);
                }
            }
        };

        fetchMessages();
    }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;

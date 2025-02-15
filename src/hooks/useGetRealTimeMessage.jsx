import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { messages } = useSelector(store => store.message);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            dispatch(setMessages([...messages, newMessage]));
        };

        socket?.on("newMessage", handleNewMessage);
        
        return () => socket?.off("newMessage", handleNewMessage);
    }, [dispatch, socket, messages]);  // ✅ Correct dependency array

};
export default useGetRealTimeMessage;

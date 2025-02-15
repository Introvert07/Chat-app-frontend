import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const OtherUsers = () => {
    const otherUsers = useSelector((state) => state.user.otherUsers);
    const [users, setUsers] = useState([]);

    useEffect(() => {
         // ✅ Debugging
        setUsers(otherUsers);
    }, [otherUsers]);

    if (!users || users.length === 0) {
        return <p>Loading users...</p>;
    }

    return (
        <div className=" overflow-auto flex-1">
            <h3>Other Users:</h3>
            {users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    );
};

export default OtherUsers;

import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then(date => setUsers(date));
    }, []);

    const handleDelete = (userId) =>
        setUsers(users.filter((user) => user._id !== userId));
    const handleToggleBookMark = (id) =>
        setUsers(
            users.map((item) =>
                item._id === id ? { ...item, favorites: !item.favorites } : item
            )
        );
    return (
        <div>
            {users && <Users
                users={users}
                onDelete={handleDelete}
                onToggleMark={handleToggleBookMark}
            />}
        </div>
    );
};

export default App;

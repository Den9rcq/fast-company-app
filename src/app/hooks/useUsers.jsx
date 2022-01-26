import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();
export const useUsers = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");

    // Запрос всех пользователей
    const getUsers = async () => {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setLoading(false);
        } catch (e) {
            errorCatcher(e);
        }
    };
    const getUserById = (id) => users.find(user => user._id === id);

    // Отработка ошибок
    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setErrors(message);
        setLoading(false);
    };
    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
            if (errors) {
                toast.error(errors);
                setErrors("");
            }
        }, [errors]
    );

    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : "Loading..."}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType(
        [
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]
    )
};

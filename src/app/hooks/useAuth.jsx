import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorage.service";
import { useHistory } from "react-router-dom";
import { getRandomInt } from "../utils/getRandomInt";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [errors, setErrors] = useState("");
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();

    // Отработка ошибок
    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setErrors(message);
    };
    useEffect(() => {
            if (errors) {
                toast.error(errors);
                setErrors("");
            }
        }, [errors]
    );

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    const getUserData = async () => {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (e) {
            errorCatcher(e);
        } finally {
            setLoading(false);
        }
    };

    async function singUp({ email, password, ...rest }) {
        const url = `accounts:signUp`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            await setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: getRandomInt(1, 5),
                completedMeetings: getRandomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${
                    (Math.random() + 1).toString(36).substring(7)}.svg`,
                ...rest
            });
        } catch (e) {
            errorCatcher(e);
            const { code, message } = e.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function singIn({ email, password }) {
        const url = `accounts:signInWithPassword`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            await setTokens(data);
            await getUserData();
        } catch (e) {
            const { code, message } = e.response.data.error;
            if (code === 400) {
                let errorObject;
                if (message === "EMAIL_NOT_FOUND") {
                    errorObject = {
                        email: "Пользователь с таким Email не существует"
                    };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    errorObject = {
                        email: "Данные введены не коректно",
                        password: "Данные введены не коректно"
                    };
                    throw errorObject;
                }
            }
        }
    }

    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }

    const createUser = async (data) => {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (e) {
            errorCatcher(e);
        }
    };

    return (
        <AuthContext.Provider value={{ singUp, singIn, logOut, createUser, currentUser }}>
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType(
        [
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]
    )
};

import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create();

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [errors, setErrors] = useState("");

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

    async function singUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            await setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
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
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            await setTokens(data);
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

    const createUser = async (data) => {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (e) {
            errorCatcher(e);
        }
    };

    return (
        <AuthContext.Provider value={{ singUp, singIn, currentUser }}>
            {children}
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

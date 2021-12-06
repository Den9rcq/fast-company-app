import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const httpAuth = axios.create();

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

const setTokens = async ({ expiresIn = 3600, idToken, refreshToken }) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
};

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
        <AuthContext.Provider value={{ singUp, currentUser }}>
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

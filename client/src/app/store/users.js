import { createSlice, createAction } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import history from "../utils/history";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequested: (state) => {
            state.isLoggedIn = false;
            state.error = null;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, actions) => {
            state.error = actions.payload;
        },
        userCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        userUpdate: (state, action) => {
            const userIndex = state.entities.findIndex(user => user._id === action.payload._id);
            state.entities[userIndex] = action.payload;
        },
        userLogOut: (state) => {
            state.entities = null;
            state.auth = null;
            state.isLoggedIn = false;
            state.dataLoaded = false;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    authRequested,
    userLogOut,
    userUpdate
} = actions;

// const authRequested = createAction("users/authRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const updateUserFailed = createAction("users/updateUserFailed");

export const singUp = (payload) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        await localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
        history.push("/users");
    } catch (e) {
        dispatch(authRequestFailed(e.message));
    }
};

export const logIn = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        await localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
        history.push(redirect);
    } catch (e) {
        const { code, message } = e.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        }
    }
};

export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.create(payload);
        dispatch(userUpdate(content));
        history.push(`/users/${payload._id}`);
    } catch (e) {
        dispatch(updateUserFailed());
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLogOut());
    history.push("/");
};

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.fetchAll();
        dispatch(usersReceived(content));
    } catch (e) {
        dispatch(usersRequestFailed(e.message));
    }
};

export const getUsers = () => (state) => state.users.entities;
export const getUserById = (userId) => (state) => state.users.entities.find(user => userId === user._id);
export const getCurrentUserData = () => (state) => state.users.entities
    ? state.users.entities.find(user => user._id === state.users.auth.userId)
    : null;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getErrorMessage = () => (state) => state.users.error;

export default usersReducer;

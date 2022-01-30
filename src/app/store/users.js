import { createSlice, createAction } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { getRandomInt } from "../utils/getRandomInt";

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
    userCreated,
    authRequested,
    userLogOut,
    userUpdate
} = actions;

// const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const createUserFailed = createAction("users/createUserFailed");
const updateUserFailed = createAction("users/updateUserFailed");

export const singUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register({
            email,
            password
        });
        await localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.localId }));
        dispatch(createUser({
            _id: data.localId,
            email,
            rate: getRandomInt(1, 5),
            completedMeetings: getRandomInt(0, 200),
            image: `https://avatars.dicebear.com/api/avataaars/${
                (Math.random() + 1).toString(36).substring(7)}.svg`,
            ...rest
        }));
    } catch (e) {
        dispatch(authRequestFailed(e.message));
    }
};

export const logIn = (payload) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        await localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.localId }));
    } catch (e) {
        dispatch(authRequestFailed(e.message));
    }
};

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
        } catch (e) {
            dispatch(createUserFailed(e.message));
        }
    };
};

export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.create(payload);
        dispatch(userUpdate(content));
    } catch (e) {
        dispatch(updateUserFailed());
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLogOut());
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

export default usersReducer;

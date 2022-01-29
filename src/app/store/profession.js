import { createSlice } from "@reduxjs/toolkit";
import { isOutdated } from "../utils/isOutdated";
import professionService from "../services/profession.service";

const professionSlice = createSlice({
    name: "profession",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionRequested: (state) => {
            state.isLoading = true;
        },
        professionReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionReducer, actions } = professionSlice;
const { professionRequested, professionReceived, professionRequestFailed } = actions;

export const loadProfessionList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().profession;
    if (isOutdated(lastFetch)) {
        dispatch(professionRequested());
        try {
            const { content } = await professionService.fetchAll();
            dispatch(professionReceived(content));
        } catch (e) {
            dispatch(professionRequestFailed(e.message));
        }
    }
};

export const getProfession = () => (state) => state.profession.entities;
export const getProfessionLoadingStatus = () => (state) => state.profession.isLoading;
export const getProfessionById = (profId) => (state) => state.profession.entities.find(prof => profId === prof._id);
export default professionReducer;

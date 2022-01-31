import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreate: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemove: (state, action) => {
            const indexComment = state.entities.findIndex(el => el._id === action.payload);
            state.entities.splice(indexComment, 1);
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestFailed, commentCreate, commentRemove } = actions;

export const loadCommentsList = (pageId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComment(pageId);
        dispatch(commentsReceived(content));
    } catch (e) {
        dispatch(commentsRequestFailed(e.message));
    }
};
export const createComment = (payload) => async (dispatch) => {
    try {
        const { content } = await commentService.createComment(payload);
        dispatch(commentCreate(content));
    } catch (e) {
        dispatch(commentsRequestFailed(e.message));
    }
};
export const removeComment = (payload) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComment(payload);
        if (content === null) {
            dispatch(commentRemove(payload));
        }
    } catch (e) {
        dispatch(commentsRequestFailed(e.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;

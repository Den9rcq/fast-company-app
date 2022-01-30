import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const CommentsContext = React.createContext();
export const useComments = () => useContext(CommentsContext);
export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        getComments();
    }, [userId]);
    useEffect(() => {
        if (errors) {
            toast.error(errors);
            setErrors("");
        }
    }, [errors]);

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };

        try {
            const { content } = await commentService.createComment(comment);
            setComments(prevState => [...prevState, content]);
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComment(userId);
            setComments(content);
        } catch (e) {
            errorCatcher(e);
        } finally {
            setLoading(false);
        }
    }

    async function removeComment(id) {
        try {
            const { content } = await commentService.removeComment(id);
            if (content === null) {
                setComments(prevState => prevState.filter(comment => comment._id !== id));
            }
        } catch (e) {
            errorCatcher(e);
        }
    }

    // Отработка ошибок
    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setErrors(message);
        setLoading(false);
    };

    return (
        <CommentsContext.Provider value={{ comments, isLoading, createComment, removeComment }}>
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType(
        [
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]
    )
};

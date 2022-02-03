import React, { useEffect } from "react";
import CommentForm from "./commentForm";
import CommentsList from "./commentsList";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "../../store/users";

const UserCommentCards = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const comments = useSelector(getComments());
    const isLoading = useSelector(getCommentsLoadingStatus());
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    // Отправка данных
    const handleSubmit = (data) => {
        dispatch(createComment({
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        }));
    };
    // Удаление данных
    const handleRemoveComment = (commentId) => {
        dispatch(removeComment(commentId));
    };
    const sortedComments = comments && [...comments].sort((a, b) => b.created_at - a.created_at);

    if (isLoading) return "Loading...";
    return (
        <div className="col-md-8">
            <div className="card mb-3">
                <CommentForm onSubmit={handleSubmit} />
                <CommentsList
                    comments={sortedComments}
                    onClick={handleRemoveComment}
                />
            </div>
        </div>
    );
};

export default UserCommentCards;

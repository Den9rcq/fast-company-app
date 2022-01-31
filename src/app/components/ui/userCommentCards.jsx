import React, { useEffect } from "react";
import CommentForm from "./commentForm";
import CommentsList from "./commentsList";
import { useComments } from "../../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import { getComments, getCommentsLoadingStatus, loadCommentsList } from "../../store/comments";
import { useParams } from "react-router-dom";

const UserCommentCards = () => {
    const { createComment, removeComment } = useComments();
    const { userId } = useParams();
    const dispatch = useDispatch();
    const comments = useSelector(getComments());
    const isLoading = useSelector(getCommentsLoadingStatus());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    // Отправка данных
    const handleSubmit = (data) => {
        createComment(data);
    };
    // Удаление данных
    const handleRemoveComment = (commentId) => {
        removeComment(commentId);
    };
    const sortedComments = comments && [...comments].sort((a, b) => a.created_at - b.created_at);

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

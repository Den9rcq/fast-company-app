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
            pageId: userId,
            userId: currentUserId
        }));
    };
    // Удаление данных
    const handleRemoveComment = (commentId) => {
        dispatch(removeComment(commentId));
    };
    const sortedComments = comments && [...comments].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    if (isLoading) return "Loading...";
    return (
        <div className="col-md-8">
            <div className="card mb-3">
                <CommentForm onSubmit={handleSubmit} />
                {sortedComments && <CommentsList
                    comments={sortedComments}
                    onClick={handleRemoveComment}
                />}
            </div>
        </div>
    );
};

export default UserCommentCards;

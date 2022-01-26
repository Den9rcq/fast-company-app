import React from "react";
import CommentForm from "./commentForm";
import CommentsList from "./commentsList";
import { useComments } from "../../hooks/useComments";

const UserCommentCards = () => {
    const { createComment, removeComment, comments, isLoading } = useComments();

    // Отправка данных
    const handleSubmit = (data) => {
        createComment(data);
    };
    // Удаление данных
    const handleRemoveComment = (commentId) => {
        removeComment(commentId);
    };

    const sortedComments = comments.sort((a, b) => b.created_at - a.created_at);
    return (
        <div className="col-md-8">
            <div className="card mb-3">
                <CommentForm onSubmit={handleSubmit} />
                {!isLoading && sortedComments.length !== 0 && <CommentsList
                    comments={sortedComments}
                    onClick={handleRemoveComment}
                />}
            </div>
        </div>
    );
};

export default UserCommentCards;

import React, { useEffect, useState } from "react";
import CommentForm from "./commentForm";
import api from "../../api";
import PropTypes from "prop-types";
import CommentsList from "./commentsList";

const UserCommentCards = ({ id }) => {
    const [users, setUsers] = useState();
    const [commentsForUser, setCommentsForUser] = useState([]);
    useEffect(() => {
        api.users.fetchAll().then(date => setUsers(date));
        api.comments.fetchCommentsForUser(id).then(date => setCommentsForUser(date));
    }, []);

    // Отправка данных
    const handleSubmit = (data) => {
        api.comments.add(data);
        api.comments.fetchCommentsForUser(id).then(date => setCommentsForUser(date));
    };
    // Удаление данных
    const handleClick = (commentId) => {
        api.comments.remove(commentId);
        api.comments.fetchCommentsForUser(id).then(date => setCommentsForUser(date));
    };

    const sortedComments = commentsForUser.sort((a, b) => b.created_at - a.created_at);

    return (
        <div className="col-md-8">
            <div className="card mb-3">
                <CommentForm
                    users={users}
                    pageId={id}
                    onSubmit={handleSubmit}/>
                {users && commentsForUser.length !== 0 && <CommentsList
                    comments={sortedComments}
                    users={users}
                    onClick={handleClick}
                />}
            </div>
        </div>
    );
};

UserCommentCards.propTypes = {
    id: PropTypes.string
};

export default UserCommentCards;

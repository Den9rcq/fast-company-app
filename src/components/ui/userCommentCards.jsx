import React, { useEffect, useState } from "react";
import CommentForm from "./commentForm";
import api from "../../api";
import PropTypes from "prop-types";
import CommentsList from "./commentsList";

const UserCommentCards = ({ id }) => {
    const [users, setUsers] = useState();
    const [data, setData] = useState({
        pageId: id,
        userId: "",
        content: ""
    });
    const [commentsForUser, setCommentsForUser] = useState([]);
    useEffect(() => {
        api.users.fetchAll().then(date => setUsers(date));
        api.comments.fetchCommentsForUser(id).then(date => setCommentsForUser(date));
    }, []);

    // Изменение данных в data
    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    // Отправка данных
    const handleSubmit = () => {
        api.comments.add(data);
        api.comments.fetchCommentsForUser(id).then(date => setCommentsForUser(date));
        setData({
            pageId: id,
            userId: "",
            content: ""
        });
        console.log(commentsForUser);
    };
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
                    data={data}
                    onChange={handleChange}
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

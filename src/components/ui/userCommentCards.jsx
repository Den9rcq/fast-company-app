import React, { useEffect, useState } from "react";
import CommentForm from "./commentForm";
import api from "../../api";
import PropTypes from "prop-types";

const UserCommentCards = ({ id }) => {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then(date => setUsers(date));
    }, []);
    return (
        <div className="col-md-8">
            <div className="card mb-3">
                <CommentForm users={users} pageId={id}/>
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr/>
                    comments
                </div>
            </div>
        </div>
    );
};

UserCommentCards.propTypes = {
    id: PropTypes.string
};

export default UserCommentCards;

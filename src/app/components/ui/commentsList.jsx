import React from "react";
import CommentCard from "./commentCard";
import PropTypes from "prop-types";

const CommentsList = ({ comments, users, onClick }) => {
    return (
        <div className="card-body ">
            <h2>Comments</h2>
            <hr/>
            {comments.map(c => <CommentCard
                    key={c._id}
                    content={c.content}
                    date={c.created_at}
                    userCommentId={c.userId}
                    commentId={c._id}
                    users={users}
                    onClick={onClick}
                />
            )}
        </div>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array,
    users: PropTypes.array,
    onClick: PropTypes.func
};

export default CommentsList;

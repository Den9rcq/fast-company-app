import React from "react";
import CommentCard from "./commentCard";
import PropTypes from "prop-types";

const CommentsList = ({ comments, onClick }) => {
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
                    onClick={onClick}
                />
            )}
        </div>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array,
    onClick: PropTypes.func
};

export default CommentsList;

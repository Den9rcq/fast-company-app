import React from "react";
import Avatar from "../common/avatar";
import PropTypes from "prop-types";
import { closeX } from "../../utils/icons";
import { getTimeDisplay } from "../../utils/timeDisplay";

const CommentCard = ({ content, date, userCommentId, commentId, users, onClick }) => {
    const userPostingComment = users.find(u => u._id === userCommentId);
    const { name } = userPostingComment;

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <Avatar/>
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {`${name} - `}
                                        <span className="small">
                                            {getTimeDisplay(date)}
                                        </span>
                                    </p>
                                    <button
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={() => onClick(commentId)}
                                    >
                                        {closeX}
                                    </button>
                                </div>
                                <p className="small mb-0">
                                    {content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CommentCard.propTypes = {
    content: PropTypes.string,
    date: PropTypes.string,
    userCommentId: PropTypes.string,
    commentId: PropTypes.string,
    users: PropTypes.array,
    onClick: PropTypes.func
};

export default CommentCard;

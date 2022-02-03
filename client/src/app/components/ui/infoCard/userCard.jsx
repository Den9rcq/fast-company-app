import React from "react";
import { caretDownFill, caretUpFill, gear } from "../../../utils/icons";
import PropTypes from "prop-types";
import Avatar from "../../common/avatar";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../../store/users";

const UserCard = ({ user, onClick }) => {
    const currentUser = useSelector(getCurrentUserData());
    const { name, profession, rate } = user;
    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser._id === user._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={onClick}
                    >
                        {gear}
                    </button>
                )}
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <Avatar url={user.image}/>
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <p className="text-secondary mb-1">{profession.name}</p>
                        <div className="text-muted">
                            <i className="bi bi-caret-down-fill text-primary"
                               role="button"
                            >{caretDownFill}</i>
                            <i className="bi bi-caret-up text-secondary" role="button">{caretUpFill}</i>
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.object,
    onClick: PropTypes.func
};

export default UserCard;

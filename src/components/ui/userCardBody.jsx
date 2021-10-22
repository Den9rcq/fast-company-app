import React from "react";
import { caretDownFill, caretUpFill, gear } from "../../utils/icons";
import PropTypes from "prop-types";

const UserCardBody = ({ user, onClick }) => {
    const { name, profession, rate } = user;
    return (
        <div className="card mb-3">
            <div className="card-body">
                <button
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                    onClick={onClick}
                >
                    {gear}
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={`https://avatars.dicebear.com/api/avataaars/${(
                            Math.random() + 1
                        )
                            .toString(36)
                            .substring(7)}.svg`}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="65"
                        height="65"
                    />
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

UserCardBody.propTypes = {
    user: PropTypes.object,
    onClick: PropTypes.func
};

export default UserCardBody;

import React from "react";
import Quality from "./quality";
import BookMark from "./bookMark";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    favorites,
    onDelete,
    onToggleMark
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((badge) => (
                    <Quality key={badge._id} {...badge} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} \ 5</td>
            <td>
                <BookMark
                    favorites={favorites}
                    onToggleMark={onToggleMark}
                    id={_id}
                />
            </td>
            <td>
                <button
                    onClick={() => onDelete(_id)}
                    type="button"
                    className="btn btn-danger"
                >
                    Удалить
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    favorites: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleMark: PropTypes.func.isRequired
};
export default User;

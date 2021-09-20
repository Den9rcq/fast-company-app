import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookMark";

const UsersTable = ({ users, onSort, selectedSort, onToggleMark, onDelete }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Профессия" },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился раз" },
        rate: { path: "rate", name: "Оценка" },
        favorites: {
            path: "favorites",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    onToggleMark={() => onToggleMark(user._id)}
                    favorites={user.favorites}/>
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    type="button"
                    className="btn btn-danger"
                >
                    Удалить
                </button>
            )
        }
    };
    return (
        <table className="table align-middle">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }}/>
        </table>
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default UsersTable;

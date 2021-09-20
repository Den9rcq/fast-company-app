import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookMark";
import Quality from "./quality";
import Table from "./table";

const UsersTable = ({ users, onSort, selectedSort, onToggleMark, onDelete }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => (
                user.qualities.map((badge) => (
                    <Quality
                        key={badge._id}
                        {...badge} />
                ))
            )
        },
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
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}/>
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

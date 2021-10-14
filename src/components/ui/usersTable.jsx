import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookMark";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Qualities from "./qualities";

const UsersTable = ({ users, onSort, selectedSort, onToggleMark, onDelete }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
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

import React from "react";
import User from "./user";
import PropTypes from "prop-types";
const UsersTable = ({ users, onSort, currentSort, ...rest }) => {
    // onSort = setSortBy
    const handleSort = (item) => {
        if (currentSort.iter === item) {
            onSort({
                ...currentSort,
                order: currentSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    return (
        <table className="table align-middle">
            <thead>
                <tr>
                    <th scope="col" onClick={() => handleSort("name")}>Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col" onClick={() => handleSort("profession.name")}>Профессия</th>
                    <th scope="col" onClick={() => handleSort("completedMeetings")}>Встретился, раз</th>
                    <th scope="col" onClick={() => handleSort("rate")}>Оценка</th>
                    <th scope="col" onClick={() => handleSort("favorites")}>Избранное</th>
                    <th scope="col"/>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User key={user._id} {...rest} {...user} />
                ))}
            </tbody>
        </table>
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired
};
export default UsersTable;

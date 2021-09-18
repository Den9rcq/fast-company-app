import React from "react";
import User from "./user";
import PropTypes from "prop-types";
const UsersTable = ({ users, onSort, ...rest }) => {
    return (
        <table className="table align-middle">
            <thead>
                <tr>
                    <th scope="col" onClick={() => onSort("name")}>Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col" onClick={() => onSort("profession.name")}>Профессия</th>
                    <th scope="col" onClick={() => onSort("completedMeetings")}>Встретился, раз</th>
                    <th scope="col" onClick={() => onSort("rate")}>Оценка</th>
                    <th scope="col" onClick={() => onSort("favorites")}>Избранное</th>
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
    onSort: PropTypes.func.isRequired
};
export default UsersTable;

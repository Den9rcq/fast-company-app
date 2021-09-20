import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const UsersTable = ({ users, onSort, selectedSort, ...rest }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Профессия" },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился раз" },
        rate: { path: "rate", name: "Оценка" },
        favorites: { path: "favorites", name: "Избранное" },
        delete: {}
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
    selectedSort: PropTypes.object.isRequired
};
export default UsersTable;

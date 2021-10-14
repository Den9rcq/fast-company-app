import React from "react";
import { TableHeader, TableBody } from "./";
import PropTypes from "prop-types";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
    return (
        <table className="table align-middle">
            {children || (
                <>
                    <TableHeader {...{ onSort, selectedSort, columns }} />
                    <TableBody {...{ columns, data }}/>
                </>
            )}
        </table>
    );
};
Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    children: PropTypes.array
};
export default Table;

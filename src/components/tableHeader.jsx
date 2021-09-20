import React from "react";
import PropTypes from "prop-types";
import { caretDownFill, caretUpFill } from "../utils/icons";
const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    const { order, path } = selectedSort;
    return (
        <thead>
            <tr>
                {Object.keys(columns).map(column => (
                    <th
                        key={column}
                        scope="col"
                        onClick={columns[column].path
                            ? () => handleSort(columns[column].path)
                            : null}
                        role={columns[column].path
                            ? "button"
                            : null}>
                        {columns[column].name}
                        {order === "asc" && path === columns[column].path
                            ? caretDownFill
                            : order === "desc" && path === columns[column].path
                                ? caretUpFill
                                : null}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
export default TableHeader;

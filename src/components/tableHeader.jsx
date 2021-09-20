import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    // onSort = setSortBy
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
                            : null}>{columns[column].name}
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

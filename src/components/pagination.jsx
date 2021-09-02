import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = ({ itemCount, pageSize, onPageChange, currentPage }) => {
    // Определяем количество страниц
    const pageCount = Math.ceil(itemCount / pageSize);
    // Создаём массив с количеством страниц
    const pages = _.range(1, pageCount + 1);
    return (
        <>
            {pageCount > 1 && (
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {pages.map((page) => (
                            <li
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`page-item ${
                                    page === currentPage ? "active" : ""
                                }`}
                            >
                                <a className="page-link">{page}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </>
    );
};

Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;

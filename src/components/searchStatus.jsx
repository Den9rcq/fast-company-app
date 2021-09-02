import React from "react";
import { getLastNumber } from "../utils/getLastNumber";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        const char =
            getLastNumber(number) === 1 || getLastNumber(number) >= 5
                ? ""
                : "а";
        return number === 0
            ? "Никто с тобой не тусанёт"
            : `${number} человек${char} тусанёт с тобой сегодня`;
    };
    const getBadgeClasses = (number) =>
        number === 0 ? "badge bg-danger" : "badge bg-primary";
    return (
        <h2>
            <span className={getBadgeClasses(length)}>
                {renderPhrase(length)}
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
export default SearchStatus;

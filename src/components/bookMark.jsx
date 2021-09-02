import React from "react";
import PropTypes from "prop-types";
import { iconFavoritesTrue, iconFavoritesFalse } from "../utils/icons";

const BookMark = ({ favorites, onToggleMark, id }) => {
    const getFavorites = () =>
        favorites ? iconFavoritesTrue : iconFavoritesFalse;
    return (
        <span role="button" onClick={() => onToggleMark(id)}>
            {getFavorites()}
        </span>
    );
};
BookMark.propTypes = {
    favorites: PropTypes.bool.isRequired,
    onToggleMark: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};
export default BookMark;

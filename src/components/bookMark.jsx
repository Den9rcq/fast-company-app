import React from "react";
import PropTypes from "prop-types";
import { iconFavoritesTrue, iconFavoritesFalse } from "../utils/icons";

const BookMark = ({ favorites, onToggleMark }) => {
    const getFavorites = () =>
        favorites ? iconFavoritesTrue : iconFavoritesFalse;
    return (
        <span role="button" onClick={onToggleMark}>
            {getFavorites()}
        </span>
    );
};
BookMark.propTypes = {
    favorites: PropTypes.bool.isRequired,
    onToggleMark: PropTypes.func.isRequired
};
export default BookMark;

import React from 'react';
import {iconFavoritesTrue, iconFavoritesFalse} from "../utils/icons";

const BookMark = ({favorites, onToggleMark, id}) => {
	const getFavorites = () => favorites ? iconFavoritesTrue : iconFavoritesFalse
	return (
		<span role="button" onClick={() => onToggleMark(id)}>{getFavorites()}</span>
	);
};

export default BookMark;
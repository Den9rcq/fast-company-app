import React from "react";
import PropTypes from "prop-types";
const GroupList = ({ items, onItemSelect, valueProperty, contentProperty }) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map(item =>
                <li key={items[item][valueProperty]}
                    className="list-group-item"
                    onClick={(e) => onItemSelect(e.target)}>{items[item][contentProperty]}</li>)}
        </ul>
    );
};

GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired
};

export default GroupList;

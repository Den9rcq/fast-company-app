import React from "react";
import PropTypes from "prop-types";
const GroupList = ({ items, onItemSelect, valueProperty, contentProperty, selectedItem }) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map(item =>
                <li key={items[item][valueProperty]}
                    className={`list-group-item${selectedItem === items[item] ? " active" : ""}`}
                    onClick={() => onItemSelect(items[item])}>{items[item][contentProperty]}</li>)}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    selectedItem: PropTypes.object,
    onItemSelect: PropTypes.func
};

export default GroupList;

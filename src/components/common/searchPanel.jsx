import React from "react";
import { search } from "../../utils/icons";
import PropTypes from "prop-types";

const SearchPanel = ({ onSearch, searchValue }) => {
    const onChangeValue = ({ target }) => {
        const { value } = target;
        onSearch(value);
    };

    return (
        <div className="row">
            <div className="input-group mb-3">
                <input
                    value={searchValue}
                    onChange={onChangeValue}
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
                <span className="input-group-text" id="basic-addon1">{search}</span>
            </div>
        </div>
    );
};
SearchPanel.propTypes = {
    onSearch: PropTypes.func,
    searchValue: PropTypes.string
};
export default SearchPanel;

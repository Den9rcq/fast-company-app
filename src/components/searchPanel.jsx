import React from "react";
import { search } from "../utils/icons";

const SearchPanel = () => {
    return (
        <div className="row">
            <div className="input-group mb-3">
                <input type="text"
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

export default SearchPanel;

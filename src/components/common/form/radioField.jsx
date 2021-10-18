import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, options, value, onChange, name }) => {
    return (
        <div className="mb-4">
            <label className="form-label">
                {label}
            </label>
            {options.map(option => (
                <div
                    key={`${option.name}_${option.value}`}
                    className="form-check form-check-inline"
                >
                    <input
                        className={`form-check-input ${option.value === "male" && "m-1"}`}
                        type="radio"
                        name={name}
                        id={`${option.name}_${option.value}`}
                        value={option.value}
                        checked={option.value === value}
                        onChange={onChange}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={`${option.name}_${option.value}`}
                    >
                        {option.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

RadioField.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string
};

export default RadioField;

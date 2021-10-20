import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, errors }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: !value });
    };
    return (
        <div className="form-check has-validation mb-4">
            <input
                className="form-check-input"
                type="checkbox"
                id={name}
                onChange={handleChange}
                name={name}
                checked={value}
            />
            <label
                className={`form-check-label is-${errors ? "invalid" : "valid"}`}
                htmlFor={name}
            >
                {children}
            </label>
            {errors && <div className="invalid-feedback">{errors}</div>}
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    errors: PropTypes.string
};

export default CheckBoxField;

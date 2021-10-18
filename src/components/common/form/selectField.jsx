import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    errors
}) => {
    const optionsArray = !Array.isArray(options) && typeof (options) === "object"
        ? Object.keys(options).map(optionName => ({ name: options[optionName].name, value: options[optionName]._id }))
        : options;
    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                className={`form-select is-${errors ? "invalid" : "valid"}`}
                id="validationCustom04"
                name="profession"
                value={value}
                onChange={onChange}
            >
                <option value="" disabled>
                    {defaultOption}
                </option>
                {
                    optionsArray && optionsArray.map(option =>
                        <option
                            key={option._id || option.value}
                            value={option._id || option.value}
                        >
                            {option.name}
                        </option>
                    )
                }
            </select>
            {errors && <div className="invalid-feedback">
                {errors}
            </div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    errors: PropTypes.string
};

export default SelectField;

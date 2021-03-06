import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue = [] }) => {
    const findQuality = (qualityId) => options.find(q => q._id === qualityId);
    defaultValue = defaultValue.map(findQuality);

    const optionsArray = !Array.isArray(options) && typeof (options) === "object"
        ? Object.keys(options).map(optionName => (
            {
                ...options[optionName],
                label: options[optionName].name,
                value: options[optionName]._id
            }))
        : options.map(o => (
            {
                ...o,
                label: o.name,
                value: o._id
            }));

    const handleChange = (value) => {
        const correctValue = value.map(v => (v.value));
        onChange({ name, value: correctValue });
    };

    return (
        <div className="mb-4">
            <label className="form-label">
                {label}
            </label>
            <Select
                isMulti
                options={optionsArray}
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
                defaultValue={defaultValue && defaultValue.map(v => ({ label: v.name, value: v._id, color: v.color }))}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};
export default MultiSelectField;

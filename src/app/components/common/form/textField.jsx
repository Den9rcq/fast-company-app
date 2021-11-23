import React, { useState } from "react";
import PropTypes from "prop-types";
import { eye, eyeSlash } from "../../../utils/icons";

const TextField = ({ label, type, name, value, onChange, errors }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(prevState => !prevState);
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                {type === "textarea"
                    ? <textarea className={`form-control is-${errors ? "invalid" : "valid"}`}
                                id={name}
                                name={name}
                                onChange={handleChange}
                                value={value}
                                cols="100"
                    />
                    : <input
                        className={`form-control is-${errors ? "invalid" : "valid"}`}
                        type={showPassword ? "text" : type}
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                    />
                }
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        {!showPassword ? eye : eyeSlash}
                    </button>
                )}
                {errors && <div className="invalid-feedback">{errors}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.string
};

export default TextField;

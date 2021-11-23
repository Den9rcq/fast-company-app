import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ size, alt }) => {
    return (
        <img
            src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`}
            className="rounded-circle shadow-1-strong me-3"
            alt={alt}
            width={size}
            height={size}
        />
    );
};

Avatar.defaultProps = {
    size: "65",
    alt: "avatar"
};

Avatar.propTypes = {
    size: PropTypes.string,
    alt: PropTypes.string
};

export default Avatar;

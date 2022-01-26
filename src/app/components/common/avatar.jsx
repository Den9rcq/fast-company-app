import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ url, size, alt }) => {
    return (
        <img
            src={url}
            className="rounded-circle shadow-1-strong me-3"
            alt={alt}
            width={size}
            height={size}
        />
    );
};

Avatar.defaultProps = {
    url: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
    size: "65",
    alt: "avatar"
};

Avatar.propTypes = {
    size: PropTypes.string,
    alt: PropTypes.string,
    url: PropTypes.string
};

export default Avatar;

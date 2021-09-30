import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((badge) => (
                <Quality key={badge._id} {...badge} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default QualitiesList;

import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
const QualitiesList = ({ qualities }) => {
    console.log(qualities);
    return (
        <>
            {qualities && qualities.map((id) => (
                <Quality key={id} id={id} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default QualitiesList;

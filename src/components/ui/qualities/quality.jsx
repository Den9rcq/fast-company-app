import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Quality = ({ id }) => {
    const { getQuality, isLoading } = useQuality();
    const quality = getQuality(id);
    return (
        <>
            {!isLoading ? <span className={`badge me-2 bg-${quality.color}`}>{quality.name}</span> : "Loading..."}
        </>
    );
};

Quality.propTypes = {
    id: PropTypes.string
};
export default Quality;

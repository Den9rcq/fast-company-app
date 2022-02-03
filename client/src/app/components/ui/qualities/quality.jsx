import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getQualitiesLoadingStatus, getQualityById, loadQualitiesList } from "../../../store/qualities";

const Quality = ({ id }) => {
    const dispatch = useDispatch();
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const quality = useSelector(getQualityById(id));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    return (
        <>
            {!qualitiesLoading ? <span className={`badge me-2 bg-${quality.color}`}>{quality.name}</span> : "Loading..."}
        </>
    );
};

Quality.propTypes = {
    id: PropTypes.string
};
export default Quality;

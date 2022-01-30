import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionById, getProfessionsLoadingStatus, loadProfessionsList } from "../../store/professions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const prof = useSelector(getProfessionById(id));
    const isLoading = useSelector(getProfessionsLoadingStatus());
    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);
    return (
        <>
            {!isLoading ? <p>{prof.name}</p> : "Loading..."}
        </>
    );
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;

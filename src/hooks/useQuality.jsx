import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();
export const useQuality = () => useContext(QualityContext);
export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");

    // Полученик качеств
    const getQualityList = async () => {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (e) {
            errorCatcher(e);
        }
    };
    // Отработка ошибок
    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setErrors(message);
        setLoading(false);
    };
    useEffect(() => {
        getQualityList();
    }, []);
    useEffect(() => {
        if (errors) {
            toast.error(errors);
            setErrors("");
        }
    }, [errors]);

    const getQuality = (qualityId) => qualities.find(q => q._id === qualityId);

    return (
       <QualityContext.Provider value={{ qualities, isLoading, getQuality }}>
           {children}
       </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType(
        [
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]
    )
};

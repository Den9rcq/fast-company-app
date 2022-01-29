import React, { useContext, useEffect, useState } from "react";
import professionService from "../services/profession.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ProfessionContext = React.createContext();
export const useProfession = () => useContext(ProfessionContext);
export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");

    // Запрос всех профессий
    const getProfessionList = async () => {
        try {
            const { content } = await professionService.fetchAll();
            setProfessions(content);
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

    // Поиск профессии
    const getProfession = (id) => professions.find(p => p._id === id);

    useEffect(() => {
        getProfessionList();
    }, []);
    useEffect(() => {
        if (errors) {
            toast.error(errors);
            setErrors("");
        }
    }, [errors]);

    return (
        <ProfessionContext.Provider value={{ professions, isLoading, getProfession }}>
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType(
        [
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]
    )
};

import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CommentsContext = React.createContext();
export const useComments = () => useContext(CommentsContext);
export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    // const [isLoading, setLoading] = useState(true);
    // const [errors, setErrors] = useState("");

   useEffect(() => setComments(null), []);

    return (
        <CommentsContext.Provider value={{ comments }}>
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType(
        [
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]
    )
};

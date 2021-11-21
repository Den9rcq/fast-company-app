import React, { useContext } from "react";
import PropTypes from "prop-types";

const UserContext = React.createContext();
export const useUsers = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
    return (
        <UserContext.Provider value="test">
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType(
        [
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]
    )
};

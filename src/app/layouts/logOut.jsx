import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => logOut(), []);
    return (
        <div>
            <h2>Loading</h2>
        </div>
    );
};

export default LogOut;

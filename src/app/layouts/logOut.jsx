import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/users";
import { useHistory } from "react-router-dom";

const LogOut = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(logOut());
        history.push("/");
    }, []);
    return (
        <div>
            <h2>Loading</h2>
        </div>
    );
};

export default LogOut;

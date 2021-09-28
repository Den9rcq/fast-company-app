import React from "react";
import { useParams } from "react-router-dom";
import Users from "../layouts/users";
import User from "./user";

const UsersList = () => {
    const { userId } = useParams();
    return (
        <>
            {userId ? <User id={userId}/> : <Users/>}
        </>
    );
};

export default UsersList;

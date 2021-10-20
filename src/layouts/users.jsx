import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditUserPage from "../components/page/editUserPage";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <>
            {edit ? <EditUserPage id={userId}/> : userId ? <UserPage id={userId}/> : <UsersListPage/>}
        </>
    );
};

export default Users;

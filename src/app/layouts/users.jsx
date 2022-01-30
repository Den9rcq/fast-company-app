import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditUserPage from "../components/page/editUserPage";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <>
            <UsersLoader>
                {edit ? <EditUserPage /> : userId ? <UserPage id={userId} /> : <UsersListPage />}
            </UsersLoader>
        </>
    );
};

export default Users;

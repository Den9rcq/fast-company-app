import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import UserForm from "../../ui/userForm";

const EditUserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then(user => setUser(user));
    }, []);
    return (
        <>
            {user &&
            <UserForm
                user={user}
            />}
        </>
    );
};
EditUserPage.propTypes = {
    id: PropTypes.string
};
export default EditUserPage;

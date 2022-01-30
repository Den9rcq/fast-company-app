import React from "react";
import PropTypes from "prop-types";
import UserForm from "../../ui/userForm";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../../store/users";

const EditUserPage = () => {
    const currentUser = useSelector(getCurrentUserData());

    return (
        <div className="col-md-6 offset-md-3 shadow p-4">
            {currentUser && <UserForm user={currentUser} />}
        </div>
    );
};
EditUserPage.propTypes = {
    id: PropTypes.string
};
export default EditUserPage;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import UserCardBody from "../../ui/userCardBody";

const UserPage = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then(user => setUser(user));
    }, []);
    const handleEditUsers = () => history.push(`/users/${id}/edit`);

    return (
        <div>
            {
                user
                    ? (
                        <div className="container">
                            <div className="row gutters-sm">
                                <div className="col-md-4 mb-3">
                                    <UserCardBody user={user} onClick={handleEditUsers}/>
                                </div>
                                <div className="col-md-8">
                                    <h2>New comment</h2>
                                </div>
                            </div>

                        </div>
                    )
                    : <h2>Loading</h2>
            }
        </div>
    );
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserPage;

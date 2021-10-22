import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserInfoCards from "../../ui/userInfoCards";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then(user => setUser(user));
    }, []);
    return (
        <div>
            {
                user
                    ? (
                        <div className="container">
                            <div className="row gutters-sm">
                                <UserInfoCards user={user} />
                                <div className="col-md-8">
                                    new comments
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

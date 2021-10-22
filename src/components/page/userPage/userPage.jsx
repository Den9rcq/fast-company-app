import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserInfoCards from "../../ui/userInfoCards";
import UserCommentCards from "../../ui/userCommentCards";

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
                                <UserCommentCards id={id}/>
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

import React from "react";
import PropTypes from "prop-types";
import UserInfoCards from "../../ui/userInfoCards";
import UserCommentCards from "../../ui/userCommentCards";
import { getUserById } from "../../../store/users";
import { useSelector } from "react-redux";

const UserPage = ({ id }) => {
    const user = useSelector(getUserById(id));
    return (
        <div>
            {
                user
                    ? (
                        <div className="container">
                            <div className="row gutters-sm">
                                <UserInfoCards user={user} />
                                    <UserCommentCards />
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

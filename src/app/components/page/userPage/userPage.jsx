import React from "react";
import PropTypes from "prop-types";
import UserInfoCards from "../../ui/userInfoCards";
import UserCommentCards from "../../ui/userCommentCards";
import { useUsers } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ id }) => {
    const { getUserById } = useUsers();
    const user = getUserById(id);
    return (
        <div>
            {
                user
                    ? (
                        <div className="container">
                            <div className="row gutters-sm">
                                <UserInfoCards user={user}/>
                                <CommentsProvider>
                                    <UserCommentCards id={id}/>
                                </CommentsProvider>
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

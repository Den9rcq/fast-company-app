import React from "react";
import UserCard from "./infoCard/userCard";
import QualitiesCard from "./infoCard/qualitiesCard";
import CompletedMeetingsCard from "./infoCard/completedMeetingsCard";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserInfoCards = ({ user }) => {
    const history = useHistory();
    const handleEditUsers = () => history.push(`/users/${user._id}/edit`);

    return (
        <div className="col-md-4 mb-3">
            <UserCard user={user} onClick={handleEditUsers}/>
            <QualitiesCard user={user}/>
            <CompletedMeetingsCard user={user}/>
        </div>
    );
};
UserInfoCards.propTypes = {
    user: PropTypes.object
};
export default UserInfoCards;

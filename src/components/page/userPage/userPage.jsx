import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
const UserPage = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then(user => setUser(user));
    }, []);
    const handleAllUsers = () => history.push(`/users/${id}/edit`);

    return (
        <div>
            {
                user
                    ? (
                        <div>
                            <h1>{user.name}</h1>
                            <h2>Профессия: {user.profession.name}</h2>
                            <Qualities qualities={user.qualities}/>
                            <p>completedMeetings: {user.completedMeetings}</p>
                            <h2>Rate {user.rate}</h2>
                            <button onClick={handleAllUsers}>Изменить</button>
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

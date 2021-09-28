import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import Quality from "./quality";

const User = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then(user => setUser(user));
    }, []);
    const handleAllUsers = () => history.push("/users");

    return (
        <div>
            {
                user
                    ? (
                        <div>
                            <div>{user.name}</div>
                            <div>Профессия: {user.profession.name}</div>
                            <div>
                                {user.qualities.map((badge) => (
                                    <Quality key={badge._id} {...badge} />
                                ))}
                            </div>
                            <div>completedMeetings: {user.completedMeetings}</div>
                            <div>Rate {user.rate}</div>
                            <button onClick={handleAllUsers}>Все пользователи</button>
                        </div>
                    )
                    : <h2>Loading</h2>
            }
        </div>
    );
};

User.propTypes = {
    id: PropTypes.string.isRequired
};
export default User;

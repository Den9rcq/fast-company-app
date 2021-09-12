import React, { useEffect, useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";

const Users = ({ users: allUser, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const count = allUser.length;
    const pageSize = 4;
    useEffect(() => {
        api.professions.fetchAll().then(date => setProfession(date));
    }, []);

    const handleProfessionSelect = (item) => setSelectedProf(item);
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    const filteredUsers = selectedProf ? allUser.filter((user) => user.profession === selectedProf) : allUser;
    const users = paginate(filteredUsers, currentPage, pageSize);
    return (
        <>
            {profession && <GroupList
                items={profession}
                selectedItem={selectedProf}
                onItemSelect={handleProfessionSelect}/>}
            {count > 0 && (
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"/>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <User key={user._id} {...rest} {...user} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired
};
export default Users;

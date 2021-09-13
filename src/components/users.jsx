import React, { useEffect, useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUser, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;
    useEffect(() => {
        api.professions.fetchAll().then(date => setProfession(date));
    }, []);
    useEffect(() => setCurrentPage(1), [selectedProf]);
    const handleProfessionSelect = (item) => setSelectedProf(item);
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    const clearFilterProfession = () => {
        setSelectedProf();
        setCurrentPage(1);
    };
    const filteredUsers = selectedProf
        ? allUser.filter((user) => user.profession === selectedProf)
        : allUser;
    const count = filteredUsers.length;
    const users = paginate(filteredUsers, currentPage, pageSize);

    return (
        <div className="d-flex flex-column">
            <SearchStatus length={count}/>
            <div className="d-flex">
                {profession &&
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={profession}
                        selectedItem={selectedProf}
                        onItemSelect={handleProfessionSelect}/>
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilterProfession}>Сброс
                    </button>
                </div>}

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
            </div>
            <Pagination
                itemCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired
};
export default Users;

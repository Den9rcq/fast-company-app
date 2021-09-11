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
    const count = allUser.length;
    const pageSize = 4;
    useEffect(() => {
        api.professions.fetchAll().then(date => setProfession(date));
    }, []);

    const handleProfessionSelect = (param) => console.log(param);
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    const users = paginate(allUser, currentPage, pageSize);
    return (
        <>
            {profession && <GroupList
                items={profession}
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

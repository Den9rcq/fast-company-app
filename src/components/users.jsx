import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";

const Users = ({ users: allUser, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 4;
    useEffect(() => {
        api.professions.fetchAll().then(date => setProfession(date));
    }, []);
    useEffect(() => setCurrentPage(1), [selectedProf]);
    const handleProfessionSelect = (item) => setSelectedProf(item);
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    const handleSort = (item) => {
        if (sortBy.iter === item) {
            setSortBy(prevState => ({
                ...prevState,
                order: prevState.order === "asc" ? "desc" : "asc"
            }));
        } else {
            setSortBy({ iter: item, order: "asc" });
        }
    };
    const clearFilterProfession = () => {
        setSelectedProf();
        setCurrentPage(1);
    };
    const filteredUsers = selectedProf
        ? allUser.filter((user) => user.profession._id === selectedProf._id)
        : allUser;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const users = paginate(sortedUsers, currentPage, pageSize);
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
                {count > 0 && <UsersTable
                    users={users}
                    onSort={handleSort}
                    {...rest}/>}
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

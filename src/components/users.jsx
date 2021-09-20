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
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    // Установка количество отображаемых пользователей на странице
    const pageSize = 4;
    // Принятие данных с задержкой(сервера)
    useEffect(() => {
        api.professions.fetchAll().then(date => setProfession(date));
    }, []);
    useEffect(() => setCurrentPage(1), [selectedProf]);

    // Выбор профессии
    const handleProfessionSelect = (item) => setSelectedProf(item);
    // Выбор страницы
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    // Сортировка по возрастанию или убыванию
    const handleSort = item => setSortBy(item);
    // Очистка профессии
    const clearFilterProfession = () => {
        setSelectedProf();
        setCurrentPage(1);
    };
    // Фильтр пользователей по профессии
    const filteredUsers = selectedProf
        ? allUser.filter((user) => user.profession._id === selectedProf._id)
        : allUser;

    const count = filteredUsers.length;
    // Сортированные пользователи по возрастанию(убыванию)
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    // Сортированные пользователи с учётом пагинации
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
                    selectedSort={sortBy}
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

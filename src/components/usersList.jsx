import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();

    // Принятие данных с задержкой(сервера)
    useEffect(() => {
        api.users.fetchAll().then(date => setUsers(date));
    }, []);
    useEffect(() => {
        api.professions.fetchAll().then(date => setProfession(date));
    }, []);
    useEffect(() => setCurrentPage(1), [selectedProf]);

    // Удаление ползователя из листа
    const handleDelete = (userId) => setUsers(users.filter((user) => user._id !== userId));
    // Переключение флага избранное
    const handleToggleBookMark = (id) => setUsers(
        users.map((item) =>
            item._id === id ? { ...item, favorites: !item.favorites } : item
        )
    );
    // Установка количество отображаемых пользователей на странице
    const pageSize = 4;
    // Выбор профессии
    const handleProfessionSelect = (item) => setSelectedProf(item);
    // Выбор страницы
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    // Сортировка по возрастанию или убыванию
    const handleSort = item => {
        setSortBy(item);
    };
    // Очистка профессии
    const clearFilterProfession = () => {
        setSelectedProf();
        setCurrentPage(1);
    };
    if (users) {
    // Фильтр пользователей по профессии
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;

        const count = filteredUsers.length;
        // Сортированные пользователи по возрастанию(убыванию)
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        // Сортированные пользователи с учётом пагинации
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
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
                        users={usersCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                        onToggleMark={handleToggleBookMark}
                    />}
                </div>
                <Pagination
                    itemCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        );
    } else {
        return (
            <h2 className='text-center mt-5 text-danger'>Loading...</h2>
        );
    }
};
UsersList.propTypes = {
    users: PropTypes.array
};
export default UsersList;

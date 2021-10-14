import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import SearchPanel from "../../common/searchPanel";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [saveDataBase, setSaveDataBase] = useState();
    const [searchValue, setSearchValue] = useState("");

    // Принятие данных с задержкой(сервера)
    useEffect(() => {
        api.users.fetchAll().then(date => setUsers(date));
        api.users.fetchAll().then(date => setSaveDataBase(date));
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
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        handleSearchUsersByName("");
    };
    // Выбор страницы
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    // Сортировка по возрастанию или убыванию
    const handleSort = item => {
        setSortBy(item);
    };
    // Поиск по имени
    const handleSearchUsersByName = (value) => {
        const usersData = [...saveDataBase];
        setSearchValue(value);
        const filteredUsers = usersData.filter(u => u.name.toLowerCase().includes(value.toLowerCase()));
        setUsers(filteredUsers);
    };

    // Сброс профессий и search input
    const clearFilterProfession = () => {
        setSelectedProf();
        setCurrentPage(1);
        handleSearchUsersByName("");
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
                    <SearchPanel
                        searchValue={searchValue}
                        onSearch={handleSearchUsersByName}
                    />
                    <GroupList
                        items={profession}
                        selectedItem={selectedProf}
                        onItemSelect={handleProfessionSelect}
                    />
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
UsersListPage.propTypes = {
    users: PropTypes.array
};
export default UsersListPage;

import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import SearchPanel from "../../common/searchPanel";
import { useUsers } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");
    const { users } = useUsers();
    const { professions } = useProfession();
    useEffect(() => setCurrentPage(1), [selectedProf, searchQuery]);

    // Удаление ползователя из листа
    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };
    // Переключение флага избранное
    const handleToggleBookMark = (id) => {
        const newArray = users.map((item) =>
            item._id === id ? { ...item, favorites: !item.favorites } : item
        );
        // setUsers(newArray);
        console.log(newArray);
    };
    // Установка количество отображаемых пользователей на странице
    const pageSize = 4;
    // Выбор профессии
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchQuery("");
    };
    // Выбор страницы
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    // Сортировка по возрастанию или убыванию
    const handleSort = item => {
        setSortBy(item);
    };
    // Поиск по имени
    const handleSearchQuery = (value) => {
        setSearchQuery(value);
    };
    // Сброс профессий и search input
    const clearFilterProfession = () => {
        setSelectedProf();
        setCurrentPage(1);
        setSearchQuery("");
    };
    // Фильтр пользователей по профессии и имени
    const filteredUsers = searchQuery
        ? users.filter(user => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
        : selectedProf
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
                {professions &&
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <SearchPanel
                        name="searchQuery"
                        searchValue={searchQuery}
                        onSearch={handleSearchQuery}
                    />
                    <GroupList
                        items={professions}
                        selectedItem={selectedProf}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilterProfession}
                    >Сброс
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
};
export default UsersListPage;

import React, {useState} from 'react';
import api from '../api'
import {getLastNumber} from "../utils/getLastNumber";

const Users = () => {
	const [users, setUsers] = useState(api.users.fetchAll());
	const user = users.map(item => {
		return (
			<tr key={item._id}>
				<td>{item.name}</td>
				<td>{item.qualities.map(badge => <span key={badge._id}
				                                       className={`badge me-2 bg-${badge.color}`}>{badge.name}</span>)}</td>
				<td>{item.profession.name}</td>
				<td>{item.completedMeetings}</td>
				<td>{item.rate} \ 5</td>
				<td>
					<button onClick={() => handleDelete(item._id)} type='button' className='btn btn-danger'>Удалить
					</button>
				</td>
			</tr>
		)
	})
	const handleDelete = (userId) => setUsers(users.filter(user => user._id !== userId))
	const renderPhrase = (number) => {
		const char = getLastNumber(number) === 1 || getLastNumber(number) >= 5 ? '' : 'а'
		return number === 0 ? 'Никто с тобой не тусанёт' : `${number} человек${char} тусанёт с тобой сегодня`
	}
	const getBadgeClasses = (number) => number === 0 ? 'badge bg-danger' : 'badge bg-primary'

	return (
		<>
			<h2><span className={getBadgeClasses(users.length)}>{renderPhrase(users.length)}</span></h2>
			{users.length > 0 && <table className="table align-middle">
				<thead>
				<tr>
					<th scope="col">Имя</th>
					<th scope="col">Качества</th>
					<th scope="col">Профессия</th>
					<th scope="col">Встретился, раз</th>
					<th scope="col">Оценка</th>
					<th scope="col"/>
				</tr>
				</thead>
				<tbody>
				{user}
				</tbody>
			</table>}
		</>
	);
};

export default Users;
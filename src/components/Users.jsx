import React, {useState} from 'react';
import api from '../api'

const Users = () => {
	const [users, setUsers] = useState(api.users.fetchAll());
	const user = users.map(item => {
		return (
			<tr key={item._id}>
				<td>{item.name}</td>
				<td>{item.qualities.map(badge => <span key={badge._id} className={`badge me-2 bg-${badge.color}`}>{badge.name}</span>)}</td>
				<td>{item.profession.name}</td>
				<td>{item.completedMeetings}</td>
				<td>{item.rate} \ 5</td>
				<td><button onClick={() => handleDelete(item._id)} type='button' className='btn btn-danger'>Удалить</button></td>
			</tr>
		)
	})
	const handleDelete = (userId) => setUsers(users.filter(user => user._id !== userId))
	return (
		<div className='wrapper'>
			<table className="table align-middle">
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
			</table>
		</div>
	);
};

export default Users;
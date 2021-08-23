import React from 'react';

const Users = () => {
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
				<tr>
					<td>Jhon Connor</td>
					<td>
						<span className="badge bg-primary me-2">Primary</span>
					</td>
					<td>Доктор</td>
					<td>20</td>
					<td>2.5</td>
					<td><button type='button' className='btn btn-danger'>Удалить</button></td>
				</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Users;
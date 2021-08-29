import React from 'react';
import Quality from "./quality";

const User = ({_id, name, qualities, profession, completedMeetings, rate, onDelete}) => {
	return (
		<tr>
			<td>{name}</td>
			<td>{qualities.map(badge => <Quality key={badge._id} {...badge}/>)}</td>
			<td>{profession.name}</td>
			<td>{completedMeetings}</td>
			<td>{rate} \ 5</td>
			<td>
				<button onClick={() => onDelete(_id)} type='button' className='btn btn-danger'>Удалить
				</button>
			</td>
		</tr>
	)
}

export default User;
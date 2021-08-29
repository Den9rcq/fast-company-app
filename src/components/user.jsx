import React from 'react';
import Quality from "./quality";

const User = ({_id, name, qualities, profession, completedMeetings, rate, favorites, onDelete, onToggleMark}) => {
	const iconFalse = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
	                       className="bi bi-bookmark" viewBox="0 0 16 16">
		<path
			d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
	</svg>
	const iconTrue = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
	                      className="bi bi-bookmark-fill" viewBox="0 0 16 16">
		<path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
	</svg>
	const getFavorites = () => favorites ? iconTrue : iconFalse
	return (
		<tr>
			<td>{name}</td>
			<td>{qualities.map(badge => <Quality key={badge._id} {...badge}/>)}</td>
			<td>{profession.name}</td>
			<td>{completedMeetings}</td>
			<td>{rate} \ 5</td>
			<td><span role="button" onClick={() => onToggleMark(_id)}>{getFavorites()}</span></td>
			<td>
				<button onClick={() => onDelete(_id)} type='button' className='btn btn-danger'>Удалить
				</button>
			</td>
		</tr>
	)
}

export default User;
import React, {useState} from 'react';
import Users from "./components/users";
import api from "./api";
import SearchStatus from "./components/searchStatus";

const App = () => {
	const [users, setUsers] = useState(api.users.fetchAll());
	const handleDelete = (userId) => setUsers(users.filter(user => user._id !== userId))

	return (
		<div>
			<SearchStatus length={users.length}/>
			<Users users={users}
			       onDelete={handleDelete}/>
		</div>
	);
};

export default App;
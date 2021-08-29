import React from 'react';

const Quality = ({color, name}) => {
	return (
		<span className={`badge me-2 bg-${color}`}>{name}</span>
	);
};

export default Quality;
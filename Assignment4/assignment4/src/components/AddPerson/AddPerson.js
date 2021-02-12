import React from 'react';

import './AddPerson.css';

const addPerson = (props) => (
	<div className='AddPerson'>
		<input
			type='text'
			placeholder='name'
			name='name'
			onChange={props.nameChanged}
			value={props.nameValue}
		/>
		<input
			type='number'
			placeholder='age'
			name='age'
			onChange={props.ageChanged}
			value={props.ageValue}
		/>
		<button onClick={props.personAdded}>Add Person</button>
	</div>
);

export default addPerson;

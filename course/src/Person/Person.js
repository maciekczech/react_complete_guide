import React, {component} from 'react';

const person = (props) => {
    return (
        <div className='Person' >
            <p onClick={props.click}> I'm a {props.name} and I am {props.age} years old </p>
            <p>{props.children}</p>
            <input onChange={props.changed} value={props.name}></input>
        </div>
    );
}

export default person;
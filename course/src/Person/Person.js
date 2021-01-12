import React from 'react';
import classes from './Person.css'



const person = (props) => {

    const rnd = Math.random();
    if( rnd > 0.7 ){ throw "Person could not be rendered"; }


    return (
        <div className = {classes.Person}>
            <p onClick={props.click}> I'm a {props.name} and I am {props.age} years old </p>
            <p>{props.children}</p>
            <input onChange={props.changed} value={props.name}></input>
        </div>
    );
}

export default person;
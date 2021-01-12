import React from "react";
import Person from './Person/Person'

const personsList = props => props.persons.map((person, personIndex) => {
        return (
            <Person
                key={person.id}
                className="Person"
                name={person.name}
                age={person.age}
                click={props.clicked.bind(personIndex)}
                changed={(event) => { props.changed(event.target.value, person.id); }}
            />);
    });

export default personsList;
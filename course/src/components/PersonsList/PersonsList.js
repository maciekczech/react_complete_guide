import React, { PureComponent } from "react";
import Person from './Person/Person'


class PersonsList extends PureComponent {

    state = {}

    static getDerivedStateFromProps(props, state){
        console.log('[PersonsList.js] getDerivedStateFromProps call..');
        return state;
    }

    //PureComponent checks whether all of the NextProps fields match current props
    //and rerenders component based on that piece of information
/*     shouldComponentUpdate(nextProps, nextState){
        if(this.props.persons === nextProps.persons){
            console.log('[PersonsList.js] shouldComponentUpdate call.. returning false');
            return false;
        }else{
            console.log('[PersonsList.js] shouldComponentUpdate call.. returning true');
            return true;
        }
    } */

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[PersonsList.js] getSnapshotBeforeUpdate call.. returning true');
        return {message: 'Snapshot!'};
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('[PersonsList.js] componentDidUpdate call.. MESSAGE: ', {snapshot});
    }

    render(){

    return ( this.props.persons.map((person, personIndex) => {
            return (
                    <Person
                        key={person.id}
                        className="Person"
                        name={person.name}
                        age={person.age}
                        click={this.props.clicked.bind(personIndex)}
                        changed={(event) => { this.props.changed(event.target.value, person.id); }}
                    />
            );
        }));

    }
} 

export default PersonsList;
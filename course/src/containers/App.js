import React, { Component } from 'react';
import classes from './App.css';
import PersonsList from '../components/PersonsList/PersonsList';
import Cockpit from '../components/Cockpit/Cockpit';


class App extends Component {

  state = {
    persons: [
      {id: 'd2asd', name: 'Max', age: 12}, 
      {id: 'asd12', name: 'Manu', age: 23}, 
      {id: 'fasty', name: 'Stephanie', age: 31} 
    ],
    otherState: "some other state",
    showPersons: true
  }

  changeNameHandler = (newName, id) => {
    const personIndex = this.state.persons.findIndex(element => element.id === id);
    const person = {...this.state.persons[personIndex]};
    person.name = newName;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons});
    
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonHandler = () =>{
    const currentValue = this.state.showPersons; 
    this.setState({
      showPersons: !currentValue,
    });

  }
  
  render(){

    let persons = null;

    if( this.state.showPersons ){
      persons = (
      <div className='PersonWrapper'>    
        <PersonsList
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.changeNameHandler}
        />
      </div>);
    }
   
    return (
        <div className={classes.App}>
          <Cockpit
          personsListLength={this.state.persons.length}
          showPersons={this.state.showPersons}
          click={this.togglePersonHandler}
          />
          {persons}
        </div>
      
    );
  }

}

export default App;

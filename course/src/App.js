import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';
import './Person/Person.css';


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

        {this.state.persons.map( (person, personIndex) =>{
          return (<Person
          key={person.id}
          className = "Person" 
          name={person.name} 
          age={person.age}
          click={this.deletePersonHandler.bind(personIndex)}
          changed={(event) => {this.changeNameHandler(event.target.value, person.id)}}
          />);
        })}    
      </div>);
    }



    return (
      <div className="App">
        <button 
        className = "Button"
        onClick={this.togglePersonHandler}>
          Hide everything
        </button>
        {persons}
      </div>
    );
  }

}

export default App;

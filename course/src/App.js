import React, { Component } from 'react';
import Radium, {StyleRoot} from 'radium'
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

    const buttonStyle = {
      justifyContent: "center",
      backgroundColor: "red",
      border: "none",
      color: "white",
      padding: "16px 32px",
      textDecoration: "none",
      margin: "4px 2px",
      cursor: "pointer",
      ':hover': {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

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

        buttonStyle.backgroundColor = "#4CAF50"
        buttonStyle[':hover'] = {
          backgroundColor: 'lightgreen',
          color: 'black'
                 
        }

    }

    let classes = [];

    if(this.state.persons.length <= 2) { classes.push('red');   } // classes = ['red']
    if(this.state.persons.length <= 1) { classes.push('bold');  } // classes = ['red', 'bold']

    return (
      <StyleRoot>
        <div className="App">
          <p className={classes.join(' ')}> This is really working! </p>
          <button 
          style={buttonStyle}
          onClick={this.togglePersonHandler}>
            Hide everything
          </button>
          {persons}
        </div>
      </StyleRoot>
      
    );
  }

}

export default Radium(App);

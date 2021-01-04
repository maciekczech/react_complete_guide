import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';
import './Person/Person.css';


class App extends Component {

  state = {
    persons: [
      {name: 'Max', age: 12}, 
      {name: 'Manu', age: 23}, 
      {name: 'Stephanie', age: 31} 
    ],
    otherState: "some other state",
    showPersons: true
  }

  switchNameHandler = (newName) => {
    this.setState({   
      persons: [
        {name: newName, age: 14}, 
        {name: 'New Manu', age: 44}, 
        {name: 'New Stephanie', age: 561} 
      ]
    }
    )
  }


  changeNameHandler = (event) => {

    this.setState({   
      persons: [
        {name: 'Max', age: 14}, 
        {name: event.target.value, age: 44}, 
        {name: 'New Stephanie', age: 561} 
      ]
    }
    )
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
      <div>    

        {this.state.persons.map( person =>{
          return (<Person 
          name={person.name} 
          age={person.age}
          />);
        })}    
      </div>);
    }



    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
  
        <button onClick={this.togglePersonHandler}>Switch name</button>
        
        {persons}
      </div>
    );
  }

}

export default App;

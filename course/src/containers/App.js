import React, { Component } from 'react';
import classes from './App.css';
import PersonsList from '../components/PersonsList/PersonsList';
import Cockpit from '../components/Cockpit/Cockpit';
import Auxiliary from '../hoc/Auxiliary'
import withClass from '../hoc/withClassF'


class App extends Component {

  constructor(props){
    super(props);
    console.log('[App.js] constructor');
    this.state = {
      persons: [
        { id: 'd2asd', name: 'Max', age: 12 },
        { id: 'asd12', name: 'Manu', age: 23 },
        { id: 'fasty', name: 'Stephanie', age: 31 }
      ],
      otherState: "some other state",
      showPersons: false,
      showCockpit: true,
      changeCounter: 0,
      authenticated: false
    }
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps call');
    return state;
  }


  changeNameHandler = (newName, id) => {
    const personIndex = this.state.persons.findIndex(element => element.id === id);
    const person = {...this.state.persons[personIndex]};
    person.name = newName;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
/*  this.setState({
      persons: persons, 
      changeCounter: this.state.counter + 1}
      );
    //this.state is not guaranted to be the latest previous state
    //as react performs setState() call async  */
    
    this.setState((prevState, props) => { //that way we can make sure that we get a previous state value
      return { 
        persons: persons, 
        changeCounter: prevState.changeCounter + 1 
      };
    });
  };

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

  authenticateUserHandler = () => {
    console.log('zmieniac na true');
    this.setState({authenticated: true});
  }
  
  componentDidMount(){
    console.log('[App.js] componentDidMount call');
  }

  shouldComponentUpdate(){
    console.log('[App.js] shouldComponentUpdate call');
    return true;
  }

  componentDidUpdate(prevProps, prevState){
    console.log('[App.js] componentDidUpdate call');
  }

  render(){
    console.log('[App.js] render call');
    let persons = null;

    if( this.state.showPersons ){
      persons = (   
        <PersonsList
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.changeNameHandler}
          isAuthenticated={this.state.authenticated}
        />);
    }
   
    return (
        <Auxiliary >
        <button onClick={() => { this.setState({showCockpit: !this.state.showCockpit})}}> hide Cockpit </button>
          {this.state.showCockpit ? <Cockpit
          personsListLength={this.state.persons.length}
          showPersons={this.state.showPersons}
          click={this.togglePersonHandler}
          authenticate={this.authenticateUserHandler}
          /> : null}
          {persons}
        </Auxiliary >
      
    );
  }

}

export default withClass(App, classes.App);
